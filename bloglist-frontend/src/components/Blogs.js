import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'

const Blogs = (props) => {

  return (
    <div>
      {props.blogs.map(blog =>
        < Blog
          key={blog.id}
          blog={blog}
          user={props.user}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}
export default connect(mapStateToProps, null)(Blogs)