import { connect } from 'react-redux'
import InformationDrawer from '../components/InformationDrawer'
import {
  closeInformationDrawer,
} from '../actions'
import {
  getIsInformationDrawerOpen,
} from '../selectors'


const mapStateToProps = state => ({
  isInformationDrawerOpen: getIsInformationDrawerOpen(state),
})


const mapDispatchToProps = dispatch => ({
  closeInformationDrawer: payload => {dispatch(
    closeInformationDrawer(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InformationDrawer)
