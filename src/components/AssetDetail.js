import React, { Fragment, PureComponent } from 'react'
import { Map, fromJS } from 'immutable'
import { withStyles } from '@material-ui/core/styles'
import AssetName from './AssetName'


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
          onChange={event => this.trackChanges({
            name: event.target.value})}
          onBlur={this.saveChanges}
        />
      </Fragment>
    )
  }
}


export default withStyles(styles)(AssetDetail)
