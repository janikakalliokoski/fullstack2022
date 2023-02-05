import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const sortedAnecdotes = anecdotes.sort((a,b) => b.votes - a.votes)

    const voteAnecdote = (id) => {
        dispatch(vote(id))
    }

    return (
        <div>
            <ul>
            {sortedAnecdotes.map(anecdote =>
                <li
                key={anecdote.id}
                >
                {anecdote.content}
                <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
                <br></br>
                has {anecdote.votes} votes
                </li>
            )}
            </ul>
        </div>
    )
}

export default AnecdoteList