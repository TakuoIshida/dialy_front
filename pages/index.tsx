import DialyList from '@/components/DialyList'
import { GetApiResponse, IProps } from '@/types/type'
import { getDialy } from '@/utils/functions'
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
  return {
    props: { data },
  }
}

const TopPage: React.FC<IProps> = (props: IProps) => {
  console.log(props)

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
      {props.data.result.length > 0 ? (
        <DialyList data={props.data} />
      ) : (
        <p className={style.dialyList__nodata}>入力はありません</p>
      )}
    </div>
  )
}

export default TopPage
