import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: null,
    type: null,
    visible: false
}

const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers: {
      setNotification(state, action) {
        state.message = action.payload.message
        state.type = action.payload.type
        state.visible = true
      },
      clearNotification(state) {
        state.message = null
        state.type = null
        state.visible = false
      }
    }
  })
  
  export default notificationSlice.reducer
  export const { setNotification, clearNotification } = notificationSlice.actions

  export const showNotification = (message, timeOut) => {
    return dispatch => {
      dispatch(setNotification({ message, type: 'info' }))
      setTimeout(() => {
        dispatch(clearNotification());
      }, timeOut * 1000)
    }
  }