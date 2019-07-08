import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('renders no blogs if user not logged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.login-form')
    )

    const blogs = component.container.querySelectorAll('.blog-title')
    expect(blogs.length).toBe(0)
  })

  test('blogs are rendered if user logged in', async () => {

    let component = render(
      <App />
    )

    await waitForElement(
      () => component.container.querySelector('.login-form')
    )

    const user = {
      name: 'Donald Tester',
      token: '1231231214',
      username: 'tester'
    }

    localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

    component = render(
      <App />
    )

    await waitForElement(
      () => component.container.querySelector('.bloglist')
    )

    const blogs = component.container.querySelectorAll('.blog-title')
    expect(blogs.length).toBe(3)
  })

})
