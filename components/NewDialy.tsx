import BackToTop from '@/components/BackToTop'
import SnackBar from '@/components/SnackBar'
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@material-ui/core'
import React, { useState } from 'react'
// eslint-disable-next-line no-restricted-imports
import style from '../styles/_dialy_form.module.scss'

const NewTodo = () => {
  const initialNewDialy: DialyType = {
    id: '',
    title: '',
    content: '',
    positiveSentiment: 0,
    negativeSentiment: 0,
    nutralSentiment: 0,
    mixedSentiment: 0,
    isDeleted: false,
  }
  const [newDialy, setNewDialy] = useState(initialNewDialy)

  const handleTitleChange = (value: string) => {
    setNewDialy({ ...newDialy, ['title']: value })
  }
  const handleContentChange = (value: string) => {
    setNewDialy({ ...newDialy, ['content']: value })
  }

  const handleIsDeleteChange = (checked: boolean) => {
    setNewDialy({ ...newDialy, ['isDeleted']: checked })
  }

    setOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 1500)
  }
  return (
    <div>
      <SnackBar open={open} message="登録しました。" />
      <div className={style.dialyForm}>
        <TextField
          className={style.dialyForm__title}
          label="タイトル"
          variant="outlined"
          value={newDialy.title}
          onChange={event => handleTitleChange(event.target.value)}
        />
        <TextField
          className={style.dialyForm__content}
          label="内容"
          multiline
          variant="outlined"
          value={newDialy.content}
          onChange={event => handleContentChange(event.target.value)}
          rows={5}
          rowsMax={10}
        />
        <FormControlLabel
          label="削除"
          control={
            <Checkbox
              checked={newDialy.isDeleted}
              onChange={event => handleIsDeleteChange(event.target.checked)}
            />
          }
          labelPlacement="start"
        />
        <div>
          <Button
            onClick={() => putTodo(newDialy)}
            className={style.dialyForm__put}
            variant="contained"
            color="primary">
            新規作成
          </Button>
          <BackToTop />
        </div>
      </div>
    </div>
  )
}

export default NewTodo
