import {
  SET_SEARCH_TERM,
} from '../constants'

const initialState = ''

const searchTerm = (state=initialState, action) => {
  const actionType = action.type

  if (SET_SEARCH_TERM === actionType) {
    const {query} = action.payload
    return query
  }

  return state
}

export default searchTerm