const initialState = [
  {from: 0, fromPort:"out", to: 1, toPort:"in"},
  {from: 0, fromPort:"out", to: 2, toPort:"in"},
]


const edges = (state = initialState, action) => {
  switch(action.type){
    default:
      return state
  }
}

export default edges
