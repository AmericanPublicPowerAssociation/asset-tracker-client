import React, { Fragment, PureComponent } from 'react'
import { Map, fromJS } from 'immutable'
import { withStyles } from '@material-ui/core/styles'
import AssetName from './AssetName'
import AssetRelationChips from '../containers/AssetRelationChips'


const styles = theme => ({
})


class AssetDetail extends PureComponent {

  trackChanges = attributes => {
    const { focusingAsset, replaceAsset } = this.props
    replaceAsset(focusingAsset.merge(fromJS(attributes)))
  }

  saveChanges = () => {
    const { focusingAsset, changeAsset } = this.props
    changeAsset(focusingAsset)
  }

  render() {
    const {
      focusingAsset,
      connectedAssets,
      parentAssets,
      childAssets,
    } = this.props
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
          onChange={event => this.trackChanges({
            name: event.target.value})}
          onBlur={this.saveChanges}
        />
        <AssetRelationChips
          label='Connections'
          assetKey='connectedIds'
          relatedAssets={connectedAssets}
        />
        <AssetRelationChips
          label='Parents'
          assetKey='parentIds'
          relatedAssets={parentAssets}
        />
        <AssetRelationChips
          label='Children'
          assetKey='childIds'
          relatedAssets={childAssets}
        />
      </Fragment>
    )
  }
}


export default withStyles(styles)(AssetDetail)
