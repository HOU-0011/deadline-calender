import datetime
import json

import flask_jwt_extended
from flask import request
from flask_jwt_extended import create_access_token, get_jwt_identity
from sqlalchemy import select

from dedline import app, db
from dedline.model import Task, DayOff
from dedline.task_spliter import get_day_tasks
from dedline.util import create_result

if __name__ == "__main__":
    app.run()


@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        return create_result({"msg": "Bad username or password"}), 401

    access_token = flask_jwt_extended.create_access_token(identity=username)
    return create_result({"access_token": access_token})


@app.route("/protected", methods=["GET"])
@flask_jwt_extended.jwt_required()
def protected():
    current_user = flask_jwt_extended.get_jwt_identity()
    return create_result({"logged_in_as": current_user}), 200


@app.route("/api/task", methods=["POST"])
def post_task():
    data: str = request.data.decode("utf-8")
    data: dict = json.loads(data)

    task: Task = Task(data)

    if task.title is None or task.title == "":
        return create_result(None, True, "タイトルがありません")
    if task.deadline_date is None or task.deadline_date == "":
        return create_result(None, True, "期限がありません")

    db.session.add(task)
    db.session.commit()

    return create_result()


@app.route("/api/task", methods=["GET"])
def get_task_list(name: str):
    result = list()

    name = request.args.get("name")
    if name is None:
        name = ""

    for task in db.session.query(Task).filter(Task.title.like(f"%{name}%")).limit(20):
        result.append(task.to_dict())
    return create_result(result)


@app.route("/api/task", methods=["PUT"])
def put_task():
    data: str = request.data.decode("utf-8")
    data: dict = json.loads(data)

    task_id = data.get("id")

    if task_id is None:
        return create_result(None, True, "idが存在しません")

    task = db.session.query(Task).filter(Task.id == task_id).one()

    if task is None:
        return create_result(error=True, message="タスクが存在しません")
    task.apply(data)

    if task.title is None or task.title == "":
        return create_result(None, True, "タイトルがありません")
    if task.deadline_date is None or task.deadline_date == "":
        return create_result(None, True, "期限がありません")

    db.session.commit()

    return create_result()


@app.route("/api/task/<int:task_id>", methods=["DELETE"])
def delete_task(task_id: int):
    task = db.session.query(Task).filter(Task.id == task_id).one()
    if task is None:
        return create_result(error=True, message="タスクが存在しません")
    task.deleted = True
    db.session.commit()

    return create_result()


@app.route("/api/task/<int:year>/<int:month>/<int:date>", methods=["GET"])
def get_tasks(year: int, month: int, date: int):
    day_tasks = get_day_tasks(datetime.date(year, month, date))
    result = list[dict]()

    for day_task in day_tasks:
        result.append(day_task.to_dict())

    return create_result(result)


@app.route("/api/day-off", methods=["POST"])
def post_day_off():
    data: str = request.data.decode("utf-8")
    data: dict = json.loads(data)

    day_off: DayOff = DayOff(data)

    db.session.add(day_off)
    db.session.commit()

    return create_result()


@app.route("/api/day-off", methods=["GET"])
def get_off():
    result = list()
    for day_off in db.session.execute(select(DayOff).limit(20)).scalars():
        result.append(day_off.to_dict())
    return create_result(result)


@app.route("/api/day-off/<int:id>", methods=["DELETE"])
def delete_day_off(off_id: int):
    day_off: DayOff = db.session.get(off_id)
    if day_off is None:
        return create_result(error=True, message="休日が登録されていません")
    day_off.deleted = True
    db.session.commit()

    return create_result()


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
