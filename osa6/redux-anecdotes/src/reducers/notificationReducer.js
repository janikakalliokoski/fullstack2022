import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    }
})

let timeoutId

export const { setNotification, deleteNotification } = notificationSlice.actions

export const createNotification = (message, time) => {
    return dispatch => {
        dispatch(setNotification(message))
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => dispatch(setNotification('')), 1000 * time)
    }
}

export default notificationSlice.reducer