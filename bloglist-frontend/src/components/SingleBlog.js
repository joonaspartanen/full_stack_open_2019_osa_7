import React from 'react'
import { handleLike, commentBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { useField } from '../hooks'

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
    return <div>Loading...</div>
  }
  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={`//${blog.url}`}> {blog.url}</a>
      <div>{blog.likes} likes<button onClick={updateBlog} style={{ marginLeft: 5 }}>like</button></div>
      <div>added by {blog.user.name}</div>
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <div>
          <input {...comment} />
        </div>
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default connect(null, { handleLike, commentBlog })(SingleBlog)