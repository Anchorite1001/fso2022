const Persons = ({personArr}) => (
    <div>
      {personArr.map(person => 
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
)

export default Persons