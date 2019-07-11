import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import { getAllUsers } from '../reducers/usersReducer'

const Users = (props) => {
  const users = props.users

  useEffect(() => {
    props.getAllUsers()
    // eslint-disable-next-line
  }, [])

  if (!users) {
    return null
  }

  return (
    <Table striped celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>User</Table.HeaderCell>
          <Table.HeaderCell>Added blogs</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map(user =>
          <Table.Row key={user.username}>
            <Table.Cell data-cy='user'>
              <a href={`/users/${user.id}`}>{user.name}</a>
            </Table.Cell>
            <Table.Cell data-cy='addedBlogs'>
              {user.blogs.length}
            </Table.Cell>
          </Table.Row>)}
      </Table.Body>
    </Table>
  )
}
const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, { getAllUsers })(Users)