import React from 'react'
import PropTypes from 'prop-types'

const Login = ({ handleLogin, username, password }) => {

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

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default Login