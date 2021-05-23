import { DialyListType, DialyType } from '@/types/type'
import { Action } from 'redux'
import { ActionTypes } from './ActionTypes'

// Actionの型 Actionを継承
interface InitDialy extends Action {
  type: typeof ActionTypes.INIT
  payload: DialyListType
}
interface SelectDialy extends Action {
  type: typeof ActionTypes.SELECT_DIALY
  payload: DialyType
}
// exportするActionの型：UnionType
export type ReducksDialyActionTypes = InitDialy | SelectDialy

export interface dialyState {
  dialyList: DialyListType
  selctedDialy: DialyType
}
