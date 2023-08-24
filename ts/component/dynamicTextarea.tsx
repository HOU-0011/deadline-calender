import React, {ChangeEventHandler, HtmlHTMLAttributes, KeyboardEventHandler} from 'react'
import {getDefault} from '../util/util'
import {css} from "@emotion/react";


interface DynamicTextareaProp extends HtmlHTMLAttributes<HTMLTextAreaElement> {
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined
  value: string
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined
  onSubmit?: KeyboardEventHandler<HTMLTextAreaElement> | undefined
  fontSize?: string
}

export function DynamicTextarea(props: DynamicTextareaProp) {
  const {
    onKeyDown,
    value,
    onChange,
    onSubmit,
    fontSize,
    ...areaProps
  } = props

  return <div css={css`
    position: relative;
  `}>
    <div css={css`
      position: relative;
      overflow: hidden;
      visibility: hidden;
      white-space: pre-wrap;
      overflow-wrap: break-word;
      min-height: ${getDefault(fontSize, "1rem")};
      font-size: ${getDefault(fontSize, "1rem")};
    `}>
      {value + "\u200b"}</div>
    <textarea {...areaProps} name="restQuestion" value={value} css={css`
      border-radius: 5px;
      position: absolute;
      width: 100%;
      height: 100%;
      display: block;
      resize: none;
      overflow: hidden;
      top: 0;
      font-size: ${getDefault(fontSize, "1rem")};
    `} onChange={onChange} onKeyDown={(e) => {
      if (onKeyDown != undefined) onKeyDown(e)

      if (onSubmit == undefined) return
      if (e.key != "Enter") return
      if (!e.ctrlKey && !e.metaKey) return
      if (e.nativeEvent.isComposing) return

      onSubmit(e)
    }}/>
  </div>
}