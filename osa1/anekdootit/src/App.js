import { useState } from 'react'

const Heading = (props) => {
  return (
    <div>
      <h1>{props.heading}</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const heading1 = "Anecdote of the day"
  const heading2 = "Anecdote with most votes:"

  const points = Array(7).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(points)

  const text = "next anecdote"

  const text2 = "vote"

  const handleAnecdoteClick = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
  }

  const mostvotes = Math.max(...votes)
  const indexOfmostvotes = votes.indexOf(mostvotes)

  // console.log(votes)
  // console.log(mostvotes)
  // console.log(votes.indexOf(mostvotes))

  return (
    <div>
      <Heading heading={heading1} />
      {anecdotes[selected]}
      <br></br>
      has {votes[selected]} votes.
      <br></br>
      <Button handleClick={handleAnecdoteClick} text={text} />
      <Button handleClick={handleVoteClick} text={text2} />
      <Heading heading={heading2} />
      {anecdotes[indexOfmostvotes]}
      <br></br>
      has {Math.max(...votes)} votes
    </div>
  )
}

export default App
