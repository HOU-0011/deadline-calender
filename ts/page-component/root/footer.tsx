import React, {HtmlHTMLAttributes} from "react";
import {useTheme} from "../../hooks/theme/themeHook";
import {orgName} from "../../common";

interface FooterProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function Footer(props: FooterProp) {
  const theme = useTheme()
  const year = new Date().getFullYear().toString()

  return <footer {...props} css={{
    height: "19px",
    borderTop: "1px",
    borderStyle: "solid",
    borderColor: theme.accent,
  }}>
    <p css={{
      position: "relative",
      textAlign: "center",
      fontSize: "0.8rem"
    }}>
      copyright &copy; {year} {orgName}. All rights reserved.
    </p>
  </footer>

}
