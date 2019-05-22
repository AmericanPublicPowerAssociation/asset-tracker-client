import { connect } from 'react-redux'
import App from '../components/App'
import {
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
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
