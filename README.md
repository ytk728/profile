# URL

https://career.machidayutaka.jp

# キャリア情報の更新

職歴・学歴は `src/data/experiences.ts` が唯一の情報源。

## LinkedIn からの取り込み

1. LinkedIn の 設定 & プライバシー > データプライバシー > データのダウンロード を開く
2. 「より大きなデータアーカイブ」を選んでリクエストする。`Positions.csv` と `Education.csv` は「特定の内容」の選択肢に含まれないため、こちらを選ぶ必要がある(メールが届くまで最大24時間、リンクの有効期限は72時間)
3. ZIP を `linkedin-export/` に展開する(このディレクトリは `.gitignore` 済み。生データはコミットしない)。アーカイブにはメッセージや検索履歴も含まれるため、取り込み後は削除する
4. `pnpm career:import` を実行する
5. `pnpm check` で整形し、`git diff src/data/experiences.ts` を確認してからコミットする

取り込みは `EXPERIENCES` の並び順と `organizationInitial` を引き継ぎ、新しい職歴を先頭に、新しい学歴を末尾に追加する。型定義は書き換えず、配列リテラルのみを再生成する。

別のディレクトリに展開した場合は `node scripts/import-linkedin-export.mts <dir>` で指定できる。
