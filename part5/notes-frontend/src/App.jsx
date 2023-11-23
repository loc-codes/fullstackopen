import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
    const [notes, setNotes] = useState([])
    const [user, setUser] = useState(null)
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    const noteFormRef = useRef()

    const addNote = (noteObject) => {
        noteFormRef.current.toggleVisibility()
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
            })
    }

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }



    const handleLogin = async ({ username, password }) => {
        try {
            const user = await loginService.login(
                { username, password }
            )

            window.localStorage.setItem(
                'loggedNoteAppUser', JSON.stringify(user)
            )

            noteService.setToken(user.token)
            setUser(user)
        }
        catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }

        console.log('logging in with', username, password)
    }

    const loginForm = () => (
        <Togglable buttonLabel='login'>
            <LoginForm
                handleLogin={handleLogin}
            />
        </Togglable>
    )

    const noteForm = () => (
        <Togglable buttonLabel="New note" ref={noteFormRef}>
            <NoteForm
                createNote={addNote}
            />
        </Togglable>
    )

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            {!user && loginForm()}
            {user && <div>
                <p>{user.name} logged in</p>
                {noteForm()}
            </div>
            }

            <h2>Notes</h2>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>

            <Footer />
        </div>
    )
}

export default App