import datetime

import sqlalchemy
from sqlalchemy import Integer, String, Date

from dedline import db


class BaseModel:
    __table_args__ = {"extend_existing": True}


class Task(BaseModel, db.Model):
    id: int | None | sqlalchemy.Column = sqlalchemy.Column(Integer, primary_key=True)
    deleted: bool | sqlalchemy.Column = sqlalchemy.Column(sqlalchemy.Boolean, default=False, nullable=False)
    deadline_date: datetime.date | sqlalchemy.Column = sqlalchemy.Column(Date(), nullable=False)
    end_date: datetime.date | None | sqlalchemy.Column = sqlalchemy.Column(Date(), nullable=True)
    period: int | sqlalchemy.Column = sqlalchemy.Column(Integer(), nullable=False)
    title: str | sqlalchemy.Column = sqlalchemy.Column(String(31), nullable=False)
    contents: str | sqlalchemy.Column = sqlalchemy.Column(String(255), nullable=False)

    def __init__(self, data: dict = None):
        if data is None:
            return
        deadline_day = data.get("deadline_date")
        end_date = data.get("end_date")

        self.id = data.get("id")
        self.deleted = data.get("deleted")

        if deadline_day is None:
            self.deadline_date = datetime.date.today()
        else:
            self.deadline_date = datetime.datetime.strptime(deadline_day, "%Y-%m-%d").date()

        if end_date is None:
            self.end_date = None
        else:
            self.end_date = datetime.datetime.strptime(end_date, "%Y-%m-%d").date()

        self.period = data.get("period")
        self.title = data.get("title")
        self.contents = data.get("contents")

    def to_dict(self) -> dict:
        if self.end_date is None:
            end_date = None
        else:
            end_date = self.end_date.strftime("%Y-%m-%d")

        return {
            "id": self.id,
            "deleted": self.deleted,
            "deadline_date": self.deadline_date.strftime("%Y-%m-%d"),
            "end_date": end_date,
            "period": self.period,
            "title": self.title,
            "contents": self.contents
        }

    def __lt__(self, other):
        return self.deadline_date < other.deadline_date


class DayOff(BaseModel, db.Model):
    id: int | sqlalchemy.Column = db.Column(Integer, primary_key=True)
    deleted: bool | sqlalchemy.Column = sqlalchemy.Column(sqlalchemy.Boolean, default=False)
    start_date: datetime.date | sqlalchemy.Column = db.Column(Date())
    repetitions: list | sqlalchemy.Column = sqlalchemy.Column(String(32))

    def __init__(self, data: dict = None):
        if data is None:
            return
        self.id = data.get("id")
        self.deleted = data.get("deleted", False)
        self.start_date = datetime.datetime.strptime(data.get("start_date", ""), "%Y-%m-%d").date()
        self.repetitions = str(data.get("repetitions")).split(",")

    def to_dict(self) -> dict:
        repetitions_str = ""
        if len(self.repetitions) != 0:
            repetitions_str = self.repetitions[0]
            for i in range(1, len(self.repetitions)):
                repetitions_str += f",{self.repetitions[i]}"

        return {
            "id": self.id,
            "deleted": self.deleted,
            "start_date": self.start_date.strftime("%Y-%m-%d"),
            "repetitions": repetitions_str,
        }
