const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Total = ({ sum }) => <p>total of {sum} exercises</p>

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

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

  const Course = ({ courses }) => {
    return (
      <>
      {courses.map(course => {
        return (
          <div key={course.id} className="course">
            <Header name={course.name} />
            <Content parts={course.parts} />
          </div>
        )
      })}
      </>
    )
  }

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
  <Course courses={courses} />
  )
}

export default App