export type DialyType = {
  id: string
  title: string
  content: string
  positiveSentiment: number
  negativeSentiment: number
  nutralSentiment: number
  mixedSentiment: number
  isDeleted: boolean
  sentimentResult?: 'positive' | 'negative' | 'nutral'
  //   created_at: string
  //   updated_at: string
}
export type confirmType = {
  value: number
  detail: string
}

export type DialyListType = DialyType[]

export interface IProps {
  dialyList: DialyListType
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

export type ComprehendResponse = {
  statusCode: number
  sentimentScore: {
    Mixed: number
    Negative: number
    Neutral: number
    Positive: number
  }
}
