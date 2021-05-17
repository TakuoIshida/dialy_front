import {
  DialyListType,
  DialyType,
  GetApiResponse,
  PutApiResponse
} from '@/types/type'

export const getDialy = async (url: string) => {
  const data: GetApiResponse = await fetch(url).then(res => res.json())
  return data
}

export const postDialy = async (url: string, dialy?: DialyType) => {
  const config: RequestInit = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dialy),
  }
  const data: PutApiResponse = await fetch(url, config).then(res => res.json())
  return data
}

type InputText = {
  inputText: string
}

export const comprehendApiReq = async (content: string) => {
  const param: InputText = {
    inputText: content,
  }
  const config: RequestInit = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(param),
  }
  const data = await fetch(
    process.env.NEXT_PUBLIC_COMPREHEND_API || '',
    config,
  ).then(res => res.json())
  return data
}

export function judgeOwnSentiment(dialyList: DialyListType): DialyListType {
  for (const dialyItem of dialyList) {
    // positive  > 0.5 && negative < 0.5 ==> positive
    if (
      dialyItem.positiveSentiment > 0.5 &&
      dialyItem.negativeSentiment < 0.5
    ) {
      dialyItem.sentimentResult = 'positive'
      continue
    }
    // positive  < 0.5 && negative > 0.5 ==> negative
    if (
      dialyItem.positiveSentiment < 0.5 &&
      dialyItem.negativeSentiment > 0.5
    ) {
      dialyItem.sentimentResult = 'negative'
      continue
    }
    // other nutral
    dialyItem.sentimentResult = 'nutral'
  }
  return dialyList
}
