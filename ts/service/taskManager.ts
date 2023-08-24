import {Result, Task} from "./objects";
import {fetchJson, JsonError} from "../hooks/jsonHook";
import {dayTasksState} from "../hooks/dayTasksState";

class TaskManager {
  putTask(task: Task, setError: (error: string) => void) {
    fetchJson<Result<undefined>>("api/task", new URLSearchParams(), {
      method: "PUT",
      body: JSON.stringify(task),
    }).catch((reason: JsonError) => {
      setError(reason.reason)
      return undefined

    }).then((result) => {
      if (result == undefined) return;
      if (result.error) {
        setError(result.message)
        return

      }
      dayTasksState.reload()
    })
  }
}

export const taskManager = new TaskManager()