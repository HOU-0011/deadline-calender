import {fetchJson, JsonError} from "./jsonHook";
import {DayTask, Result} from "../service/objects";
import {GlobalState} from "./globalState";

class DayTasksState {

  private readonly tasksState = new GlobalState<DayTask[]>([])
  private readonly errState = new GlobalState<string | undefined>(undefined)
  private readonly dateState = new GlobalState<Date>(new Date())
  private date: Date = new Date()

  constructor() {
    this.reload()
  }

  use() {
    return this.tasksState.use()
  }

  err() {
    return this.errState.use()
  }

  useDate() {
    return this.dateState.use()
  }

  setDate(date: Date) {
    if (this.date == date) return
    this.date = date
    this.reload()
    this.dateState.set(date)
  }

  reload() {
    fetchJson<Result<DayTask[]>>(`/api/task/${encodeURIComponent(this.date.getFullYear())}` +
      `/${encodeURIComponent(this.date.getMonth() + 1)}/${encodeURIComponent(this.date.getDate())}`)
      .catch((error: JsonError) => {
        this.errState.set(error.reason)
        return undefined
      }).then((result) => {
      if (result == undefined) return
      if (result.error) {
        this.errState.set(result.message)
      }
      this.tasksState.set(result.result)
      this.errState.set(undefined)
    })
  }
}

export const dayTasksState = new DayTasksState()