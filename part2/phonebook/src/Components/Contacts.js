const Contact = ( {name, number } ) => {
    return (<div>{name} {number}</div>)
  }
  
  const Contacts = ({filteredPersons}) => {
    return (
    <>
    {filteredPersons.map(person => {
      return (
      <Contact key={person.id} name={person.name} number={person.number}/>
      )
    })}
    </>
    )
  }

export default Contacts