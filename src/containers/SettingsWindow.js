import { connect } from 'react-redux'
import SettingsWindow from '../components/SettingsWindow'
import {
  toggleTheme,
} from '../actions'
import {
  getWithMorningTheme,
} from '../selectors'


const mapStateToProps = state => ({
  withMorningTheme: getWithMorningTheme(state),
})


const mapDispatchToProps = dispatch => ({
  toggleTheme: payload => {dispatch(
    toggleTheme(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsWindow)
