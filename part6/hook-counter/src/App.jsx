import { useReducer, useContext } from 'react'
import Button from './Components/Button'
import Display from './Components/Display'
import CounterContext from './CounterContext'

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0)

  return (
    <div>
      <Display />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
        <Button type='ZERO' label='0' />
      </div>
    </div>
  )
}

export default App