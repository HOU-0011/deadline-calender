import datetime
import json

from flask import request
from sqlalchemy import select

from dedline import app, db
from dedline.model import Task, DayOff
from dedline.task_spliter import get_tasks
from dedline.util import create_result


@app.route("/api/task", methods=["POST"])
def post_task():
    data: str = request.data.decode("utf-8")
    data: dict = json.loads(data)

    task: Task = Task(data)

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


@app.route("/api/task/<int:id>", methods=["DELETE"])
def delete_task(task_id: int):
    task: Task = db.session.get(task_id)
    if task is None:
        return create_result(error=True, message="タスクが存在しません")
    task.deleted = True
    db.session.commit()

    return create_result()


@app.route("/api/task/<int:year>/<int:month>/<int:date>", methods=["DELETE"])
def get_task(year: int, month: int, date: int):
    return create_result(get_tasks(datetime.date(year, month, date)))


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


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
