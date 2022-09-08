import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'userProfile',
    initialState: {
        value: {
            "account": "",
            "id": "",
            "class": "",
            "authority": "",
            "label": ""
        }
    },
    reducers: {
        editUser: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { editUser } = userSlice.actions

export default userSlice.reducer