const Header = ({ course }) => {
  return (
  <h1>{course}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      <Part data={parts.part1}/>
      <Part data={parts.part2}/>
      <Part data={parts.part3}/>
    </div>
    
  )
}

const Part = ({ data }) => {
  return (
    <p>{data.name} {data.exercises}</p>
  )
}

const Total = ({ number }) => {
  return(
    <p>Number of exercises {number}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={{'part1': part1, 'part2': part2, 'part3': part3}}/>
      <Total number={part1.exercises+part2.exercises+part3.exercises} />
    </div>
  )
}

export default App