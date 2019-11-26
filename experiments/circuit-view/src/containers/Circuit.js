import { connect } from 'react-redux'
import Circuit from '../components/Circuit'
import {
  createNewNodes,
  createNewEdges,
  deleteNodes,
  deleteEdges,
  updateNodes,
  updateEdges,
  setFocusedNode,
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
    createNewNodes(payload))},
  deleteNodes: payload => {dispatch(
    deleteNodes(payload))},
  createNewEdges: payload => {dispatch(
    createNewEdges(payload))},
  deleteEdges: payload => {dispatch(
    deleteEdges(payload))},
  updateNodes: payload => {dispatch(
    updateNodes(payload))},
  updateEdges: payload => {dispatch(
    updateEdges(payload))},
  setFocusedNode: payload => {dispatch(
    setFocusedNode(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Circuit)
