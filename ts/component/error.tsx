import React, {HtmlHTMLAttributes} from "react";
import {css} from "@emotion/react";
import {useTheme} from "../hooks/theme/themeHook";

interface ErrorProp extends HtmlHTMLAttributes<HTMLDivElement> {
  error: string | undefined
}

export function Error(props: ErrorProp) {
  const {error, ...divProps} = props
  const theme = useTheme()

  return error && <div {...divProps} css={css`
    color: red;
    background-color: ${theme.accent};
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
  `}>
    {error}
  </div>
}

