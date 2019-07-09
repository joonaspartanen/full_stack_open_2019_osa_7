import React from 'react'
import { connect } from 'react-redux'
import { login, getUser } from '../reducers/currentUserReducer'
import { useField } from '../hooks'

const Login = (props) => {

  const [username] = useField('text')
  const [password] = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      props.login(username, password)
    } catch (exception) {
      props.setNotification('Wrong credentials', 'error', 5)
    }
  }

  const formStyle = {
    marginLeft: .5 + 'em',
    marginBottom: 1 + 'em'
  }

  return (
    <div className='login-form'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            value={username.value}
            type={username.type}
            onChange={username.onChange}
            style={formStyle}
          />
        </div>
        <div>
          Password
          <input
            value={password.value}
            type={password.type}
            onChange={password.onChange}
            style={formStyle}
          />
        </div>
        <button type="submit" style={formStyle}>Login</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  login,
  getUser
}

export default connect(null, mapDispatchToProps)(Login)