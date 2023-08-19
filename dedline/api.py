import json

from flask import jsonify, request
from sqlalchemy import select

from dedline import app, db
from dedline.model import Content, Task
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
    for task in db.session.execute(select(Task).limit(20)).scalars():
        result.append(task.to_dict())
    return create_result(result)

@app.route("/api/day-off", methods=["GET"])
def get_off()




@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/contents")
def contents():
    result = list()
    for content in db.session.execute(select(Content)).scalars():
        result.append(content.to_dict())

    return jsonify(result)


@app.route("/contents/test")
def contents_test():
    content = Content("dedline aaaaa")
    db.session.add(content)
    db.session.commit()
    return jsonify(content.to_dict())
