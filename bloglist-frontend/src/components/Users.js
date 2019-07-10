import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

const Users = (props) => {
  const users = props.users

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
            <Table.Cell>
              <a href={`/users/${user.id}`}>{user.name}</a>
            </Table.Cell>
            <Table.Cell>{user.blogs.length}</Table.Cell>
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

export default connect(mapStateToProps, null)(Users)