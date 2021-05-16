export type DialyType = {
  id: string
  title: string
  content: string
  positiveSentiment: number
  negativeSentiment: number
  nutralSentiment: number
  mixedSentiment: number
  isDeleted: boolean
  //   created_at: string
  //   updated_at: string
}
export type confirmType = {
  value: number
  detail: string
}

export type DialyListType = DialyType[]

export interface IProps {
  data: GetApiResponse
}

export interface IDialyInputEvent extends React.FormEvent<HTMLInputElement> {
  target: HTMLInputElement
}

export interface IDialyTextAreaEvent
  extends React.FormEvent<HTMLTextAreaElement> {
  target: HTMLTextAreaElement
}

export interface IDialyCheckBoxEvent {
  target: HTMLInputElement
}

export type GetApiResponse = {
  status: number
  message: string
  result: DialyListType
}
export type PutApiResponse = {
  status: number
  message: string
  result: DialyType
}
