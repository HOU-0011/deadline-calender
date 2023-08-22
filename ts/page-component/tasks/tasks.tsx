import React, {HtmlHTMLAttributes} from "react";
import {css} from "@emotion/react";
import {useJson} from "../../hooks/jsonHook";

interface TasksProp extends HtmlHTMLAttributes<HTMLDivElement> {
  date: Date
}

export function Tasks(props: TasksProp) {
  const {date, ...divProps} = props

  const result = useJson((fetch) => {
    return fetch("/api/task/")
  }, undefined, [], (error) => {
  })

  return <div {...divProps} css={css`
  `}>
  </div>
}
