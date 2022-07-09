const Header = ({name}) => {
    return (
      <h2>{name}</h2>
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
  
    const exercisesArr = parts.map(part => part.exercises)
    const total = exercisesArr.reduce((pv, cv) => pv + cv)
  
    return (
      <p><strong>Number of exercises {total}</strong></p>
    )
};
  
const Course = ({course}) => {
    const {name, parts} = course;

    return (
    <div>
      <Header name={name}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
    )
}

export default Course;