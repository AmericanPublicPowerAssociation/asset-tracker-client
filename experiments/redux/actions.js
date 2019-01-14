export function getData() {
  return function(dispatch) {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        dispatch({ type: 'DATA_LOADED', asset: json})
      })
  }
}
