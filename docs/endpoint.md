# endpoint

* すべてのレスポンスはResultオブジェクトでラップする
* 型がない大文字で始まる要素は[object](object.md)を表す

***

## GET /api/task?name=name

* 登録されているタスクの一覧を表示

| query パラメータ | 内容    | 必須 |
|-------------|-------|----|
| name        | 名前の検索 | x  |

response

```json
[
  Task
]
```

***

## POST /api/task

* 新しいタスクの登録

request body

```json
Task
```

***

## DELETE /api/task/{id}

* 指定した日のタスクを削除する

| path パラメータ | 内容 |
|------------|----|
| id         | id | 

response

```json
Task
```

***

## PUT /api/task/{id}

* 指定した日のタスクを編集する

| path パラメータ | 内容 |
|------------|----|
| id         | id | 

response

```json
Task
```

***

## GET /api/task/{date}

* 指定した日のタスクを表示する

| path パラメータ | 内容 |
|------------|----|
| date       | 日付 | 

response

```json
Task
```

***

## GET /api/day-off

* 休みの日を取得します

response

```json
[
  DayOff
]
```

***

## POST /api/day-off

* 新しい休日の登録

request body

```json
DayOff
```

***

## DELETE /api/day-off/{id}

* 指定した日の休日を削除する

| path パラメータ | 内容 |
|------------|----|
| date       | 日付 | 

response

```json
Task
```
