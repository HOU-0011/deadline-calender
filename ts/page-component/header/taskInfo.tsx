import React, {HtmlHTMLAttributes} from "react";
import {useTheme} from "../../hooks/theme/themeHook";
import {css} from "@emotion/react";
import {dayTasksState} from "../../hooks/dayTasksState";

interface TotalDayWorktimeProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function TaskInfo(props: TotalDayWorktimeProp) {
  const theme = useTheme()
  const date = dayTasksState.useDate()
  const dayTasks = dayTasksState.use()
  let totalDayWorktime = 0
  dayTasks.forEach((value) => {
    totalDayWorktime += value.period
  })
  let restWorktime = 0
  dayTasks.filter((value) => {
    return value.task.end_date == undefined
  }).filter((value) => {
    restWorktime += value.period
  })

  return <div {...props}>
    <p css={css`
      color: ${theme.textAccent};
      font-size: 1.1rem;
    `}>{date.getFullYear()}年{date.getMonth() + 1}月{date.getDate()}日</p>
    <p css={css`
      margin-top: 5px;
      color: ${theme.textAccent};
    `}>残り作業時間</p>

    <p css={css`
      text-align: right;
    `}>{Math.floor(restWorktime / 6)}時間{(restWorktime % 6) * 10}分/
      {Math.floor(totalDayWorktime / 6)}時間{(totalDayWorktime % 6) * 10}分</p>
  </div>

}
