import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    console.log(content)
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const changeAnecdote = async (id) => {
    const anecdotes = await getAll()
    const anecdoteToUpdate = anecdotes.find(v => v.id === id)
    const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1
    }
    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    const updatedAnecdotes = anecdotes.map(anecdote =>
        anecdote.id !== id ? anecdote : response.data)
    return updatedAnecdotes
}

const exports = {
    getAll,
    createNew,
    changeAnecdote
}

export default exports