import React, {HtmlHTMLAttributes} from "react";
import {Link} from 'react-router-dom'
import {useTheme} from "../hooks/theme/themeHook";
import {Pages} from "../page-component/root/contents";
import {siteName} from "../common";

interface Prop extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function Title(props: Prop) {
  const theme = useTheme()
  return <div
    {...props}
    css={{
      textAlign: "center",
      fontSize: "1.2rem",
      width: "fit-content",
      color: theme.textBase
    }}
  >
    <Link to={Pages.top} className={"text-md px-2 font-bold"}>
      {siteName}
    </Link>
  </div>
}
