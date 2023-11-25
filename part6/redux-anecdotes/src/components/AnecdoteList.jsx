import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes.filter(
        anecdote => anecdote.content.toLowerCase().includes(state.filter))
    )
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(addVote(anecdote.id))
        dispatch(setNotification(
            { 
                message: `You voted ${anecdote.content}`, 
                type: 'info' 
            }
        ))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>)}
        </div>
    )
}

export default AnecdoteList