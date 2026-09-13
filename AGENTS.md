<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# コーディングルール

## コメントは書かない

コードにコメントを書かないこと。意図は命名で表現する。

- 説明したくなったら、変数・関数・型の名前を具体的にする
- 処理の塊を説明したくなったら、名前の付いた関数に切り出す
- 「なぜ」を残したいなら、コミットメッセージか PR の説明に書く

```ts
// NG
// テーマのちらつきを防ぐため hydration 前に同期実行する
const script = `...`;

// OK
const themeScriptRunBeforeHydration = `...`;
```

例外は、外部ツールが解釈する指示のみ(`biome-ignore`、`@ts-expect-error` など)。これらは抑制する理由を必ず添える。

## Lint / Format

Biome に一本化している。ルールを無効化する前に、まずコード側を直せないか検討すること。

- `pnpm check` — 整形 + 自動修正
- `pnpm check:ci` — 検査のみ(CI と同じ)
- `pnpm typecheck` — 型検査

コミット時は lefthook が staged ファイルに `biome check --write` を適用する。

# Git 運用ルール

## ブランチ

`main` へ直接コミットしない。`<type>/<summary>` 形式のブランチを切って PR を出す。

- `feat/light-dark-mode`、`fix/build`、`chore/pr-ci`
- type はコミットメッセージの type と揃える(`feat` は `add` の別名として許容)

## コミットメッセージ

件名は `[type]summary` の 1 行。`type` の後ろにスペースは入れない。

```
[fix]prevent theme flash on first paint
[chore]add PR CI, pre-commit hooks, and migrate lint/format to Biome
```

- type: `add` / `change` / `fix` / `remove` / `refactor` / `style` / `docs` / `test` / `chore`
- summary は英語の命令形・小文字始まり、末尾にピリオドを付けない
- 「なぜ」はコミット本文か PR の説明に書く(コードにコメントは書かない)
- 1 コミット 1 目的。フォーマット差分と実装差分は混ぜない
- マージコミットと revert コミットは対象外

この形式は lefthook の `commit-msg` フックで `scripts/validate-commit-msg.sh` が検証する。

## プルリクエスト

- テンプレート `.github/pull_request_template.md` の項目を埋める
- マージ前に CI(`pnpm check:ci` / `pnpm typecheck` / `pnpm build`)を通す

lefthook が pre-commit で Biome、pre-push で `pnpm typecheck` を実行する。`pnpm build` は CI のみ。
