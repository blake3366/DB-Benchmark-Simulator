import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface dbResultState {
    postgresql_response: {
        totalTimes: number[],
        averageTime: number,
        fastestTime: number,
        slowestTime: number,
        variance: number
    }
    redis_response: {
        totalTimes: number[],
        averageTime: number,
        fastestTime: number,
        slowestTime: number,
        hitCount: number,
        missCount: number,
        hitRate: string    
    },
    simulate_count: number,
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
  redis_response: {
    totalTimes: [],
    averageTime: 0,
    fastestTime: 0,
    slowestTime: 0,
    hitCount: 0,
    missCount: 0,
    hitRate: '',    
 },
  simulate_count: 0,
  no_data: true,
  loading: false,
  error: '',
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
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    addSimulateCount: (state, action: PayloadAction<number>) => {
      state.simulate_count +=1
    },
    resetResult: (state) => {
      state.postgresql_response = initialState.postgresql_response;
      state.redis_response = initialState.redis_response;
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.no_data = initialState.no_data;
      state.simulate_count = initialState.simulate_count;
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
    resetResult,
    addSimulateCount
} = dbResultSlice.actions
export default dbResultSlice.reducer