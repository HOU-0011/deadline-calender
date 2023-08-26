import React, {HtmlHTMLAttributes} from "react";
import {css} from "@emotion/react";
import {Error} from "../../component/error";
import {useTheme} from "../../hooks/theme/themeHook";
import {dayTasksState} from "../../hooks/dayTasksState";
import {Button} from "../../component/button";
import {taskManager} from "../../service/taskManager";
import {formatDate} from "../../service/objects";

interface TasksProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function Tasks(props: TasksProp) {
  const theme = useTheme()

  let total_worktime = 0
  const tasks = dayTasksState.use().map((value) => {
    const task = value.task
    const id = task.id
    if (id == undefined) return undefined
    total_worktime += value.period

    return <div key={value.task.id} css={css`
      margin: 5px;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
      background-color: ${theme.accent};
      border-radius: 5px;
    `}>
      <div css={css`
        display: flex;
        justify-content: space-between;
      `}>
        <h2 css={css`
          border-bottom: 1px solid ${theme.accent2};
          color: ${theme.textAccent};
          width: fit-content;
          padding-left: 10px;
          padding-right: 10px;
        `}>{task.title}</h2>


        <div>
          <Button css={css`
            margin-top: 10px;
            font-size: 1.1rem;
            background-color: ${theme.accent2};
            margin-right: 10px  ;
          `} onClick={() => {
            task.end_date = formatDate(new Date())
            taskManager.deleteTask(id, (error: string) => {
              console.error(error)
            })
          }}>
            削除
          </Button>


          {task.end_date == undefined ? <Button css={css`
            margin-top: 10px;
            font-size: 1.1rem;
            background-color: ${theme.main};
          `} onClick={() => {
            task.end_date = formatDate(new Date())
            taskManager.putTask(task, (error: string) => {
              console.error(error)
            })
          }}>
            完了
          </Button> : <p css={css`
            margin-top: 10px;
            font-size: 1.1rem;
          `}>
            完了済み
          </p>}
        </div>


      </div>

      <p css={css`
      `}>締め切り: {task.deadline_date.replace("-", "/")} |
        作業時間: {value.period * 10}/{task.period * 10}分</p>

      <p css={css`
        margin-top: 10px;
        border-bottom: 1px solid ${theme.accent2};
        color: ${theme.textAccent};
        padding-left: 5px;
      `}>内容</p>

      <p>{task.contents}</p>
    </div>
  }).filter((value) => {return value != undefined})


  return <div {...props} css={css`
    overflow: scroll;
  `}>
    <Error error={dayTasksState.err()}/>
    {tasks}
  </div>
}