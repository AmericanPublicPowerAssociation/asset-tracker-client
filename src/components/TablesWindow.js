import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import AssetFilter from '../containers/AssetFilter'
import { getAssetTypeName } from '../routines'


const styles = theme => ({
  root: {
    height: '100%',
  },
  hover: {
    cursor: 'pointer',
  },
})


class TablesWindow extends PureComponent {

  componentDidMount() {
    const { refreshAssets } = this.props
    refreshAssets()
  }

  render = () => {
    const {
      classes,
      onSelect,
      // Get redux variables
      visibleAssets,
      focusingAssetId,
      setFocusingAsset,
    } = this.props
    return (
      <Grid container className={classes.root}>
        <Grid item>
          <AssetFilter />
        </Grid>
        <Grid item xs>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {visibleAssets.map(asset => {
              const assetId = asset.get('id')
              const assetName = asset.get('name')
              const assetTypeName = getAssetTypeName(asset)
              return (
                <TableRow
                  hover
                  classes={{
                    hover: classes.hover,
                  }}
                  selected={assetId === focusingAssetId}
                  onClick={() => {
                    setFocusingAsset({id: assetId})
                    onSelect()
                  }}
                  key={assetId}
                >
                  <TableCell component='th' scope='row'>
                    {assetName}
                  </TableCell>
                  <TableCell>
                    {assetTypeName}
                  </TableCell>
                </TableRow>
              )
            })}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    )
  }
}


export default withStyles(styles)(TablesWindow)
