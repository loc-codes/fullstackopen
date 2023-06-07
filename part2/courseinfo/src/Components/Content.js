import Total from "./Total"
import Part from "./Part"

const Content = ({ parts }) => {
    const sum =  parts.reduce((s,p) => {
      return s + p.exercises
    }, 0)
  
    return (
    <>
      {parts.map(part => {
        return (
        <Part key={part.id} part={part} />
        )
      })}
      <Total sum = {sum} />
    </>
    )
  }

export default Content