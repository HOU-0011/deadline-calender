# endpoint

* すべてのレスポンスはResultオブジェクトでラップする
* 型がない大文字で始まる要素は[object](./object.md)を表す

***

## GET /task?name=name

* 登録されているタスクの一覧を表示

| query パラメータ | 内容    | 必須 |
|-------------|-------|----|
| name        | 名前の検索 | x  |

response

```json
[
  {
    "task": Task
  }
]
```

***

## POST /task

* 新しいタスクの登録

request body

```json
Task
```

***

## GET /task/{date}

| path パラメータ | 内容 |
|------------|----|
| date       | 日付 | 

response
```json
Task
```

