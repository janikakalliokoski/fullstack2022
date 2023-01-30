import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
    const blog = {
        title: 'Test blog'
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('Test blog')
    expect(element).toBeDefined()
})

test('clicking view button shows rest info of blog', async () => {
    const blog = {
        title: 'Test blog',
        author: 'Tester',
        url: 'google.com',
        likes: 3,
        user: {
            username: 'Test Tester'
        }
    }

    render(
        <Blog blog={blog} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element1 = screen.getByText('Test blog')
    expect(element1).toBeDefined()
    const element2 = screen.getByText('author: Tester')
    expect(element2).toBeDefined()
    const element3 = screen.getByText('url: google.com')
    expect(element3).toBeDefined()
    const element4 = screen.getByText('likes: 3')
    expect(element4).toBeDefined()
    const element5 = screen.getByText('creator: Test Tester')
    expect(element5).toBeDefined()
})

test('clicking like button twice calls event handler twice', async () => {
    const blog = {
        title: 'Test blog',
        author: 'Tester',
        url: 'google.com',
        likes: 3,
        user: {
            username: 'Test Tester'
        }
    }

    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} changeLikesOfBlog={mockHandler}/>
    )

    const user = userEvent.setup()
    const button1 = screen.getByText('view')
    await user.click(button1)

    const button2 = screen.getByText('like')
    await user.click(button2)
    await user.click(button2)

    expect(mockHandler.mock.calls).toHaveLength(2)

})
