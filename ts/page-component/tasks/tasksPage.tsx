import React, {HtmlHTMLAttributes, useState} from "react";
import {TasksHeader} from "./tasksHeader";
import {Tasks} from "./tasks";
import {css} from "@emotion/react";

interface TasksPageProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function TasksPage(props: TasksPageProp) {
  const [date, setDate] = useState(new Date())

  return <div {...props} css={css`
    display: flex;
    flex-direction: column;
  `}>
    <TasksHeader date={date} setDate={setDate} css={css`
      flex: none;
    `}/>
    <Tasks date={date} css={css`
      flex: auto;
      min-height: 0;
    `}/>
  </div>
}
