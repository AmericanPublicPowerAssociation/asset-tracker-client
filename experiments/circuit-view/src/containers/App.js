import { connect } from 'react-redux'
import App from '../components/App'
import {
  togglePalette,
} from '../actions'


const mapStateToProps = state => ({
  palette: state['palette'],
})

const mapDispatchToProps = dispatch => ({
  togglePalette: payload => {dispatch(
    togglePalette(payload))},
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
