import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: null
    },
    reducers: {
        updateProfile: (state, action) => {
            state.profile = action.payload
        },
        removeProfile: (state, action) => {
            state.profile = null
        }
    }
})
export const { updateProfile, removeProfile } = counterSlice.actions
export const store = configureStore({
    reducer: counterSlice.reducer
})