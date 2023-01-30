import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createNewBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createNewBlog({
            url: url,
            title: title,
            author: author
        })
        setUrl('')
        setTitle('')
        setAuthor('')
    }

    return (
        <form onSubmit={addBlog}>
            <label>
                title:
                <input
                    id = 'title'
                    value={title}
                    onChange={handleTitleChange}
                />
                <br></br>
            </label>
            <label>
                author:
                <input
                    id = 'author'
                    value={author}
                    onChange={handleAuthorChange}
                />
                <br></br>
            </label>
            <label>
                url:
                <input
                    id = 'url'
                    value={url}
                    onChange={handleUrlChange}
                />
                <br></br>
            </label>

            <button type="submit">save new blog</button>
        </form>
    )
}

BlogForm.propTypes = {
    createNewBlog: PropTypes.func.isRequired
}

export default BlogForm