import Part from "./Part"
import Total from "./Total"

const Content = ( {parts} ) => {
    const total = parts.reduce((acc, cur) => acc + cur.exercises, 0)
  
    return (
      <div>
        {parts.map( part => 
          <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )}
        <Total sumOfExercises = {total} />
      </div>
    )
  }

  export default Content