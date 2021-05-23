import {
  ComprehendResponse,
  DialyListType,
  DialyType,
  GetApiResponse,
  // eslint-disable-next-line prettier/prettier
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
export function checkInput(newDialy: DialyType): void {
  if (newDialy.content === '' || newDialy.title === '') {
    alert('未入力です')
    return
  }
  return
}

export async function reqDialy(newDialy: DialyType): Promise<void> {
  try {
    const res: ComprehendResponse = await comprehendApiReq(newDialy.content)
    // POSTする前にComprehendを入れてレスポンスの点数を受け取る
    // ４パターンに分けた結果をnewDialyに追加する
    newDialy.mixedSentiment = res.sentimentScore.Mixed
    newDialy.negativeSentiment = res.sentimentScore.Negative
    newDialy.nutralSentiment = res.sentimentScore.Neutral
    newDialy.positiveSentiment = res.sentimentScore.Positive
    const data: PutApiResponse = await postDialy(
      process.env.NEXT_PUBLIC_BASE_API + '/dialy',
      newDialy,
    )
    console.log(data)
  } catch (e) {
    console.log(e)
    alert('登録に失敗しました。')
    return
  }
}
