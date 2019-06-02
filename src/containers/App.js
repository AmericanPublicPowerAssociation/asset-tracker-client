import { connect } from 'react-redux'
import App from '../components/App'
import {
  refreshAssetTypes,
} from '../actions'
import {
  getIsUserMember,
  getWithMorningTheme,
} from '../selectors'


const mapStateToProps = state => ({
  isUserMember: getIsUserMember(state),
  withMorningTheme: getWithMorningTheme(state),
})


const mapDispatchToProps = dispatch => ({
  refreshAssetTypes: payload => {dispatch(
    refreshAssetTypes(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
