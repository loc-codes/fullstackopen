import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state, action) {
      console.log(action)
      const id = action.payload
      const beforeVote = state.find(anecdote => anecdote.id === id)
      const afterVote = {
        ...beforeVote,
        votes: beforeVote.votes + 1
      }
      return state
        .map(anecdote => anecdote.id === id ? afterVote : anecdote)
        .sort((a, b) => b.votes - a.votes)
    },
    createAnecdote(state, action) {
      console.log(action)
      const newAnecdote = asObject(action.payload)
      return state.concat(newAnecdote)
    }
  }
})

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTE': {
//       const id = action.payload.id
//       const beforeVote = state.find(anecdote => anecdote.id === id)
//       const afterVote = {
//         ...beforeVote,
//         votes: beforeVote.votes + 1
//       }
//       return state
//         .map(anecdote => anecdote.id === id ? afterVote : anecdote)
//         .sort((a, b) => b.votes - a.votes)
//     }
//     case 'NEW_ANECDOTE': {
      
//     }
//     default: 
//       return state
//   }
// }

// export const addVote = (id) => {
//   return ({
//     type: 'VOTE',
//     payload: { id }
//   })
// }

// export const createAnecdote = (anecdote) => {
//   return ({
//     type: 'NEW_ANECDOTE',
//     payload: asObject(anecdote)
//   })
// }

export const { addVote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer