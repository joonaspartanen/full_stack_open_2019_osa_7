import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { handleRemove, handleLike } from '../reducers/blogReducer'

const Blog = (props) => {

  const { blog, user } = props

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
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

  const blogAdder = () => <div style={blogRow}>added by {blog.user.name}</div>

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
      <div onClick={toggleVisibility} style={blogRow} className='blog-title'>
        <strong>{blog.title} - {blog.author}</strong>
      </div>
      <div style={showWhenVisible} className='blog-details'>
        <div style={blogRow}><a href={`//${blog.url}`}> {blog.url}</a></div>
        <div style={blogRow}>{blog.likes} likes<button onClick={updateBlog} style={{ marginLeft: 5 }}>like</button></div>
        {blogAdder()}
        {removeButton()}
      </div>
    </div>
  )
}

export default connect(null, { setNotification, handleRemove, handleLike })(Blog)