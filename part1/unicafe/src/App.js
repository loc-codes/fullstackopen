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

const Statistic = ({ name, number }) => {
  return (
    <div>{name} {number}</div>
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
  let positive = good/total
  const initialised = !(good===0&&neutral===0&&bad===0)
  return (
    <div>
      <Title text='give feedback'/>
      <Button name='good' handleClick={goodClick} />
      <Button name='neutral' handleClick={neutralClick} />
      <Button name='bad' handleClick={badClick} />
      <Title text='statistics' />
      {/* Add ternary operator for DRY conditional rendering*/}
      {initialised ?                  
      (<>
      <Statistic name='good' number={good} />
      <Statistic name='neutral' number={neutral} />
      <Statistic name='bad' number={bad} />
      <Statistic name='all' number={total} />
      <Statistic name='average' number={(good*1+bad*-1)/total} />
      <Statistic name='positive' number={`${positive*100}%`} />
      </>) 
      : (<div>No feedback given</div>)}
    </div>
  )
}

export default App