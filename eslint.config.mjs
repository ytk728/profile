import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: ["out/**", ".next/**"] },
  ...coreWebVitals,
  ...typescript,
  // eslint-plugin-react's auto-detection breaks under ESLint 10, so pin the version.
  { settings: { react: { version: "19.3" } } },
];

export default eslintConfig;
