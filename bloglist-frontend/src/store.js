import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import currentUserReducer from './reducers/currentUserReducer'
import usersReducer from './reducers/usersReducer'


const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: currentUserReducer,
  users: usersReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store