import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const sortAnecdotes = anecdotes => anecdotes.slice().sort((a, b) => b.votes - a.votes);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateVote(state, action) {
      const updated = action.payload
      return sortAnecdotes(state.map(anecdote => anecdote.id === updated.id ? updated : anecdote))
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return sortAnecdotes(action.payload)
    }
  }
})

export const { updateVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const beforeVote = state.anecdotes.find(anecdote => anecdote.id === id)
      const afterVote = {
        ...beforeVote,
        votes: beforeVote.votes + 1
      }
    const newAnecdote = await anecdoteService.update(id, afterVote)
    dispatch(updateVote(newAnecdote))
  }
}

export default anecdoteSlice.reducer