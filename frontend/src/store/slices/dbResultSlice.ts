import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface dbResultState {
    postgresql_response: {
        totalTimes: number[],
        averageTime: number,
        fastestTime: number,
        slowestTime: number,
        variance: number
    }
    redis_response: any,
    redis_hit_count: number,
    redis_miss_count: number,
    no_data: boolean,
    loading: boolean
    error: string | null
}

const initialState: dbResultState = {
  postgresql_response: {
    totalTimes: [],
    averageTime: 0,
    fastestTime: 0,
    slowestTime: 0,
    variance: 0,
  },
  redis_response: null,
  redis_hit_count: 0,
  redis_miss_count: 0,
  no_data: true,
  loading: false,
  error: '11111111 errrrrr',
}

const dbResultSlice = createSlice({
  name: 'dbResult',
  initialState,
  reducers: {
    openLoading: (state) => {
      state.loading = true
    },
    closeLoading: (state) => {
        state.loading = false
    },
    openNoData: (state) => {
      state.no_data = true
    },
    closeNoData: (state) => {
      state.no_data = false
    },
    setPostgresqlResult: (state, action: PayloadAction<any>) => {
      state.postgresql_response = action.payload
      console.log('setPostgresqlResult', action.payload)
    },
    setRedisResult: (state, action: PayloadAction<any>) => {
        state.redis_response = action.payload
      },
    setRedisCacheResult: (state, action: PayloadAction<any>) => {
        state.redis_response = action.payload.data
        state.redis_hit_count = action.payload.hitCount
        state.redis_miss_count = action.payload.missCount
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    resetResult: (state) => {
      state.postgresql_response = initialState.postgresql_response;
      state.redis_response = initialState.redis_response;
      state.redis_hit_count = initialState.redis_hit_count;
      state.redis_miss_count = initialState.redis_miss_count;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
})

export const { 
    openLoading, 
    closeLoading,
    openNoData,
    closeNoData,
    setPostgresqlResult, 
    setRedisResult,
    setError, 
    resetResult 
} = dbResultSlice.actions
export default dbResultSlice.reducer