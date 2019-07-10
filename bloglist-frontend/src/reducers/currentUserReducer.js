import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const login = (username, password) => {
  return async dispatch => {
    try {
      const loggedUser = await loginService.login({
        username: username.value, password: password.value,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      dispatch({
        type: 'LOGIN',
        user: loggedUser
      })
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('Wrong credentials', 'error', 5))
    }
  }
}

export const getUser = () => {
  return async dispatch => {
    let user = null
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
    dispatch({
      type: 'GET_USER',
      user: user
    })
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch({
      type: 'LOGOUT',
      user: null
    })
  }
}

const userReducer = (state = [], action) => {
  console.log('action', action)
  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'GET_USER':
    return action.user
  case 'LOGOUT':
    return action.user
  default:
    return state
  }
}

export default userReducer