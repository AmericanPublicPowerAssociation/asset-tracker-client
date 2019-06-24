import { connect } from 'react-redux'
import {
  getIsUserMember,
  refreshAuth,
} from 'appa-auth-consumer'
import App from '../components/App'
import {
  getWithMorningTheme,
} from '../selectors'


const mapStateToProps = state => ({
  isUserMember: getIsUserMember(state),
  withMorningTheme: getWithMorningTheme(state),
})


const mapDispatchToProps = dispatch => ({
  refreshAuth: payload => {dispatch(
    refreshAuth(payload))}
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
