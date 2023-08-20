import React, {HtmlHTMLAttributes, useState} from "react";
import {useTheme} from "../../hooks/theme/themeHook";
import {CalenderHeader} from "./calenderHeader";

interface CalenderProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function CalenderPage(props: CalenderProp) {
  const [date,setDate] = useState(new Date())

  return <div {...props} css={{
  }}>
    <CalenderHeader date={date} setDate={setDate}/>
  </div>
}
