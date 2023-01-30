import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createNewBlog = jest.fn()

    render(<BlogForm createNewBlog={createNewBlog} />)

    const title = screen.getByLabelText('title:', { selector: 'input' })
    const author = screen.getByLabelText('author:', { selector: 'input' })
    const url = screen.getByLabelText('url:', { selector: 'input' })
    const sendButton = screen.getByText('save new blog')

    await user.type(title, 'Test Blog')
    await user.type(author, 'Tester')
    await user.type(url, 'google.com')
    await user.click(sendButton)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0].title).toBe('Test Blog')
    expect(createNewBlog.mock.calls[0][0].author).toBe('Tester')
    expect(createNewBlog.mock.calls[0][0].url).toBe('google.com')
})