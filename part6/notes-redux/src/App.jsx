import { useEffect } from 'react'
import NewNote from './Components/NewNote'
import Notes from './Components/Notes'
import VisibilityFilter from './Components/VisibilityFilter'
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
  }, [])

  return(
    <div> 
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App