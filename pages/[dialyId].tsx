import BackToTop from '@/components/BackToTop'
import SnackBar from '@/components/SnackBar'
import { initDialy } from '@/dev/Reducers'
import { RootState } from '@/store'
import { DialyType } from '@/types/type'
import { checkInput, reqDialy } from '@/utils/functions'
// import { DialyType } from '@/types/type'
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// eslint-disable-next-line no-restricted-imports
import style from '../styles/_dialy_form.module.scss'
// 各Todoの編集・更新画面
const EditTodo = () => {
  const [editState, setEditState] = useState(initDialy)
  const [open, setOpen] = useState(false)
  const selectedDialy = useSelector((store: RootState) => store.reducksDaily)
  useEffect(() => {
    setEditState(selectedDialy.selctedDialy)
  }, [selectedDialy])
  const handleTitleChange = (value: string) => {
    setEditState({ ...editState, ['title']: value })
  }
  const handleContentChange = (value: string) => {
    setEditState({ ...editState, ['content']: value })
  }

  const handleIsDeleteChange = (checked: boolean) => {
    setEditState({ ...editState, ['isDeleted']: checked })
  }
  const putDialy = async (editState: DialyType) => {
    checkInput(editState)
    reqDialy(editState)
    setOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 1500)
  }
  return (
    <div>
      <SnackBar open={open} message="更新しました。" />
      <div className={style.dialyForm}>
        <TextField
          className={style.dialyForm__title}
          label="タイトル"
          variant="outlined"
          value={editState.title}
          onChange={event => handleTitleChange(event.target.value)}
        />
        <TextField
          className={style.dialyForm__content}
          label="内容"
          multiline
          variant="outlined"
          value={editState.content}
          onChange={event => handleContentChange(event.target.value)}
          rows={5}
          rowsMax={10}
        />
        <FormControlLabel
          label="削除"
          control={
            <Checkbox
              value={editState.isDeleted}
              color="primary"
              checked={editState.isDeleted}
              onChange={event => handleIsDeleteChange(event.target.checked)}
            />
          }
          labelPlacement="start"
        />

        <div>
          <Button
            onClick={() => putDialy(editState)}
            className={style.dialyForm__put}
            variant="contained"
            color="primary">
            更新
          </Button>
          <BackToTop />
        </div>
      </div>
    </div>
  )
}

export default EditTodo
