import BackToTop from '@/components/BackToTop'
import SnackBar from '@/components/SnackBar'
import { DialyType } from '@/types/type'
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@material-ui/core'
import React, { useState } from 'react'
// eslint-disable-next-line no-restricted-imports
import style from '../styles/_dialy_form.module.scss'

// 各Todoの編集・更新画面
const EditTodo = () => {
  const initialEditDialy: DialyType = {
    id: '',
    title: '',
    content: '',
    positiveSentiment: 0,
    negativeSentiment: 0,
    nutralSentiment: 0,
    mixedSentiment: 0,
    isDeleted: false,
  }
  // storeからeditする対象のtodoを取得
  const [editState, setEditState] = useState(initialEditDialy)

  const handleTitleChange = (value: string) => {
    setEditState({ ...editState, ['title']: value })
  }
  const handleContentChange = (value: string) => {
    setEditState({ ...editState, ['content']: value })
  }

  const handleIsDeleteChange = (checked: boolean) => {
    setEditState({ ...editState, ['isDeleted']: checked })
  }
    setOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 1500)
  return (
      <SnackBar open={open} message="更新しました。" />
    <div className={style.dialyForm}>
      <TextField
        className={style.dialyForm__title}
        label="タイトル"
        variant="outlined"
        onChange={event => handleTitleChange(event.target.value)}
      />
      <TextField
        className={style.dialyForm__content}
        label="内容"
        multiline
        variant="outlined"
        onChange={event => handleContentChange(event.target.value)}
        rows={5}
        rowsMax={10}
      />
      <FormControlLabel
        label="削除"
        control={
          <Checkbox
            color="primary"
            checked={editState.isDeleted}
            onChange={event => handleIsDeleteChange(event.target.checked)}
          />
        }
        labelPlacement="start"
      />

      <div>
        <Button
          className={style.dialyForm__put}
          variant="contained"
          color="primary">
          更新
        </Button>
        <BackToTop />
      </div>
    </div>
  )
}

export default EditTodo
