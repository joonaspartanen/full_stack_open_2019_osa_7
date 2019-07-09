import React from 'react'
import { connect } from 'react-redux'

const Users = (props) => {
  const users = props.users

  if (!users) {
    return null
  }

  return (
    <table>
      <tbody>
        <tr style={{ margin: 10 }}>
          <th style={{ margin: 10 }}>Username</th>
          <th style={{ margin: 10 }}>Added blogs</th>
        </tr>
        {users.map(user =>
          <tr key={user.username}>
            <td style={{ margin: 10 }}><a href={`/users/${user.id}`}>{user.username}</a></td>
            <td style={{ margin: 10 }}>{user.blogs.length}</td>
          </tr>)}
      </tbody>
    </table>  
  )
}
const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, null)(Users)