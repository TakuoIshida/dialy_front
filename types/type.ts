export type TodoType = {
  todo_id: string
  title: string
  content: string
  isDeleted: boolean
  //   created_at: string
  //   updated_at: string
}
export type confirmType = {
  value: number
  detail: string
}

export type TodoListType = TodoType[]

export interface IProps {
  todoList: TodoListType
}
