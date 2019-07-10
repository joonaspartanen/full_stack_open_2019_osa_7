import React from 'react'
import { connect } from 'react-redux'
import { login, getUser } from '../reducers/currentUserReducer'
import { useField } from '../hooks'
import { Form, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const Login = (props) => {

  const [username] = useField('text')
  const [password] = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      props.login(username, password)
      props.history.push('/')
    } catch (exception) {
      props.setNotification('Wrong credentials', 'error', 5)
    }
  }

  return (
    <div className='login-form'>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>Username</label>
          <input
            placeholder='Username'
            value={username.value}
            type={username.type}
            onChange={username.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder='Password'
            value={password.value}
            type={password.type}
            onChange={password.onChange}
          />
        </Form.Field>
        <Button color='teal' type="submit">Login</Button>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  login,
  getUser
}

const LoginWithRouter = withRouter(Login)

export default connect(null, mapDispatchToProps)(LoginWithRouter)