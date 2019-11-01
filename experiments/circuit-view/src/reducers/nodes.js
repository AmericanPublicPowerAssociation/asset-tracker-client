const initialState = [
  { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
  { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
  { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
  { key: 3, text: 'Delta', color: 'pink', loc: '150 150' } 
]

const nodes = (state = initialState, action) => {
  switch(action.type){
    default:
      return state
  }
}


export default nodes
