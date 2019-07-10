import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

const Blogs = (props) => {

  return (
    <Table striped celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Author</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={props.user}
          />
        )}
      </Table.Body>
    </Table>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}
export default connect(mapStateToProps, null)(Blogs)