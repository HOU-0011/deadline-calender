import React, {HtmlHTMLAttributes} from "react";
import {TasksHeader} from "./tasksHeader";
import {Tasks} from "./tasks";
import {css} from "@emotion/react";

interface TasksPageProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function TasksPage(props: TasksPageProp) {

  return <div {...props} css={css`
    display: flex;
    flex-direction: column;
  `}>
    <TasksHeader css={css`
      flex: none;
    `}/>
    <Tasks css={css`
      flex: auto;
      min-height: 0;
    `}/>
  </div>
}
