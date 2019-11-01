import { connect } from 'react-redux'
import Circuit from '../components/Circuit'
import {
  createNewNodes,
  createNewEdges,
} from '../actions'


const toArray = (immutableObj) => {
  return immutableObj.reduce( (arr, data) => {
    arr.push(data.toJS())
    return arr
  }, [])
}

const mapStateToProps = state => ({
  nodes: toArray(state['nodes']),
  edges: toArray(state['edges']),
})


const mapDispatchToProps = dispatch => ({
  createNewNodes: payload => {dispatch(
    createNewNodes(payload))}
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Circuit)
