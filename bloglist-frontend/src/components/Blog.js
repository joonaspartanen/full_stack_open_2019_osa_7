import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { handleRemove, handleLike } from '../reducers/blogReducer'
import { Table, Button, Header, Icon } from 'semantic-ui-react'

const Blog = (props) => {

  const { blog, user } = props

  if (!user) {
    return null
  }

  const removeButton = () =>
    blog.user.username === user.username &&
    <Button onClick={removeBlog} size='small' data-cy='removeButton'>
      <Icon name='trash alternate' />
      Delete
    </Button>

  const removeBlog = async event => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        props.handleRemove(blog.id)
        props.setNotification(`Blog ${blog.title} was removed successfully`, 'success', 5)
      } catch (exception) {
        props.setNotification(`Blog ${blog.title} has already been removed`, 'error', 5)
      }
    }
  }

  const updateBlog = async (event) => {
    event.preventDefault()
    try {
      props.handleLike(blog)
    } catch (exception) {
      props.setNotification('Updating blog failed', 'error', 5)
    }
  }

  return (
    <Table.Row className='bloglist'>
      <Table.Cell className='blog-title'>
        <Header as='h4' data-cy='addedBlogTitle'>
          <a href={`/blogs/${blog.id}`}>{blog.title}</a>
        </Header>
      </Table.Cell>
      <Table.Cell className='blog-title'>
        {blog.author}
      </Table.Cell>
      <Table.Cell className='blog-details'>
        <Button
          size='small'
          color='teal'
          icon='thumbs up'
          label={{
            as: 'a',
            basic: true,
            color: 'teal',
            pointing: false,
            content: `${blog.likes} likes`
          }}
          labelPosition='left'
          onClick={updateBlog}
          style={{ marginRight: 10 }}
          data-cy='likeButton'
        >
        </Button>
        {removeButton()}
      </Table.Cell>
    </Table.Row>
  )
}

// {blog.likes} likes<button onClick={updateBlog} style={{ marginLeft: 5 }}>like</button>


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setNotification, handleRemove, handleLike })(Blog)