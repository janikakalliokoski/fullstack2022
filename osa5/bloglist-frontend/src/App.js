import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [notification, setNotification] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })
            setUser(user)
            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            setUsername('')
            setPassword('')
            setNotification('logged in succesfully!')
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        } catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogOut = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        blogService.setToken(null)
    }

    const blogFormRef = useRef()

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNotification(`blog ${blogObject.title} added succesfully!`)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
    }

    const changeLikesOfBlog = id => {
        const blog = blogs.find(b => b.id === id)
        const updatedBlog = {
            user: blog.user.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes +1
        }

        blogService
            .update(id, updatedBlog)
            .then(returnedBlog => {
                setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
                setNotification(`you liked ${blog.title}`)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
    }

    const deleteBlog = id => {
        const blog = blogs.find(b => b.id === id)

        if (window.confirm(`Do you want to delete blog ${blog.title} by ${blog.author}?`)) {
            blogService
                .deleteBlog(id)
                .then(() => {
                    setBlogs(originalBlogs => originalBlogs.filter(({ id }) => id !== blog.id))
                    setNotification(`blog ${blog.title} deleted`)
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })
        }
    }

    if (user === null) {
        return (
            <div>
                <h1>Blogs</h1>
                <Error message={errorMessage} />
                <Notification message={notification} />
                <h2>Log in to application</h2>
                <form onSubmit={handleLogin}>
                    <div>
          username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
            password
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <Error message={errorMessage} />
            <Notification message={notification} />
            <p>{user.username} logged in</p>
            <form onSubmit={handleLogOut}>
                <button type="submit">logout</button>
            </form>
            <br></br>
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <BlogForm createNewBlog={addBlog} />
            </Togglable>
            <br></br>
            {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
                <Blog key={blog.id} blog={blog}
                    changeLikesOfBlog={() => changeLikesOfBlog(blog.id)}
                    deleteBlog={() => deleteBlog(blog.id)} />
            )}
        </div>
    )
}

export default App
