import { connect } from 'react-redux'
import Navigation from '../components/Navigation'


const mapStateToProps = (state, ownProps) => ({
  editMode: state.editMode
})

export default connect(
  mapStateToProps,
)(Navigation)
