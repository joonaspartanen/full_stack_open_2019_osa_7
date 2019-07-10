import React from 'react'
import { Loader } from 'semantic-ui-react'

const SingleUser = (props) => {

  const user = props.user

  if (!user) {
    return <Loader active inline size='medium' />
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default SingleUser