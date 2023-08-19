import React, {HtmlHTMLAttributes} from "react";
import {useTheme} from "../../hooks/theme/themeHook";
import {orgName} from "../../common";

interface FooterProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function Footer(props: FooterProp) {
  const theme = useTheme()
  const year = new Date().getFullYear().toString()

  return <div
    {...props}
    css={{
      paddingTop: "3px",
      paddingLeft: "25px",
      backgroundColor: theme.main,
      height: "30px",
    }}
  >
    <p css={{
      position: "relative",
      textAlign: "center"
    }}>
      copyright &copy; {year} {orgName}. All rights reserved.
    </p>
  </div>

}
