import React, {useState} from "react";
import Modal from 'react-modal';
import ReactModal from 'react-modal';
import {useTheme} from "../../hooks/theme/themeHook";
import {Button} from "../../component/button";
import {css} from "@emotion/react";
import {formatDate, initTask, Result, toDate} from "../../service/objects";
import {DynamicTextarea} from "../../component/dynamicTextarea";
import {fetchJson, JsonError} from "../../hooks/jsonHook";
import {Error} from "../../component/error";
import {dayTasksState} from "../../hooks/dayTasksState";

interface RegisterTaskModalProp extends ReactModal.Props {
  close: () => void
}

export function RegisterTaskModal(props: RegisterTaskModalProp) {
  const theme = useTheme()
  const {close, ...modalProps} = props
  const [task, setTask] = useState(initTask)
  const inputStyle = css`
    margin-top: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid ${theme.accent2};
  `
  const [err, setErr] = useState<string>()

  return <Modal  {...modalProps} style={{
    content: {
      width: "500px",
      backgroundColor: theme.base,
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }, overlay: {
      display: "flex", justifyContent: "center",
    }
  }} ariaHideApp={false}>


    <div css={css`
      width: 100%;
      display: flex;
      justify-content: space-between;
    `}>
      <h2>タスク登録</h2>
      <Button backgroundColor={"unset"} onClick={() => {
        close()
      }} css={css`
        font-size: 1.1rem;
      `}>&times;</Button>
    </div>


    <Error error={err}/>


    <div css={css`
      margin-top: 20px;
      font-size: 1.1rem;
      width: 100%;
    `}>
      <p>タイトル</p>
      <input css={css`
        width: 150px;
        text-align: center;
        ${inputStyle}
      `} type={"text"} defaultValue={task.title} onChange={(e) => {
        const newTask = initTask(task)
        newTask.title = e.target.value
        setTask(newTask)
      }}/>
    </div>


    <div css={css`
      margin-top: 20px;
      font-size: 1.1rem;
      width: 100%;
    `}>
      <p>内容</p>
      <DynamicTextarea fontSize={"1.1rem"} css={css`
        ${inputStyle};
        width: 100%;
        text-align: center;
      `} value={task.contents} onChange={(e) => {
        const newTask = initTask(task)
        newTask.contents = e.target.value
        setTask(newTask)
      }}/>
    </div>


    <div css={css`
      margin-top: 20px;
      font-size: 1.1rem;
      width: 100%;
    `}>
      <p>作業期間</p>
      <input css={css`
        ${inputStyle};
        width: 70px;
        text-align: right;
      `} type={"number"} value={task.period * 10} onChange={(e) => {
        const newTask = initTask(task)
        const period = parseInt(e.target.value)

        if (isNaN(period)) return;
        if (period < 0) return;

        newTask.period = Math.floor(period / 10)
        setTask(newTask)
      }} step={10}/>分
    </div>


    <div css={css`
      margin-top: 20px;
      font-size: 1.1rem;
      width: 100%;
    `}>
      <p>締め切り日</p>
      <input css={css`
        width: 150px;
        text-align: center;
        ${inputStyle};
      `} type={"date"} defaultValue={formatDate(toDate(task.deadline_date))} onChange={(e) => {
        const newTask = initTask(task)
        newTask.deadline_date = e.target.value
        setTask(newTask)
      }}/>
    </div>


    <div css={css`
      display: flex;
      justify-content: right;
      margin-top: 10px;
    `}>
      <Button backgroundColor={theme.main} css={css`
        font-size: 1.1rem;
      `} onClick={() => {
        fetchJson<Result<undefined>>("api/task", new URLSearchParams(), {
          method: "POST",
          body: JSON.stringify(task),
        })
          .catch((reason: JsonError) => {
            setErr(reason.reason)
            return undefined

          }).then((result) => {
          if (result == undefined) return;
          if (result.error) {
            setErr(result.message)
            return

          }
          close()
          dayTasksState.reload()
        })

      }}>登録</Button>
    </div>
  </Modal>
}