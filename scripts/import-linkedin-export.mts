import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

type CareerRole = {
  title: string;
  details: string[];
};

type CareerEntry = {
  organization: string;
  initial: string;
  period: string;
  roles: CareerRole[];
};

type CareerData = {
  work: CareerEntry[];
  education: CareerEntry[];
  skills: { category: string; items: string[] }[];
};

type YearMonth = {
  year: number;
  month: number | null;
};

const CAREER_JSON_PATH = resolve("src/content/career.json");
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
  const formattedStart = start === null ? "" : formatJapaneseYearMonth(start);
  const formattedEnd = end === null ? "現在" : formatJapaneseYearMonth(end);
  return formattedStart === "" ? formattedEnd : `${formattedStart} - ${formattedEnd}`;
};

const splitIntoDetailLines = (description: string): string[] =>
  description
    .split("\n")
    .map((line) => line.replace(/^[-・•*]\s*/, "").trim())
    .filter((line) => line !== "");

type GroupedOrganization = {
  organization: string;
  start: YearMonth | null;
  end: YearMonth | null;
  isOngoing: boolean;
  roles: CareerRole[];
};

const groupRowsByOrganization = (
  records: Record<string, string>[],
  columns: { organization: string; title: string; details: string; start: string; end: string },
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
      if (
        start !== null &&
        (group.start === null || toComparableNumber(start) < toComparableNumber(group.start))
      ) {
        group.start = start;
      }
      if (isOngoing) {
        group.isOngoing = true;
      } else if (
        end !== null &&
        (group.end === null || toComparableNumber(end) > toComparableNumber(group.end))
      ) {
        group.end = end;
      }
    }

    group.roles.push({
      title: record[columns.title] ?? "",
      details: splitIntoDetailLines(record[columns.details] ?? ""),
    });

    groupsByOrganization.set(organization, group);
  }

  return [...groupsByOrganization.values()];
};

const toCareerEntry = (group: GroupedOrganization, existingEntries: CareerEntry[]): CareerEntry => {
  const existingEntry = existingEntries.find((entry) => entry.organization === group.organization);

  return {
    organization: group.organization,
    initial: existingEntry?.initial ?? [...group.organization][0] ?? "?",
    period: formatPeriod(group.start, group.isOngoing ? null : group.end),
    roles: group.roles,
  };
};

const mergePreservingCuratedOrder = (
  existingEntries: CareerEntry[],
  importedEntries: CareerEntry[],
): CareerEntry[] => {
  const importedByOrganization = new Map(
    importedEntries.map((entry) => [entry.organization, entry]),
  );

  const keptInExistingOrder = existingEntries
    .map((entry) => importedByOrganization.get(entry.organization))
    .filter((entry): entry is CareerEntry => entry !== undefined);

  const existingOrganizations = new Set(existingEntries.map((entry) => entry.organization));
  const newlyAdded = importedEntries.filter(
    (entry) => !existingOrganizations.has(entry.organization),
  );

  return [...newlyAdded, ...keptInExistingOrder];
};

const exportDir = resolve(process.argv[2] ?? DEFAULT_EXPORT_DIR);

if (!existsSync(exportDir)) {
  console.error(`LinkedIn エクスポートのディレクトリが見つかりません: ${exportDir}`);
  console.error("LinkedIn の 設定 > データのコピーを取得 で CSV を落として展開してください。");
  process.exit(1);
}

const existingCareer: CareerData = JSON.parse(readFileSync(CAREER_JSON_PATH, "utf8"));

const positionGroups = groupRowsByOrganization(
  readCsvRecords(join(exportDir, "Positions.csv"), "Company Name"),
  {
    organization: "Company Name",
    title: "Title",
    details: "Description",
    start: "Started On",
    end: "Finished On",
  },
);

const educationGroups = groupRowsByOrganization(
  readCsvRecords(join(exportDir, "Education.csv"), "School Name"),
  {
    organization: "School Name",
    title: "Degree Name",
    details: "Notes",
    start: "Start Date",
    end: "End Date",
  },
);

if (positionGroups.length === 0 && educationGroups.length === 0) {
  console.error(`${exportDir} に Positions.csv / Education.csv が見つかりません。`);
  process.exit(1);
}

const importedWork = positionGroups.map((group) => toCareerEntry(group, existingCareer.work));
const importedEducation = educationGroups.map((group) =>
  toCareerEntry(group, existingCareer.education),
);

const mergedCareer: CareerData = {
  work:
    importedWork.length > 0
      ? mergePreservingCuratedOrder(existingCareer.work, importedWork)
      : existingCareer.work,
  education:
    importedEducation.length > 0
      ? mergePreservingCuratedOrder(existingCareer.education, importedEducation)
      : existingCareer.education,
  skills: existingCareer.skills,
};

writeFileSync(CAREER_JSON_PATH, `${JSON.stringify(mergedCareer, null, 2)}\n`, "utf8");

console.log(`${CAREER_JSON_PATH} を更新しました`);
console.log(`  職歴 ${mergedCareer.work.length} 件 / 学歴 ${mergedCareer.education.length} 件`);
console.log("git diff で内容を確認し、initial と表記を整えてからコミットしてください。");
