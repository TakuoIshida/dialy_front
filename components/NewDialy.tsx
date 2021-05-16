import BackToTop from '@/components/BackToTop'
import { PutApiResponse, DialyType } from '@/types/type'
import { comprehendApiReq, postDialy } from '@/utils/functions'
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

  const putTodo = async (newDialy: DialyType) => {
    try {
      const res = await comprehendApiReq(newDialy.content)
      console.log(res)
      // POSTする前にComprehendを入れてレスポンスの点数を受け取る
      // 点数を基に感情を４パターンに分ける
      // ４パターンに分けた結果をnewDialyに追加する
      const data: PutApiResponse = await postDialy(
        process.env.NEXT_PUBLIC_BASE_API + '/dialy',
        newDialy,
      )
      console.log(data)
      setNewDialy(initialNewDialy)
    } catch (e) {
      console.log(e)
      return
    }
  }
  return (
    <div>
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
