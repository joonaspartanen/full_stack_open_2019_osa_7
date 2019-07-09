import React, { useState } from 'react'
import { useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const AddBlogForm = (props) => {

  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    display: visible ? 'none' : '',
    marginBottom: 18
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const formStyle = {
    marginLeft: .5 + 'em',
    marginBottom: 1 + 'em'
  }

  const addBlog = async event => {
    event.preventDefault()
    toggleVisibility()

    try {
      const blogObject = {
        title: title.value,
        author: author.value,
        url: url.value
      }

      props.createBlog(blogObject)
      titleReset()
      authorReset()
      urlReset()

      props.setNotification(
        `The blog ${title.value} by ${author.value} was added to the list`,
        'success',
        5
      )
    } catch (exception) {
      props.setNotification('Adding blog failed', 'error', 5)
    }
  }

  if (!props.user) {
    return null
  }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>Add blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>Add new blog</h2>
        <form onSubmit={addBlog}>
          <div>
            <label htmlFor="title">Title:</label>
            <input {...title} style={formStyle} />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input {...author} style={formStyle} />
          </div>
          <div>
            <label htmlFor="url">URL:</label>
            <input {...url} style={formStyle} />
          </div>
          <button type="submit">Add blog</button>
          <button onClick={toggleVisibility} style={{ marginLeft: 10 }}>Cancel</button>
        </form>
      </div>
    </>
  )
}

const mapDispatchToProps = {
  setNotification,
  createBlog
}

export default connect(null, mapDispatchToProps)(AddBlogForm)