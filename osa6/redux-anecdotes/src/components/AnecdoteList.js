import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const sortedAnecdotes = anecdotes.sort((a,b) => b.votes - a.votes)

    const voteAnecdote = (id, content) => {
        dispatch(vote(id))
        dispatch(createNotification(`you voted for ${content}`, 5))
    }

    return (
        <div>
            <ul>
            {sortedAnecdotes.map(anecdote =>
                <li
                key={anecdote.id}
                >
                {anecdote.content}
                <button onClick={() => voteAnecdote(anecdote.id, anecdote.content)}>vote</button>
                <br></br>
                has {anecdote.votes} votes
                </li>
            )}
            </ul>
        </div>
    )
}

export default AnecdoteList