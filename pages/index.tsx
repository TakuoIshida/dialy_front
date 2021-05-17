import DialyList from '@/components/DialyList'
import { GetApiResponse, IProps } from '@/types/type'
import { getDialy, judgeOwnSentiment } from '@/utils/functions'
import { Button, Divider } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'
// eslint-disable-next-line no-restricted-imports
import style from '../styles/_dialy_list.module.scss'
// レンダリングするTopのコンポネントでAPIフェッチする必要がある
export async function getStaticProps() {
  const data: GetApiResponse = await getDialy(
    process.env.NEXT_PUBLIC_BASE_API + '/dialy',
  )
  // let dialyList = data.result
  const dialyList = judgeOwnSentiment(data.result)
  return {
    props: { dialyList },
  }
}

const TopPage: React.FC<IProps> = (props: IProps) => {
  return (
    <div>
      <div className={style.dialyList__new}>
        <Link href="/createDialy" passHref>
          <Button variant="contained" color="secondary">
            新規作成
          </Button>
        </Link>
      </div>
      <Divider className={style.dialyList__divider} />
      {props.dialyList.length > 0 ? (
        <DialyList dialyList={props.dialyList} />
      ) : (
        <p className={style.dialyList__nodata}>入力はありません</p>
      )}
    </div>
  )
}

export default TopPage
