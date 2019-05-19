import React, { Fragment, PureComponent } from 'react'
import { Map } from 'immutable'
import { withStyles } from '@material-ui/core/styles'
import AssetName from './AssetName'


const styles = theme => ({
})


class AssetDetail extends PureComponent {

  updateAsset = attributes => {
    const {
      focusingAsset,
      updateAsset,
    } = this.props
    const id = focusingAsset.get('id')
    updateAsset({id, ...attributes}, {
      onSuccess: this.onSuccess,
      onError: this.onError,
    })
  }

  onSuccess = asset => {
  }

  onError = errors => {
  }

  render = () => {
    const {
      focusingAsset,
    } = this.props
    const name = focusingAsset.get('name')
    const errors = focusingAsset.get('errors', Map())
    return (
      <Fragment>
        <AssetName
          name={name}
          errorText={errors.get('name')}
          onUpdate={this.updateAsset}
        />
      </Fragment>
    )
  }
}


export default withStyles(styles)(AssetDetail)
