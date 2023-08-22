import React, {HtmlHTMLAttributes} from "react";
import {useTheme} from "../../hooks/theme/themeHook";
import {Title} from "../../component/title";
import {css} from "@emotion/react";
import {Button} from "../../component/button";

interface HeaderProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function Header(props: HeaderProp) {
  const theme = useTheme()
  const buttonStyle = css`
    width: 100%;
    font-size: 1.3rem;
    margin-top: 10px;
  `


  return <header
    {...props}
    css={css`
      width: 200px;
      padding-left: 8px;
      padding-right: 8px;
    `}
  >
    <Title css={css`
      top: 5px;
      position: relative;
      width: 100%;

    `}/>

    <Button css={css`
      ${buttonStyle}

    `} backgroundColor={theme.main}>
      タスクの登録

    </Button>

    <Button css={css`
      ${buttonStyle};
      margin-top: 50px;
      
    `}>
      休日の登録

    </Button>

  </header>

}
