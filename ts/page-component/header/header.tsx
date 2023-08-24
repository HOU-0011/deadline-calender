import React, {HtmlHTMLAttributes, useState} from "react";
import {useTheme} from "../../hooks/theme/themeHook";
import {Title} from "../../component/title";
import {css} from "@emotion/react";
import {Button} from "../../component/button";
import {RegisterTaskModal} from "./registerTaskModal";
import {TaskInfo} from "./taskInfo";

interface HeaderProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function Header(props: HeaderProp) {
  const theme = useTheme()
  const buttonStyle = css`
    width: 100%;
    font-size: 1.3rem;
    margin-top: 10px;
  `
  const [registerTask, setRegisterTask] = useState(false)


  return <header{...props} css={css`
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
      ${buttonStyle};
      margin-top: 50px;

    `} backgroundColor={theme.main} onClick={() => {
      setRegisterTask(true)

    }}>
      タスクの登録

    </Button>

    <Button css={css`
      ${buttonStyle};

    `}>
      休日の登録

    </Button>


    <TaskInfo css={css`
      margin-top: 10px;
      padding: 10px;
      border-top: solid 1px ${theme.accent};
    `}/>


    <RegisterTaskModal isOpen={registerTask} onRequestClose={() => {
      setRegisterTask(false)
    }} close={() => setRegisterTask(false)}/>
  </header>

}
