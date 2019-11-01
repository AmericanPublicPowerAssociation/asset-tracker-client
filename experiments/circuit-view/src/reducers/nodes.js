import { fromJS, Map } from 'immutable'
import { CREATE_NEW_NODES } from '../constants'

const initialState = fromJS({
  '0': { key: '0', text: 'Alpha', color: 'lightblue', loc: '0 0' },
  '1': { key: '1', text: 'Beta', color: 'orange', loc: '150 0' },
  '2': { key: '2', text: 'Gamma', color: 'lightgreen', loc: '0 150' },
  '3': { key: '3', text: 'Delta', color: 'pink', loc: '300 150' } 
})

const nodes = (state = initialState, action) => {
  switch(action.type){
    case CREATE_NEW_NODES: {
      const data = action.payload.reduce( (map, data) => {
        map[String(data.key)] = data
        return map
      }, {})
      return state.merge(fromJS(data))
    }
    default:
      return state
  }
}


export default nodes
