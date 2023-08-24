import React, {useState} from "react";
import Modal from 'react-modal';
import ReactModal from 'react-modal';
import {useTheme} from "../../hooks/theme/themeHook";
import {Button} from "../../component/button";
import {css} from "@emotion/react";
import {formatDate, initTask, toDate} from "../../service/objects";
import {DynamicTextarea} from "../../component/dynamicTextarea";
import {fetchJson} from "../../hooks/jsonHook";

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
  }}>


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
      margin-top: 20px;
      font-size: 1.1rem;
      width: 100%;
    `}>
      <p>終了日</p>
      <input css={css`
        ${inputStyle};
        width: 150px;
        text-align: center;
      `} type={"date"} defaultValue={formatDate(toDate(task.end_date == undefined ? "" : task.end_date))}
             onChange={(e) => {
               const newTask = initTask(task)
               newTask.end_date = e.target.value == "" ? undefined : e.target.value
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
        fetchJson("", new URLSearchParams(), {method: "POST"})
      }}>登録</Button>
    </div>
  </Modal>
}