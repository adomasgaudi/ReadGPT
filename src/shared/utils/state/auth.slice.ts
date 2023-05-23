import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState: { loggedIn: boolean } = {
  loggedIn: true,
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeLogin: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload
    },
  },
})

export const { changeLogin } = authSlice.actions
export default authSlice
