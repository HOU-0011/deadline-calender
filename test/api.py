from flask import jsonify
from sqlalchemy import select

from test import app, db
from test.model import Content


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
    content = Content("test aaaaa")
    db.session.add(content)
    db.session.commit()
    return jsonify(content.to_dict())
