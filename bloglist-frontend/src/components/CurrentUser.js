import React from 'react'
import PropTypes from 'prop-types'

const CurrentUser = ({ user, setUser }) => {

  const handleLogout = () => {
    console.log(`${user.username} logging out...`)
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  return (
    <>
      <p>{user.username} is logged in
        <button onClick={handleLogout} style={{ marginLeft: .5 + 'em' }} >Logout</button>
      </p>
    </>
  )
}

export default CurrentUser

CurrentUser.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
}