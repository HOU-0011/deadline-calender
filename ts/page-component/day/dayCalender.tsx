import React, {HtmlHTMLAttributes} from "react";
import {CalenderHeader} from "../calender/calenderHeader";
import {useTheme} from "../../hooks/theme/themeHook";

interface DayPageProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function DayCalender(props: DayPageProp) {
  return <div {...props} css={{
  }}>

  </div>
}
