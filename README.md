# URL

https://career.machidayutaka.jp

# キャリア情報の更新

職歴・学歴・スキルは `src/content/career.json` が唯一の情報源。`src/app/page.tsx` はこれを描画するだけ。

## LinkedIn からの取り込み

1. LinkedIn の 設定 > データのプライバシー > データのコピーを取得 で CSV をダウンロードする
2. ZIP を `linkedin-export/` に展開する(このディレクトリは `.gitignore` 済み。生データはコミットしない)
3. `pnpm career:import` を実行する
4. `git diff src/content/career.json` を確認し、表記とタイムラインの並びを整えてからコミットする

取り込みは既存エントリの並び順と `initial` を引き継ぎ、新しい組織だけを先頭に追加する。`skills` は LinkedIn 側にカテゴリの概念がないため変更しない。

別のディレクトリに展開した場合は `node scripts/import-linkedin-export.mts <dir>` で指定できる。
