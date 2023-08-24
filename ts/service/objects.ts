export interface Task {
  id: number | undefined
  deleted: boolean
  deadline_date: string
  end_date: string | undefined
  period: number
  title: string
  contents: string
}

export function initTask(task: Task | undefined = undefined): Task {
  const date = new Date()
  let result: Task = {
    id: undefined,
    deleted: false,
    deadline_date: formatDate(date),
    end_date: undefined,
    period: 6,
    title: "",
    contents: "",
  }
  if (task != undefined) {
    result.id = task.id
    result.deleted = task.deleted
    result.deadline_date = task.deadline_date
    result.end_date = task.end_date
    result.period = task.period
    result.title = task.title
    result.contents = task.contents
  }

  return result
}

export function toDate(str: string): Date {
  return new Date(str)
}

export function formatDate(date: Date): string {
  return `${(date.getFullYear()).toString().padStart(2, "0")}-` +
    `${(date.getMonth() + 1).toString().padStart(2, "0")}-${(date.getDate()).toString().padStart(2, "0")}`
}

export interface Result<T> {
  error: boolean,
  message: string,
  result: T,
}

export function initResult<T>(result: T, error: boolean = false, message: string = ""): Result<T> {
  return {
    error: error,
    message: message,
    result: result
  }
}

export interface DayTask {
  "period": number,
  "task": Task,
}
