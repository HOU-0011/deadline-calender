import {Route, Routes} from "react-router-dom";
import React, {HtmlHTMLAttributes} from "react";
import {CalenderPage} from "../calender/calender";

interface ContentsProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function Contents(props: ContentsProp) {
  return <div {...props} css={{
    width: "600px",
    height: "100%",
  }}>
    <Routes>
      <Route path={"/*"} element={<CalenderPage/>}/>
    </Routes>
  </div>
}

export const Pages = {
  top: "/",
} as const;
