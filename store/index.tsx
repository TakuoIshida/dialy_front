import { ReducksDailyReducer } from '@/dev/Reducers'
import { combineReducers, createStore } from 'redux'

// storeの本体
// Reducerを増やすときはここに記載する
const rootReducer = combineReducers({
  reducksDaily: ReducksDailyReducer,
})

// states type
export type RootState = ReturnType<typeof rootReducer> // ReturnType<typeof fn>は、fnの返り値の型

// store
const store = createStore(rootReducer)

export default store
