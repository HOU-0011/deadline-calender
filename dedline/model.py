import datetime

from sqlalchemy import Integer, String, Date

from dedline import db


class BaseModel:
    __table_args__ = {"extend_existing": True}


class Task(BaseModel, db.Model):
    id: int | None = db.Column(Integer, primary_key=True)
    day_limit: datetime.date = db.Column(Date())
    period: int = db.Column(Integer())
    title: str = db.Column(String(31))
    contents: str = db.Column(String(255))

    def __init__(self, data: dict = None):
        if data is None:
            return
        self.day_limit = datetime.datetime.strptime(data["day_limit"], "%Y/%m/%d").date()
        self.period = data["period"]
        self.title = data["title"]
        self.contents = data["contents"]

    def to_dict(self) -> dict:
        return {
            "day_limit": self.day_limit.strftime("%Y/%m/%d"),
            "period": self.period,
            "title": self.title,
            "contents": self.contents
        }


class Content(BaseModel, db.Model):
    id: int | None = db.Column(Integer, primary_key=True)
    text: str = db.Column(String(31))

    def __init__(self, text: str = ""):
        self.id = None
        self.text = text

    def to_dict(self) -> dict[str, int | str]:
        return {"id": self.id, "text": self.text}
