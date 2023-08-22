import React, {HtmlHTMLAttributes} from "react";
import {css} from "@emotion/react";
import {useTheme} from "../hooks/theme/themeHook";
import {getDefault} from "../util/util";

interface ButtonProp extends HtmlHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string | undefined
}

export function Button(props: ButtonProp) {
  const {backgroundColor, ...buttonProps} = props
  const theme = useTheme()

  return <button {...props} css={css`
    text-align: center;
    height: fit-content;
    cursor: pointer;
    background-color: ${getDefault(backgroundColor, theme.accent)};
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 5px;
  `}>
  </button>
}

