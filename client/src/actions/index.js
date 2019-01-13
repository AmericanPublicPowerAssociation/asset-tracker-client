import { ADD_ASSET } from '../constants'

export const addAsset = payload => ({type: ADD_ASSET, payload})

export function getData() {
  return function(dispatch) {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        dispatch({ type: 'DATA_LOADED', payload: json})
      })
  }
}
