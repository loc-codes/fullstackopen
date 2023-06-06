import { useState } from 'react'

const Title = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ name, handleClick }) => {
  return (
    <button onClick={handleClick}>{name}</button>
  )
}

const StatisticLine = ({ name, number }) => {
  return (
    <div>{name} {number}</div>
  )
} 

const Statistics = ({good, neutral, bad, total}) => {
  return (
    <div>
    <StatisticLine name='good' number={good} />
    <StatisticLine name='neutral' number={neutral} />
    <StatisticLine name='bad' number={bad} />
    <StatisticLine name='all' number={total} />
    <StatisticLine name='average' number={(good*1+bad*-1)/total} />
    <StatisticLine name='positive' number={`${(good/total)*100}%`} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => {
    setGood(good + 1)
  }

  const neutralClick = () => {
    setNeutral(neutral + 1)
  }

  const badClick = () => {
    setBad(bad + 1)
  }


  const total = good+neutral+bad
  const initialised = !(good===0&&neutral===0&&bad===0)
  return (
    <div>
      <Title text='give feedback'/>
      <Button name='good' handleClick={goodClick} />
      <Button name='neutral' handleClick={neutralClick} />
      <Button name='bad' handleClick={badClick} />
      <Title text='statistics' />
      {initialised 
      ? (<><Statistics good={good} neutral={neutral} bad={bad} total={total} /> </>)
      : (<div>No feedback given</div>)
      }
    </div>
  )
}

export default App