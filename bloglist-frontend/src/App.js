import React, { useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Login from './components/Login'
import CurrentUser from './components/CurrentUser'
import AddBlogForm from './components/AddBlogForm'
import Users from './components/Users'
import SingleBlog from './components/SingleBlog'
import SingleUser from './components/SingleUser'
import { setNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { login, getUser } from './reducers/currentUserReducer'
import { getAllUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

const App = (props) => {

  const user = props.user

  useEffect(() => {
    props.initializeBlogs()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    props.getAllUsers()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    props.getUser()
    // eslint-disable-next-line
  }, [])

  console.log(props.blogs)

  const blogById = (id) => props.blogs.find(blog => blog.id === id)

  const userById = (id) => props.users.find(user => user.id === id)

  return (
    <div>
      <Router>
        <nav>
          <Link style={{ paddingRight: 10 }} to="/">Home</Link>
          <Link style={{ paddingRight: 10 }} to="/users">Users</Link>
          {user !== null &&
            <CurrentUser />
          }
        </nav>
        <h1>Bloglist</h1>
        <Notification />
        {user === null && <Login />}
        <Route exact path="/" render={() =>
          <div>
            <AddBlogForm user={user} />
            <Blogs />
          </div>}
        />
        <Route exact path="/users" render={() => <Users />} />
        <Route exact path="/users/:id" render={({ match }) =>
          <SingleUser user={userById(match.params.id)} />
        } />
        <Route exact path="/blogs/:id" render={({ match }) =>
          <SingleBlog blog={blogById(match.params.id)} />
        } />
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  login,
  getUser,
  getAllUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

