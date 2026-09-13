#!/bin/sh
set -eu

commit_msg_file="$1"
subject=$(sed -n '/^[^#]/{p;q;}' "$commit_msg_file")

case "$subject" in
  "Merge "*|"Revert "*) exit 0 ;;
esac

allowed_types="add|change|fix|remove|refactor|style|docs|test|chore"

if printf '%s' "$subject" | grep -Eq "^\[($allowed_types)\][^ ].*"; then
  exit 0
fi

cat >&2 <<MESSAGE
コミットメッセージの形式が不正です。

  受け取った件名: $subject
  期待する形式:   [type]summary

  type: $allowed_types
  例:   [fix]prevent theme flash on first paint

詳細は AGENTS.md の「コミットメッセージ」を参照してください。
MESSAGE
exit 1
