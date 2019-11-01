import { CREATE_NEW_NODES } from '../constants'

const initialState = [
  { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
  { key: 1, text: 'Beta', color: 'orange', loc: '300 0' },
  { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
  { key: 3, text: 'Delta', color: 'pink', loc: '150 150' } 
]

const nodes = (state = initialState, action) => {
  switch(action.type){
    case CREATE_NEW_NODES: {
      console.log('create new nodes')
      return state
    }
    default:
      return state
  }
}


export default nodes
