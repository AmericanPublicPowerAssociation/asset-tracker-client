import { connect } from 'react-redux'
import {
  getAuthUrl,
} from 'appa-auth-consumer'
import NotAuthenticatedWindow from '../components/NotAuthenticatedWindow'


const mapStateToProps = state => ({
  authUrl: getAuthUrl(state),
})


const mapDispatchToProps = dispatch => ({
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotAuthenticatedWindow)
