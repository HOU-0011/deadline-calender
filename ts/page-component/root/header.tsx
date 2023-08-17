import React, {HtmlHTMLAttributes} from "react";
import {useTheme} from "../../hooks/theme/themeHook";
import {Title} from "../../component/title";

interface HeaderProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function Header(props: HeaderProp) {
  const theme = useTheme()

  return <div
    {...props}
    css={{
      paddingTop: "3px",
      backgroundColor: theme.main,
      height: "30px",
    }}
  >
    <Title css={{
      marginLeft: "5px",
      position: "relative",
    }}/>
  </div>

}
