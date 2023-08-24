import React, {HtmlHTMLAttributes} from "react";
import {css} from "@emotion/react";
import {useTheme} from "../../hooks/theme/themeHook";
import {Button} from "../../component/button";
import {dayTasksState} from "../../hooks/dayTasksState";

interface DayHeaderProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function TasksHeader(props: DayHeaderProp) {
  const theme = useTheme()
  const date = dayTasksState.useDate()
  const style = css`
    font-size: 1.5rem;
  `

  return <div {...props} css={css`
    border-bottom: 1px;
    height: 40px;
    border-style: solid;
    display: flex;
    padding-top: 5px;
    border-color: ${theme.accent};
  `}>
    <Button css={css`
      ${style};
      margin-left: 25px;

    `} onClick={() => {
      dayTasksState.setDate(new Date())

    }}>
      <p>今日</p>

    </Button>


    <Button css={css`
      ${style};
      margin-left: 25px;
      color: ${theme.accent2};
      font-weight: bold;

    `} backgroundColor={"unset"} onClick={() => {
      const cloneDate = new Date(date.getTime())
      cloneDate.setDate(date.getDate() - 1)
      dayTasksState.setDate(cloneDate)

    }}>&lt;</Button>


    <Button css={css`
      ${style};
      margin-left: 5px;
      color: ${theme.accent2};
      font-weight: bold;

    `} backgroundColor={"unset"} onClick={() => {
      const cloneDate = new Date(date.getTime())
      cloneDate.setDate(date.getDate() + 1)
      dayTasksState.setDate(cloneDate)

    }}>&gt;</Button>


    <div css={css`
      ${style};
      margin-left: 30px;

    `}>
      <p>{date.getFullYear()}年{date.getMonth() + 1}月{date.getDate()}日</p>

    </div>


  </div>
}
