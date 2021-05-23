import DialyList from '@/components/DialyList'
import { initdialyList } from '@/dev/Actions'
import { RootState } from '@/store'
import { GetApiResponse, IProps } from '@/types/type'
import { getDialy, judgeOwnSentiment } from '@/utils/functions'
import { Button, Divider } from '@material-ui/core'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line no-restricted-imports
import style from '../styles/_dialy_list.module.scss'
// レンダリングするTopのコンポネントでAPIフェッチする必要がある
// export async function getStaticProps() {
export async function getServerSideProps() {
  const data: GetApiResponse = await getDialy(
    process.env.NEXT_PUBLIC_BASE_API + '/dialy',
  )
  const dialyList = judgeOwnSentiment(data.result)
  return {
    props: { dialyList },
  }
}

const TopPage: React.FC<IProps> = (props: IProps) => {
  console.log(props.dialyList)

  // interface をかませる
  const selectedDialy = useSelector((store: RootState) => store.reducksDaily)
  console.log('selectedDialy')
  console.log(selectedDialy)

  const dispatch = useDispatch()
  const handleDailyList = () => dispatch(initdialyList(props.dialyList))
  useEffect(() => {
    handleDailyList()
  }, [])

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
