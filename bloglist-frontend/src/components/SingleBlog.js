import React from 'react'
import { handleLike, commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { Loader, Button, Form, Comment, Icon } from 'semantic-ui-react'

const SingleBlog = (props) => {

  const blog = props.blog

  const [comment, commentReset] = useField('text')

  const updateBlog = async (event) => {
    event.preventDefault()
    try {
      props.handleLike(blog)
    } catch (exception) {
      props.setNotification('Updating blog failed', 'error', 5)
    }
  }

  const addComment = async event => {
    event.preventDefault()
    console.log(comment.value)
    props.commentBlog(blog, comment.value)
    commentReset()
  }

  if (!blog) {
    return <Loader active inline size='medium' />
  }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div><Button
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
        style={{ marginBottom: 10 }}
        size='tiny'
      >
      </Button>
      </div>
      <div style={{ marginBottom: 10 }}><a href={`//${blog.url}`}> {blog.url}</a></div>
      <div>added by {blog.user.name}</div>
      <h3>Comments</h3>
      <Form onSubmit={addComment}>
        <Form.Field>
          <input placeholder='Add your comment...' {...comment} required />
        </Form.Field>
        <Button type='submit' color='teal'>Add comment</Button>
      </Form>
      <Comment.Group>
        {blog.comments.map(comment =>
          <Comment key={comment}>
            <Comment.Content key={comment}>
              <Icon name='comment' color='teal' style={{ marginRight: 10 }} />
              {comment}
            </Comment.Content>
          </Comment>)}
      </Comment.Group>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  handleLike,
  commentBlog,
  setNotification
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleBlog)