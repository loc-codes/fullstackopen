import NewNote from './Components/NewNote'
import Notes from './Components/Notes'
import VisibilityFilter from './Components/VisibilityFilter'


const App = () => {
  const filterSelected = (value) => {
    console.log(value)
  }

  return(
    <div> 
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App