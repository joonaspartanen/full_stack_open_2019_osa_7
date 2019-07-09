import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      blog: newBlog
    })
  }
}

export const handleLike = blog => {
  return async dispatch => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(likedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      likedBlog
    })
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const updatedBlog = { ...blog, comments: blog.comments.concat(comment) }
    await blogService.comment(updatedBlog)
    dispatch({
      type: 'COMMENT_BLOG',
      updatedBlog
    })
  }
}

export const handleRemove = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      id
    })
  }
}

const blogReducer = (state = [], action) => {
  console.log('action', action)
  switch (action.type) {
  case 'LIKE_BLOG':
    return state.map(b => b.id !== action.likedBlog.id ? b : action.likedBlog)
  case 'INIT_BLOGS':
    return action.data.sort((a, b) => b.likes - a.likes)
  case 'NEW_BLOG':
    return state.concat(action.blog)
  case 'REMOVE_BLOG':
    return state.filter(b => b.id !== action.id)
  case 'COMMENT_BLOG':
    return state.map(b => b.id !== action.updatedBlog.id ? b : action.updatedBlog)
  default:
    return state
  }
}

export default blogReducer