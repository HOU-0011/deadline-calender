import json

from flask import request

from dedline import app, db
from dedline.model import Task
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
def get_task():
    result = list()

    name = request.args.get("name")
    if name is None:
        name = ""

    for task in db.session.query(Task).filter(Task.title.like(f"%{name}%")).limit(20):
        result.append(task.to_dict())
    return create_result(result)


# @app.route("/api/day-off", methods=["GET"])
# def get_off()


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
