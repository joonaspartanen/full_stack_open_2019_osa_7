import React from 'react'

const SingleUser = (props) => {

  const user = props.user

  if (!user) {
    return <div>Loading...</div>
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