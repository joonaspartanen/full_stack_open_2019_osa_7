import React, { useState } from 'react'
import { useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button, Icon, Form } from 'semantic-ui-react'

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
        <Button
          size='large'
          color='teal'
          onClick={toggleVisibility}
        >
          <Icon name='pencil'>
          </Icon>
          Add blog
        </Button>
      </div>
      <div style={showWhenVisible}>
        <h3>Add new blog</h3>
        <Form onSubmit={addBlog}>
          <Form.Field>
            <label htmlFor="title">Title:</label>
            <input placeholder='Title' {...title} style={formStyle} required />
          </Form.Field>
          <Form.Field>
            <label htmlFor="author">Author:</label>
            <input placeholder='Author' {...author} style={formStyle} required />
          </Form.Field>
          <Form.Field>
            <label htmlFor="url">URL:</label>
            <input placeholder='URL' {...url} style={formStyle} required />
          </Form.Field>
          <Button type="submit" color='teal'>Add blog</Button>
          <Button type="button" onClick={toggleVisibility} style={{ marginLeft: 10 }}>Cancel</Button>
        </Form>
      </div>
    </>
  )
}

const mapDispatchToProps = {
  setNotification,
  createBlog
}

export default connect(null, mapDispatchToProps)(AddBlogForm)