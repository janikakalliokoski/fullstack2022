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

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value} %</td>
        </tr>
      </tbody>
    )
  }
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>

  )
}

const Statistics = (props) => {
  const left = props.left
  const middle = props.middle
  const right = props.right
  const all = props.all.length
  const average = props.average/all
  const positive = props.positive*100/all

  if (all === 0) {
    return (
      <div>
        No feedback yet
      </div>
    )
  }

  return (
    <table>
      <StatisticLine text="good" value={left} />
      <StatisticLine text="neutral" value={middle} />
      <StatisticLine text="bad" value={right} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </table>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [middle, setMiddle] = useState(0)
  const [right, setRight] = useState(0)
  const [all, setAll] = useState([])
  const [good, setGood] =useState(0)
  const [neutral, setNeutral] =useState(0)
  const [bad, setBad] =useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const heading1 = 'Give feedback'

  const heading2 = 'Statistics'

  const handleLeftClick = () => {
    setLeft(left + 1)
    setAll(all + 1)
    setGood(good + 1)
    setPositive(positive + 1)
    setAverage(average + 1)
  }

  const handleMiddleClick = () => {
    setMiddle(middle + 1)
    setAll(all + 1)
    setNeutral(neutral + 1)
    setAverage(average + 0)
  }

  const handleRightClick = () => {
    setRight(right + 1)
    setAll(all + 1)
    setBad(bad + 1)
    setAverage(average - 1)
  }

  return (
    <div>
      <div>
        <Heading heading={heading1} />
        <Button handleClick={handleLeftClick} text='Good' />
        <Button handleClick={handleMiddleClick} text='Neutral' />
        <Button handleClick={handleRightClick} text='Bad' />
        <Heading heading={heading2} />
        <Statistics left={left} middle={middle} right={right} all={all} average={average} positive={positive}/>
      </div>
    </div>
  )
}

export default App

