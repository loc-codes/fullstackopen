import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const addVoteMutation = useMutation({
    mutationFn: updateAnecdote, 
    onSuccess: (votedAnecdote) => {
      console.log(votedAnecdote)
      queryClient.invalidateQueries('anecdotes')
      dispatch({ type: 'VOTE', payload: votedAnecdote.content })
    }
  })

  const handleVote = (anecdote) => {
    addVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    
  }

  const { isPending, isError, data, error } = useQuery({ queryKey: ['anecdotes'], queryFn: getAnecdotes })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>anecdote service not available due to problems in server</span>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
