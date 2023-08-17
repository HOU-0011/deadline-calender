import {Routes} from "react-router-dom";
import React, {HtmlHTMLAttributes} from "react";

interface ContentsProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function Contents(props: ContentsProp) {
  return <div {...props}>
    <Routes>
      {/*<Route path={"/*"} element={<Top/>}/>*/}
    </Routes>
  </div>
}

export const Pages = {
  top: "/",
} as const;
