const attributeValidation = ({ dispatch, getState }) => next => action => {
  return next(action)
}


export default attributeValidation
