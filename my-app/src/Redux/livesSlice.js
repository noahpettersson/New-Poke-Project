import { createSlice } from '@reduxjs/toolkit'

const livesSlice = createSlice({
    name: 'lives',
    initialState: {
        value: 2,
      },
    reducers: {
      livesSet: (state, action) => {
          state.value = action.payload
      },
      lostLives: (state) => {
        state.value -= 1
      }
    }
})

export const { livesSet, lostLives } = livesSlice.actions

export default livesSlice.reducer