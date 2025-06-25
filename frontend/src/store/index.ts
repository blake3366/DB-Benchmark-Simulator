// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import dbResultReducer from './slices/dbResultSlice'

export const store = configureStore({
  reducer: {
    dbResult: dbResultReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
