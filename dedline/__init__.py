import os

import dotenv
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

dotenv.load_dotenv()
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dedline.db'
app.config['JSON_AS_ASCII'] = False
app.config["JWT_SECRET_KEY"] = os.getenv("LOGIN_SECRET")

jwt = JWTManager(app)
db: SQLAlchemy = SQLAlchemy()
db.init_app(app)

import model
import api

with app.app_context():
    db.create_all()
