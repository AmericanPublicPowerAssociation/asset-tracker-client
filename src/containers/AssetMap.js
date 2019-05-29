import { connect } from 'react-redux'
import AssetMap from '../components/AssetMap'
import {
  setMapViewport,
} from '../actions'
import {
  getMapStyle,
  getMapViewport,
  getBaseMapStyleName,
} from '../selectors'


const mapStateToProps = state => ({
  mapViewport: getMapViewport(state),
  mapStyle: getMapStyle(state),
  baseMapStyleName: getBaseMapStyleName(state),
})


const mapDispatchToProps = dispatch => ({
  setMapViewport: payload => {dispatch(
    setMapViewport(payload))},
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssetMap)
