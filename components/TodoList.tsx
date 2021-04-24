import { IProps, TodoListType, TodoType } from '@/types/type'
import { postTodo } from '@/utils/functions'
import React, { useState } from 'react'
interface TodoInputEvent extends React.FormEvent<HTMLInputElement> {
  target: HTMLInputElement
}
interface TodoTextAreaEvent extends React.FormEvent<HTMLTextAreaElement> {
  target: HTMLTextAreaElement
}

const TodoList: React.FC<IProps> = (props: IProps) => {
  const initialEditTodo: TodoType = {
    todoId: '',
    title: '',
    content: '',
    isDeleted: false,
  }
  const [todos, setTodos] = useState([] as TodoListType)
  console.log(props)

  const [editTodo, setEditTodo] = useState(initialEditTodo)
  // useEffect(() => {
  //   //   TODO try catch
  //   async function fetchTodos() {
  //     const getTodos: TodoListType = await get(
  //       process.env.NEXT_PUBLIC_BASE_API + '/todos',
  //     )
  //     setTodos(getTodos)
  //   }
  //   fetchTodos()
  // }, [])
  const handleInputChange = (event: TodoInputEvent) => {
    const name = event.target.name
    const value = event.target.value
    setEditTodo({ ...editTodo, [name]: value })
  }
  const handleTextAreaChange = (event: TodoTextAreaEvent) => {
    const name = event.target.name
    const value = event.target.value
    setEditTodo({ ...editTodo, [name]: value })
  }
  const putTodo = async (editTodo: TodoType) => {
    try {
      const todoJson = await postTodo(
        process.env.NEXT_PUBLIC_BASE_API + '/todos',
        editTodo,
      )
      console.log(todoJson)

      setTodos([todoJson, ...todos])
      setEditTodo(initialEditTodo)
    } catch (e) {
      console.log(e)
      return
    }
  }
  return (
    <div>
      <div className="container">
        {/* TODO: Material-UI */}
        <input
          className="form-control"
          type="text"
          name="title"
          placeholder="title"
          value={editTodo.title}
          data-item={editTodo.title}
          onChange={event => handleInputChange(event)}
          required
        />
        <br />
        <textarea
          className="form-control"
          name="content"
          placeholder="content"
          value={editTodo.content}
          onChange={event => handleTextAreaChange(event)}
          required
        />
        <br />
      </div>
      <button onClick={() => putTodo(editTodo)} className="btn btn-primary">
        新規作成・更新
      </button>
      {props.todoList.map((todo: TodoType) => {
        return (
          <ol key={todo.todoId}>
            {/* title, content, flg, 編集, 削除, 感情 */}
            <li>
              {todo.title}: {todo.content}
            </li>
          </ol>
        )
      })}
    </div>
  )
}

export default TodoList
