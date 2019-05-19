import {
  SERVER,
} from '../constants'


const attributeValidation = ({ dispatch, getState }) => next => action => {
  const { api } = action
  if (SERVER !== api) {
    return next(action)
  }
  return next(action)
}


export default attributeValidation
