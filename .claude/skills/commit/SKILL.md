---
description: git addされた変更を確認し、czg emoji形式のコミットメッセージを生成してコミットする
disable-model-invocation: true
allowed-tools: Bash(git *)
---

## ステージされた変更の確認

!`git diff --cached --stat`

!`git diff --cached`

## 最近のコミット履歴（スタイル参照用）

!`git log --oneline -5 2>/dev/null`

## 実行手順

1. 上記のステージ済み差分を分析する
2. 変更がなければ「ステージされた変更がありません。`git add` でファイルを追加してください。」と伝えて終了する
3. 変更内容に最も適した type と emoji を以下から選ぶ：

   | type     | emoji              | 用途                         |
   | -------- | ------------------ | ---------------------------- |
   | feat     | :sparkles:         | 新機能                       |
   | fix      | :bug:              | バグ修正                     |
   | docs     | :memo:             | ドキュメント                 |
   | style    | :lipstick:         | コードの意味に影響しない変更 |
   | refactor | :recycle:          | リファクタリング             |
   | perf     | :zap:              | パフォーマンス改善           |
   | test     | :white_check_mark: | テスト                       |
   | chore    | :hammer:           | 雑務                         |
   | ci       | :ferris_wheel:     | CI                           |

4. 日本語で簡潔なコミットメッセージを作成する（「何を」「なぜ」がわかるように）
5. 以下の形式でコミットを実行する：

```
git commit -m "type: :emoji: メッセージ"
```

## ルール

- メッセージは日本語で書く
- 1行に収める（50文字以内が理想）
- 変更の本質を端的に表現する
- `$ARGUMENTS` が渡された場合はそれをメッセージのヒントにする
