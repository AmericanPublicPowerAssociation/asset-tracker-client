import { connect } from 'react-redux'
import Circuit from '../components/Circuit'
import {
  createNewNodes,
  createNewEdges,
} from '../actions'


const mapStateToProps = state => ({
  nodes: state['nodes'],
  edges: state['edges'],
})


const mapDispatchToProps = dispatch => ({
  createNewNodes: payload => {dispatch(
    createNewNodes(payload))}
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Circuit)
