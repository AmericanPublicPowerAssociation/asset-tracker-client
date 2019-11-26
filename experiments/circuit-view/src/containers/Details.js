import { connect } from 'react-redux'
import Details from '../components/Details'

function getDetails(state) {
  const id = state['focusedNode']
  if (!id) return
  const node = state['nodes'].get(id)
  if (node) return node
}

const mapStateToProps = state => ({
  nodeDetails: getDetails(state) 
})


const mapDispatchToProps = distpatch =>({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details)
