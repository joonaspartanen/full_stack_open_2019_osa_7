import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/currentUserReducer'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const CurrentUser = (props) => {

  const user = props.user

  const handleLogout = () => {
    console.log(`${user.username} logging out...`)
    props.logout()
    props.history.push('/')
  }

  return (
    <span style={{ color: '#FFF' }}>{user.username} is logged in
      <Button size='mini' onClick={handleLogout} style={{ marginLeft: 1 + 'em' }} >Logout</Button>
    </span>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const CurrentUserWithRouter = withRouter(CurrentUser)

export default connect(mapStateToProps, { logout })(CurrentUserWithRouter)
