from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dedline.db'
app.config['JSON_AS_ASCII'] = False

db: SQLAlchemy = SQLAlchemy()
db.init_app(app)

import model
import api

with app.app_context():
    db.create_all()
