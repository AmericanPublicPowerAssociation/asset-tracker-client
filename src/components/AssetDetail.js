import React, { Fragment, PureComponent } from 'react'
import { Map } from 'immutable'
import { withStyles } from '@material-ui/core/styles'
import AssetName from './AssetName'


const styles = theme => ({
})


class AssetDetail extends PureComponent {
  state = {
    name: '',
    errorByKey: Map(),
  }

  setAssetNameProps = (value, errorText) => {
    const {
      errorByKey,
    } = this.state
    this.setState({
      name: value,
      errorByKey: errorByKey.set('name', errorText),
    })
  }

  render = () => {
    const {
      focusingAsset,
    } = this.props
    const {
      errorByKey,
    } = this.state
    const name = focusingAsset.get('name')
    return (
      <Fragment>
        <AssetName
          value={name}
          errorText={errorByKey.get('name')}
          setProps={this.setAssetNameProps}
        />
      </Fragment>
    )
  }
}


export default withStyles(styles)(AssetDetail)
