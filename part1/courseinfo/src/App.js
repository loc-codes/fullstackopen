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
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts={{'part1': parts[0], 'part2': parts[1], 'part3': parts[2]}}/>
      <Total number={parts[0].exercises+parts[1].exercises+parts[2].exercises} />
    </div>
  )
}

export default App