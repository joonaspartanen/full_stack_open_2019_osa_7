import userService from '../services/users'

export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch({
      type: 'GET_ALL',
      data: users
    })
  }
}

const usersReducer = (state = [], action) => {
  console.log('action', action)
  switch (action.type) {
  case 'GET_ALL':
    return action.data.sort((a, b) => b.blogs.length - a.blogs.length)
  default:
    return state
  }
}

export default usersReducer