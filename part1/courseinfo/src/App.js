const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
};

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
};

const Content = ({parts}) => (
    <div>
      {parts.map(part => 
        <Part part={part} key={part.id}/>
      )}
    </div>
)

const Total = ({parts}) => {
  const total = parts[0].exercises + parts[1].exercises +parts[2].exercises;

  return (
    <p>Number of exercises {total}</p>
  )
};

const Course = ({course}) => {
  const {name, parts} = course;
  return (
  <div>
    <Header name={name}/>
    <Content parts={parts}/>
  </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return (
    <div>
      <Course course={course}/>
    </div>
  );
}

export default App;
