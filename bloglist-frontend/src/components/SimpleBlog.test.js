import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'Testing Simple Blog component',
  author: 'Just Tester',
  likes: 5
}

test('renders content', () => {

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const blogTitle = component.container.querySelector('.blog-title')

  expect(blogTitle).toHaveTextContent(
    'Testing Simple Blog component'
  )

  expect(blogTitle).toHaveTextContent(
    'Just Tester'
  )

  const blogLikes = component.container.querySelector('.blog-likes')

  expect(blogLikes).toHaveTextContent(
    '5'
  )
})

test('clicking the like button twice calls the event handler twice', async () => {

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
