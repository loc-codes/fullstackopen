import Header from "./Header"
import Content from "./Content"

const Course = ( {course} ) => {
    return(
      <div>
        <Header key={course.id} course={course.name} />
        <Content parts={course.parts} />
      </div>
    )
  }

export default Course