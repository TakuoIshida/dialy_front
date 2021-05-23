import { DialyListType, DialyType } from '@/types/type'
import { ActionTypes } from './ActionTypes'
import { ReducksDialyActionTypes } from './Types'
// actionsファイルには、純粋にRedux Actionのみを記述します。

export const initdialyList = (
  dialyList: DialyListType,
): ReducksDialyActionTypes => {
  return {
    type: ActionTypes.INIT,
    payload: dialyList,
  }
}

export const selectDialy = (
  selectedDialy: DialyType,
): ReducksDialyActionTypes => {
  return {
    type: ActionTypes.SELECT_DIALY,
    payload: selectedDialy,
  }
}
