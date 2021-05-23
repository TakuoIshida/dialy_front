import { DialyListType, DialyType } from '@/types/type'
import { ActionTypes } from './ActionTypes'
import { dialyState, ReducksDialyActionTypes } from './Types'

export const initDialy: DialyType = {
  id: '',
  title: '',
  content: '',
  positiveSentiment: 0,
  negativeSentiment: 0,
  nutralSentiment: 0,
  mixedSentiment: 0,
  isDeleted: false,
  created_at: '',
  updated_at: '',
}
export const initDialyList: DialyListType = []

const _initailState: dialyState = {
  dialyList: initDialyList,
  selctedDialy: initDialy,
}

function putSelectedDaily(state: dialyState, payload: DialyType): dialyState {
  const newState = {
    dialyList: state.dialyList,
    selctedDialy: payload,
  }
  return newState
}

// TODO: stateに現在にstoreをいれる（useSelector）
export const ReducksDailyReducer = (
  state = _initailState,
  action: ReducksDialyActionTypes,
): dialyState => {
  switch (action.type) {
    case ActionTypes.INIT:
      // return する前に関数で処理を追加してもよい
      return state
    case ActionTypes.SELECT_DIALY:
      return putSelectedDaily(state, action.payload)
    default:
      return state
  }
}
