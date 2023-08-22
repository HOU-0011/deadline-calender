import React, {HtmlHTMLAttributes, useState} from "react";
import {useTheme} from "../../hooks/theme/themeHook";
import {TasksHeader} from "./tasksHeader";
import {Tasks} from "./tasks";

interface TasksPageProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function TasksPage(props: TasksPageProp) {
  const [date,setDate] = useState(new Date())

  return <div {...props} css={{
  }}>
    <TasksHeader date={date} setDate={setDate}/>
    <Tasks date={date}/>
  </div>
}
