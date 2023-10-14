import Contact from "./Contact"

const Phonebook = ( {persons, deletePerson} ) => {
    return(
        <div>
            <h2>Numbers</h2>
            {persons.map(person => 
                <div key={person.id}>
                    <Contact person={person}/> <button onClick={() => deletePerson(person)}>Delete</button>
                </div>
            )}
        </div>

    )
}

export default Phonebook

