import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [top, setTop] = useState(0)

  const updateAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  const updatePoints = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    const index = copy.indexOf(Math.max(...copy))
    setTop(index)
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]}
      <div>has {points[selected]} votes</div>
      <div>
        <button onClick={updatePoints}>vote</button>
        <button onClick={updateAnecdote}>next anecdote</button>
      </div>
      <div>
        <h1>Ancedotes with most votes</h1>
        {anecdotes[top]}
        <div>has {points[top]} votes</div>
      </div>
    </div>
  )
}

export default App