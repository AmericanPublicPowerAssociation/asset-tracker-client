import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { ASSET_TYPE_BY_ID } from '../constants'

const styles = () => ({
	root: {
    height: '100%',
	},
  hover: {
    cursor: 'pointer',
  },
})

const TableWindow = ({
	classes,
  // Get local variables
  onSelect,
  // Get global variables
  highlightedAssetId,
	assetById,
	setHighlightedAsset,
}) => {
	return (
		<div className={classes.root}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Asset Name</TableCell>
						<TableCell align='right'>Asset Type</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
        {Object.entries(assetById).map(([id, {name, typeId}]) => (
          <TableRow
            hover
            selected={id === highlightedAssetId}
            classes={{
              hover: classes.hover,
            }}
            onClick={() => {
              setHighlightedAsset({id: id})
              onSelect()
            }}
            key={id}
          >
            <TableCell component='th' scope='row'>{name}</TableCell>
            <TableCell align='right'>{ASSET_TYPE_BY_ID[typeId].name}</TableCell>
          </TableRow>
        ))}
				</TableBody>
			</Table>
		</div>
	)
}

export default withStyles(styles)(TableWindow)
