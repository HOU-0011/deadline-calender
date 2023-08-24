import {Route, Routes} from "react-router-dom";
import React, {HtmlHTMLAttributes} from "react";
import {TasksPage} from "../tasks/tasksPage";
import {css} from "@emotion/react";

interface ContentsProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function Contents(props: ContentsProp) {
  return <div {...props} css={css`
    width: 700px;
  `}>
    <Routes>
      <Route path={"/*"} element={<TasksPage css={css`
        height: 100%;
      `}/>}/>
    </Routes>
  </div>
}

export const Pages = {
  top: "/",
} as const;
