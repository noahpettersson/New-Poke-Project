import { createSlice } from '@reduxjs/toolkit'

const displayNameSlice = createSlice({
    name: 'displayName',
    initialState: {
        value: "null",
      },
    reducers: {
      saveDisplayName: (state,action) => {
          state.value = action.payload
      },

    }
})

export const { saveDisplayName } = displayNameSlice.actions

export default displayNameSlice.reducer