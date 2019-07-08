export const setNotification = (message, type, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: {
        message: message,
        type: type
      }
    })
    await new Promise((resolve) => setTimeout(() => {
      resolve()
    }, time * 1000))
    dispatch({
      type: 'CLEAR',
      notification: {
        message: '',
        class: ''
      }
    })
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    console.log(action.notification)
    return action.notification
  case 'CLEAR':
    return action.notification
  default:
    return state
  }
}

export default notificationReducer