import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/currentUserReducer'

const CurrentUser = (props) => {

  const user = props.user

  const handleLogout = () => {
    console.log(`${user.username} logging out...`)
    props.logout()
  }

  return (
    <>{user.username} is logged in
      <button onClick={handleLogout} style={{ marginLeft: .5 + 'em' }} >Logout</button>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { logout })(CurrentUser)
