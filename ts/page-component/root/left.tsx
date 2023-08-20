import React, {HtmlHTMLAttributes} from "react";
import {useTheme} from "../../hooks/theme/themeHook";
import {Title} from "../../component/title";

interface HeaderProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function Left(props: HeaderProp) {
  const theme = useTheme()

  return <div
    {...props}
    css={{
      width: "300px",
    }}
  >
    <Title css={{
      left: "15px",
      top: "5px",
      position: "relative",
    }}/>
  </div>

}
