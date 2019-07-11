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
  Route, Link, Redirect
} from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'

const App = (props) => {

  const user = props.user
  console.log('User:', user)

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
    <Container>
      <Router>
        <Menu color='teal' inverted stackable>
          <Menu.Item
            header as='h3'
            style={{ color: '#FFF' }}
          >
            Bloglist
          </Menu.Item>
          <Menu.Item data-cy='homeLink'>
            <Link
              style={{ paddingRight: 10, color: '#FFF' }}
              to="/"
            >
              Home
            </Link>
          </Menu.Item>
          <Menu.Item data-cy='usersLink'>
            <Link
              style={{ paddingRight: 10, color: '#FFF' }}
              to="/users"
            >
              Users
            </Link>
          </Menu.Item>
          {user !== null &&
            <Menu.Item>
              <CurrentUser />
            </Menu.Item>
          }
        </Menu>
        <Notification />
        {user === null && <Login />}
        <Route exact path="/" render={() =>
          user ?
            <div>
              <AddBlogForm user={user} />
              <Blogs />
            </div>
            : <Redirect to='/' />
        }
        />
        <Route exact path="/users" render={() =>
          user ? <Users /> : <Redirect to='/' />
        } />
        <Route exact path="/users/:id" render={({ match }) =>
          <SingleUser user={userById(match.params.id)} />
        } />
        <Route exact path="/blogs/:id" render={({ match }) =>
          <SingleBlog blog={blogById(match.params.id)} />
        } />
      </Router>
    </Container >
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

