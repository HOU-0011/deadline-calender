import React, {HtmlHTMLAttributes} from "react";
import {css} from "@emotion/react";
import {useTheme} from "../../hooks/theme/themeHook";

interface DayHeaderProp extends HtmlHTMLAttributes<HTMLDivElement> {
  date: Date
  setDate: (date: Date) => void
}

export function TasksHeader(props: DayHeaderProp) {
  const theme = useTheme()
  const {date, setDate, ...divProps} = props
  const buttonStyle = css`
    ${textStyle};
    text-align: center;
    cursor: pointer;

    &:hover {
      border-color: ${theme.base2};
    }
  `
  const circleButtonStyle = css`
    ${buttonStyle};
    border-radius: 100%;
    height: 35px;
    width: 35px;
    color: ${theme.accent};
    font-weight: bold;
  `

  return <div {...divProps} css={{
    borderBottom: "1px",
    height: "40px",
    borderStyle: "solid",
    display: "flex",
    paddingTop: "5px",
    borderColor: theme.accent,
  }}>
    <div css={css`
      ${buttonStyle};
      margin-left: 15px;
    `} onClick={() => {
      setDate(new Date())
    }}>
      <p>今日</p>
    </div>

    <div css={css`
      ${circleButtonStyle};
      margin-left: 20px;
    `} onClick={() => {
      const cloneDate = new Date(date.getTime())
      cloneDate.setDate(date.getDate() - 1)
      setDate(cloneDate)
    }}>&lt;</div>

    <div css={css`
      ${circleButtonStyle};
    `} onClick={() => {
      const cloneDate = new Date(date.getTime())
      cloneDate.setDate(date.getDate() + 1)
      setDate(cloneDate)
    }}>&gt;</div>

    <div css={css`
      ${textStyle};
      margin-left: 50px;
    `}>
      <p>{date.getFullYear()}年{date.getMonth() + 1}月{date.getDate()}日</p>
    </div>
  </div>
}

const textStyle = css`
  font-size: 1.5rem;
  margin-left: 10px;
`
