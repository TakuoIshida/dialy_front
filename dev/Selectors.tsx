import { createSelector } from 'reselect'
import { State } from './Types'
// useSelector Hook: storeの中から必要なstateだけを抽出する
const currentDialyListSelector = (state: State) => state.dialyList

// reselectを使って、途中で計算処理してから渡す場合に使用する
export const getReducksDialyList = createSelector(
  [currentDialyListSelector],
  dailyList => dailyList,
)
