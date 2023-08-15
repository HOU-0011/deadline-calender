from sqlalchemy import Integer, String

from dedline import db


class BaseModel:
    __table_args__ = {"extend_existing": True}


class Content(BaseModel, db.Model):
    id: int | None = db.Column(Integer, primary_key=True)
    text: str = db.Column(String(32))

    def __init__(self, text: str = ""):
        self.id = None
        self.text = text

    def to_dict(self) -> dict[str, int | str]:
        return {"id": self.id, "text": self.text}
