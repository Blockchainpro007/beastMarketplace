import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import registerReducer from './register'
import referralReducer from './referral'
import marketplaceReducer from './marketplace'
import detailReducer from './detail'
import stakingReducer from './staking'
import ownerReducer from './owners'
import transferHistoriesReducer from './transferHistories'

export const store = configureStore({
  reducer: {
    register: registerReducer,
    referral: referralReducer,
    marketplace: marketplaceReducer,
    detail: detailReducer,
    staking: stakingReducer,
    owner: ownerReducer,
    transferHistories: transferHistoriesReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>