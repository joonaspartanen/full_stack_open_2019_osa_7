import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { handleRemove, handleLike } from '../reducers/blogReducer'

const Blog = (props) => {

  const { blog, user } = props

  if (!user) {
    return null
  }

  const updateBlog = async (event) => {
    event.preventDefault()
    try {
      props.handleLike(blog)
    } catch (exception) {
      props.setNotification('Updating blog failed', 'error', 5)
    }
  }

  const removeButton = () =>
    blog.user.username === user.username &&
    <div style={blogRow}><button onClick={removeBlog}>remove</button></div>

  const removeBlog = async event => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        props.handleRemove(blog.id)
        props.setNotification(`Blog ${blog.title} removed successfully`, 'success', 5)
      } catch (exception) {
        props.setNotification(`Blog ${blog.title} has already been removed`, 'error', 5)
      }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 4,
    paddingLeft: 4,
    marginBottom: 10,
    marginTop: 4,
    border: '1px solid'
  }

  const blogRow = {
    marginBottom: 6
  }

  return (
    <div style={blogStyle} className='bloglist'>
      <div style={blogRow} className='blog-title'>
        <a href={`/blogs/${blog.id}`}><strong>{blog.title} - {blog.author}</strong></a>
      </div>
      <div className='blog-details'>
        <div style={blogRow}>{blog.likes} likes<button onClick={updateBlog} style={{ marginLeft: 5 }}>like</button></div>
        {removeButton()}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setNotification, handleRemove, handleLike })(Blog)