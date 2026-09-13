import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { EXPERIENCES, type Experience, type ExperienceRole } from "../src/data/experiences.ts";

type YearMonth = {
  year: number;
  month: number | null;
};

const EXPERIENCES_MODULE_PATH = resolve("src/data/experiences.ts");
const EXPERIENCES_DECLARATION = "export const EXPERIENCES: Experience[] = ";
const DEFAULT_EXPORT_DIR = "linkedin-export";

const MONTH_NUMBERS_BY_LOWERCASE_ABBREVIATION: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

const splitCsvIntoRows = (csv: string): string[][] => {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let isInsideQuotes = false;

  for (let index = 0; index < csv.length; index += 1) {
    const character = csv[index];

    if (isInsideQuotes) {
      if (character !== '"') {
        currentField += character;
      } else if (csv[index + 1] === '"') {
        currentField += '"';
        index += 1;
      } else {
        isInsideQuotes = false;
      }
      continue;
    }

    if (character === '"') {
      isInsideQuotes = true;
    } else if (character === ",") {
      currentRow.push(currentField);
      currentField = "";
    } else if (character === "\n") {
      currentRow.push(currentField);
      rows.push(currentRow);
      currentRow = [];
      currentField = "";
    } else if (character !== "\r") {
      currentField += character;
    }
  }

  if (currentField !== "" || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  return rows.filter((row) => row.some((field) => field.trim() !== ""));
};

const readCsvRecords = (filePath: string, headerColumn: string): Record<string, string>[] => {
  if (!existsSync(filePath)) return [];

  const rows = splitCsvIntoRows(readFileSync(filePath, "utf8"));
  const headerRowIndex = rows.findIndex((row) =>
    row.some((field) => field.trim() === headerColumn),
  );
  if (headerRowIndex === -1) {
    throw new Error(`${filePath} に "${headerColumn}" 列が見つかりません`);
  }

  const headers = rows[headerRowIndex].map((field) => field.trim());
  return rows
    .slice(headerRowIndex + 1)
    .map((row) =>
      Object.fromEntries(headers.map((header, index) => [header, (row[index] ?? "").trim()])),
    );
};

const parseLinkedInDate = (value: string): YearMonth | null => {
  const trimmed = value.trim();
  if (trimmed === "") return null;

  const monthNameAndYear = trimmed.match(/^([A-Za-z]{3})[a-z]*\s+(\d{4})$/);
  if (monthNameAndYear) {
    const month = MONTH_NUMBERS_BY_LOWERCASE_ABBREVIATION[monthNameAndYear[1].toLowerCase()];
    return { year: Number(monthNameAndYear[2]), month: month ?? null };
  }

  const isoYearAndMonth = trimmed.match(/^(\d{4})-(\d{1,2})/);
  if (isoYearAndMonth) {
    return { year: Number(isoYearAndMonth[1]), month: Number(isoYearAndMonth[2]) };
  }

  const yearOnly = trimmed.match(/^(\d{4})$/);
  if (yearOnly) {
    return { year: Number(yearOnly[1]), month: null };
  }

  throw new Error(`日付 "${value}" を解釈できません`);
};

const toComparableNumber = (yearMonth: YearMonth): number =>
  yearMonth.year * 100 + (yearMonth.month ?? 0);

const formatJapaneseYearMonth = (yearMonth: YearMonth): string =>
  yearMonth.month === null ? `${yearMonth.year}年` : `${yearMonth.year}年${yearMonth.month}月`;

const formatPeriod = (start: YearMonth | null, end: YearMonth | null): string => {
  const formattedEnd = end === null ? "現在" : formatJapaneseYearMonth(end);
  return start === null ? formattedEnd : `${formatJapaneseYearMonth(start)} - ${formattedEnd}`;
};

const splitIntoAchievements = (description: string): string[] =>
  description
    .split("\n")
    .map((line) => line.replace(/^[-・•*]\s*/, "").trim())
    .filter((line) => line !== "");

type GroupedOrganization = {
  organization: string;
  start: YearMonth | null;
  end: YearMonth | null;
  isOngoing: boolean;
  roles: ExperienceRole[];
};

type CsvColumns = {
  organization: string;
  title: string;
  achievements: string;
  start: string;
  end: string;
};

const groupRowsByOrganization = (
  records: Record<string, string>[],
  columns: CsvColumns,
): GroupedOrganization[] => {
  const groupsByOrganization = new Map<string, GroupedOrganization>();

  for (const record of records) {
    const organization = record[columns.organization] ?? "";
    if (organization === "") continue;

    const start = parseLinkedInDate(record[columns.start] ?? "");
    const end = parseLinkedInDate(record[columns.end] ?? "");
    const isOngoing = (record[columns.end] ?? "").trim() === "";

    const existingGroup = groupsByOrganization.get(organization);
    const group: GroupedOrganization = existingGroup ?? {
      organization,
      start,
      end,
      isOngoing,
      roles: [],
    };

    if (existingGroup) {
      const startsEarlier =
        start !== null &&
        (group.start === null || toComparableNumber(start) < toComparableNumber(group.start));
      if (startsEarlier) group.start = start;

      const endsLater =
        end !== null &&
        (group.end === null || toComparableNumber(end) > toComparableNumber(group.end));
      if (isOngoing) {
        group.isOngoing = true;
      } else if (endsLater) {
        group.end = end;
      }
    }

    group.roles.push({
      title: record[columns.title] ?? "",
      achievements: splitIntoAchievements(record[columns.achievements] ?? ""),
    });

    groupsByOrganization.set(organization, group);
  }

  return [...groupsByOrganization.values()];
};

const toExperience = (group: GroupedOrganization): Experience => {
  const curatedEntry = EXPERIENCES.find((entry) => entry.organization === group.organization);

  return {
    organization: group.organization,
    organizationInitial: curatedEntry?.organizationInitial ?? [...group.organization][0] ?? "?",
    period: formatPeriod(group.start, group.isOngoing ? null : group.end),
    roles: group.roles,
  };
};

const mergePreservingCuratedOrder = (
  importedPositions: Experience[],
  importedSchools: Experience[],
): Experience[] => {
  const importedByOrganization = new Map(
    [...importedPositions, ...importedSchools].map((entry) => [entry.organization, entry]),
  );

  const keptInCuratedOrder = EXPERIENCES.map((entry) =>
    importedByOrganization.get(entry.organization),
  ).filter((entry): entry is Experience => entry !== undefined);

  const curatedOrganizations = new Set(EXPERIENCES.map((entry) => entry.organization));
  const isNew = (entry: Experience) => !curatedOrganizations.has(entry.organization);

  return [
    ...importedPositions.filter(isNew),
    ...keptInCuratedOrder,
    ...importedSchools.filter(isNew),
  ];
};

const toStringLiteral = (value: string): string => JSON.stringify(value);

const serializeExperiences = (experiences: Experience[]): string => {
  const serializeRole = (role: ExperienceRole) =>
    `{ title: ${toStringLiteral(role.title)}, achievements: [${role.achievements
      .map(toStringLiteral)
      .join(", ")}] }`;

  const serializeEntry = (experience: Experience) =>
    [
      "  {",
      `    organization: ${toStringLiteral(experience.organization)},`,
      `    organizationInitial: ${toStringLiteral(experience.organizationInitial)},`,
      `    period: ${toStringLiteral(experience.period)},`,
      `    roles: [${experience.roles.map(serializeRole).join(", ")}],`,
      "  },",
    ].join("\n");

  return `[\n${experiences.map(serializeEntry).join("\n")}\n]`;
};

const exportDir = resolve(process.argv[2] ?? DEFAULT_EXPORT_DIR);

if (!existsSync(exportDir)) {
  console.error(`LinkedIn エクスポートのディレクトリが見つかりません: ${exportDir}`);
  console.error("LinkedIn の 設定 > データのコピーを取得 で CSV を落として展開してください。");
  process.exit(1);
}

const positionGroups = groupRowsByOrganization(
  readCsvRecords(join(exportDir, "Positions.csv"), "Company Name"),
  {
    organization: "Company Name",
    title: "Title",
    achievements: "Description",
    start: "Started On",
    end: "Finished On",
  },
);

const schoolGroups = groupRowsByOrganization(
  readCsvRecords(join(exportDir, "Education.csv"), "School Name"),
  {
    organization: "School Name",
    title: "Degree Name",
    achievements: "Notes",
    start: "Start Date",
    end: "End Date",
  },
);

if (positionGroups.length === 0 && schoolGroups.length === 0) {
  console.error(`${exportDir} に Positions.csv / Education.csv が見つかりません。`);
  process.exit(1);
}

const mergedExperiences = mergePreservingCuratedOrder(
  positionGroups.map(toExperience),
  schoolGroups.map(toExperience),
);

const moduleSource = readFileSync(EXPERIENCES_MODULE_PATH, "utf8");
const declarationIndex = moduleSource.indexOf(EXPERIENCES_DECLARATION);
if (declarationIndex === -1) {
  throw new Error(`${EXPERIENCES_MODULE_PATH} に ${EXPERIENCES_DECLARATION} が見つかりません`);
}

const preservedHeader = moduleSource.slice(0, declarationIndex);
const regeneratedDeclaration = `${EXPERIENCES_DECLARATION}${serializeExperiences(mergedExperiences)};\n`;
writeFileSync(EXPERIENCES_MODULE_PATH, preservedHeader + regeneratedDeclaration, "utf8");

console.log(`${EXPERIENCES_MODULE_PATH} を更新しました (${mergedExperiences.length} 件)`);
console.log("pnpm check で整形し、git diff で内容を確認してからコミットしてください。");
