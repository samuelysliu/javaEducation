import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../model/userProfile'

export default configureStore({
  reducer: {
    userProfile: userSlice,
  },
})