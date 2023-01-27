import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, changeLikesOfBlog, deleteBlog }) => {
    const [visible, setVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const label = visible
        ? 'hide' : 'view'

    const changeVisibilityStatus = () => {
        if (visible === true) {
            setVisible(false)
        } else {
            setVisible(true)
        }
    }

    const showRestInfo = () => {
        return (
            <div>
                <p>author: {blog.author}</p>
                <p>url: {blog.url}</p>
                <p>likes: {blog.likes} <button onClick={changeLikesOfBlog}>like</button></p>
                <p>creator: {blog.user.username}</p>
                <p><button onClick={deleteBlog}>delete</button></p>
            </div>
        )
    }

    return (
        <div style={blogStyle}>
            {blog.title}
            <button onClick={changeVisibilityStatus}>{label}</button>
            {visible === true ? showRestInfo() : null}
        </div>
    )
}

Blog.propTypes = {
    changeLikesOfBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
}

export default Blog