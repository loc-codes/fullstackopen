const NewContactForm = ( {updateName, updateNumber, updatePersons, newName, newNumber} ) => {
    return(
        <div>
            <h3>Add a New Contact</h3>
            <form>
                <div>name: <input value={newName} onChange={updateName}/></div> 
                <div>number: <input value={newNumber} onChange={updateNumber}/></div>
                <div>
                    <button type="submit" onClick={updatePersons}>add</button>
                </div>
            </form>
        </div>
    )
}

export default NewContactForm