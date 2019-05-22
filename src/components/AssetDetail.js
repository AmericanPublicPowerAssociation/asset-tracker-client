import React, { Fragment, PureComponent } from 'react'
import { Map } from 'immutable'
import { withStyles } from '@material-ui/core/styles'
import AssetName from './AssetName'


const styles = theme => ({
})


class AssetDetail extends PureComponent {

  trackChanges = attributes => {
    /*
    const { focusingAsset, mergeAsset } = this.props
    const id = focusingAsset.get('id')
    mergeAsset(fromJS({id, ...attributes}))
    */
  }

  saveChanges = attributes => {
    const { focusingAsset, changeAsset } = this.props
    if (this.trackingAsset === focusingAsset) {
      return
    }
    changeAsset({id: focusingAsset.get('id'), ...attributes}, {
      onError: this.onError,
      onSuccess: this.onSuccess,
    })
  }

  onError = errors => {
    /*
    const { focusingAsset, mergeAsset } = this.props
    const id = focusingAsset.get('id')
    mergeAsset(fromJS({id, errors}))
    */
  }

  render = () => {
    const { focusingAsset } = this.props
    const id = focusingAsset.get('id')
    if (!id) {
      return null
    }
    const name = focusingAsset.get('name')
    const errors = focusingAsset.get('errors', Map())
    return (
      <Fragment>
        <AssetName
          name={name}
          errorText={errors.get('name')}
          onChange={this.trackChanges}
          onBlur={this.saveChanges}
        />
      </Fragment>
    )
  }
}


export default withStyles(styles)(AssetDetail)
