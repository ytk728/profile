export type ExperienceRole = {
  title: string;
  achievements: string[];
};

export type Experience = {
  organization: string;
  organizationInitial: string;
  period: string;
  roles: ExperienceRole[];
};

export const EXPERIENCES: Experience[] = [
  {
    organization: "WealthNavi",
    organizationInitial: "W",
    period: "2024年7月 - 現在",
    roles: [
      { title: "プロダクト開発チーム", achievements: ["新規プロダクト開発"] },
      { title: "金融システム開発チーム", achievements: ["口座開設関連アプリケーション開発"] },
    ],
  },
  {
    organization: "フリーランス",
    organizationInitial: "F",
    period: "2024年12月 - 現在",
    roles: [
      { title: "エンジニア", achievements: ["フリーランス向け書類作成アプリケーション開発"] },
    ],
  },
  {
    organization: "シンプレクス株式会社",
    organizationInitial: "S",
    period: "2022年4月 - 2024年6月",
    roles: [{ title: "D2", achievements: ["証券会社向けアプリケーション開発"] }],
  },
  {
    organization: "明治大学",
    organizationInitial: "M",
    period: "2015年4月 - 2019年3月",
    roles: [{ title: "理工学部", achievements: ["機械情報工学科"] }],
  },
];
