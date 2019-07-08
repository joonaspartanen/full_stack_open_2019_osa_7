import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Login from './components/Login'
import CurrentUser from './components/CurrentUser'
import AddBlogForm from './components/AddBlogForm'
import { useField } from './hooks'
import { setNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

const App = (props) => {
  const username = useField('text')
  const password = useField('password')

  const [user, setUser] = useState(null)

  useEffect(() => {
    props.initializeBlogs()
  }, [props])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value, password: password.value,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      setUser(user)
    } catch (exception) {
      props.setNotification('Wrong credentials', 'error', 5)
    }
  }

  return (
    <div>
      <h1>Bloglist</h1>

      <Notification />

      {user === null && <Login
        handleLogin={handleLogin}
        username={username}
        password={password}
      />}

      {user !== null &&
        <div>
          <CurrentUser user={user} setUser={setUser} />
          <AddBlogForm />
          <Blogs
            user={user}
          />
        </div>
      }

    </div>
  )
}
export default connect(null, { setNotification, initializeBlogs })(App)

