import datetime
import math

from sqlalchemy import and_

from dedline import db
from dedline.model import Task


class TaskTime:
    date: int
    minute: int

    def __init__(self, date: int, minute: int):
        self.date = date
        self.minute = minute

    def end_date(self) -> int:
        date = self.date
        if self.minute > 0:
            date += 1

        return date


class TaskEntry:
    task: Task
    period: int
    deadline: int
    day_worktime: int

    def __init__(
            self,
            task: Task,
            period: int,
            deadline: int,
            reference: int,
    ):
        self.task = task
        self.deadline = deadline
        self.day_worktime = reference
        self.period = period

    def __lt__(self, other):
        return self.task.day_deadline < other.task.day_deadline


class DayTask:
    period: int
    task: Task

    def __init__(self, period: int, task: Task):
        self.period = period
        self.task = task


class TaskStore:
    task_entries = list[TaskEntry]()

    def append_task(self, task: Task, deadline_date: int, period: int, reference: int):
        self.task_entries.append(TaskEntry(task, period, deadline_date, reference))

        while self.get_last_time().end_date() > deadline_date:
            self.set_lowest_day_worktime(self.get_lowest_day_worktime() - 1)

    def get_last_time(self) -> TaskTime:
        date = 0
        remainder = 0

        for task in self.task_entries:
            period = task.period
            rest = task.day_worktime - remainder

            while period >= rest:
                period -= task.day_worktime
                date += 1
            remainder = period

        return TaskTime(date, remainder)

    def get_tasks(self, day: int) -> list[DayTask]:
        date = 0
        remainder = 0
        result = list[DayTask]()

        for task_entry in self.task_entries:
            period = task_entry.period
            rest = task_entry.day_worktime - remainder

            while period >= rest:
                period -= task_entry.day_worktime

                if day == date:
                    result.append(DayTask(rest, task_entry.task))

                date += 1
            if day == date:
                result.append(DayTask(period, task_entry.task))
            remainder = period

        return result

    def get_lowest_day_worktime(self) -> int:
        lowest = 0
        for task in self.task_entries:
            if lowest > task.day_worktime:
                lowest = task.day_worktime
        return lowest

    def set_lowest_day_worktime(self, lowest: int):
        for task in self.task_entries:
            if task.day_worktime < lowest:
                task.day_worktime = lowest


def get_tasks(date: datetime.date):
    tasks: list[Task] = db.session.query(Task).filter(
        and_(Task.end_date.is_(None), Task.end_date >= datetime.date.today())
    ).all()
    task_store = TaskStore()

    if len(tasks) == 0:
        return task_store

    tasks.sort()

    for task in tasks:
        deadline_days = (task.day_deadline - datetime.date.today()).days
        task_store.append_task(task, deadline_days, task.period, 6)

    return task_store.get_tasks((date - datetime.date.today()).days)
