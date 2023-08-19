import datetime

import sqlalchemy
from sqlalchemy import Integer, String, Date

from dedline import db


class BaseModel:
    __table_args__ = {"extend_existing": True}


class Task(BaseModel, db.Model):
    id: int | sqlalchemy.Column = sqlalchemy.Column(Integer, primary_key=True)
    deleted: bool | sqlalchemy.Column = sqlalchemy.Column(sqlalchemy.Boolean)
    day_limit: datetime.date | sqlalchemy.Column = db.Column(Date())
    period: int | sqlalchemy.Column = sqlalchemy.Column(Integer())
    title: str | sqlalchemy.Column = sqlalchemy.Column(String(31))
    contents: str | sqlalchemy.Column = sqlalchemy.Column(String(255))

    def __init__(self, data: dict = None):
        if data is None:
            return
        self.id = data["id"]
        self.deleted = data["deleted"]
        self.day_limit = datetime.datetime.strptime(data["day_limit"], "%Y/%m/%d").date()
        self.period = data["period"]
        self.title = data["title"]
        self.contents = data["contents"]

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "deleted": self.deleted,
            "day_limit": self.day_limit.strftime("%Y/%m/%d"),
            "period": self.period,
            "title": self.title,
            "contents": self.contents
        }


class DayOff(BaseModel, db.Model):
    id: int | sqlalchemy.Column = db.Column(Integer, primary_key=True)
    deleted: bool | sqlalchemy.Column = sqlalchemy.Column(sqlalchemy.Boolean)
    start_date: datetime.date | sqlalchemy.Column = db.Column(Date())
    repetitions: list | sqlalchemy.Column = sqlalchemy.Column(String(32))

    def __init__(self, data: dict = None):
        if data is None:
            return
        self.id = data["id"]
        self.deleted = data["deleted"]
        self.start_date = datetime.datetime.strptime(data["start_date"], "%Y/%m/%d").date()
        self.repetitions = str(data["repetitions"]).split(",")

    def to_dict(self) -> dict:
        repetitions_str = ""
        if len(self.repetitions) != 0:
            repetitions_str = self.repetitions[0]
            for i in range(1, len(self.repetitions)):
                repetitions_str += f",{self.repetitions[i]}"

        return {
            "id": self.id,
            "deleted": self.deleted,
            "start_date": self.start_date.strftime("%Y/%m/%d"),
            "repetitions": repetitions_str,
        }
