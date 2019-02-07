import React from 'react'
import { withStyles } from '@material-ui/core/styles'
//import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {
	// ASSET_BY_ID,
	ASSET_TYPE_BY_ID,
} from '../constants';

const styles = () => ({
	root: {
		overflow: 'auto',
		height: '100%',
	},
})

/*
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const rows = [
	{id: '2340', name: 'Station', type: 'g'},
]
*/



// Object.entries(ASSET_BY_ID)
// Object.entries(ASSET_TYPE_BY_ID).map(([id, {name}]) => )

// Asset Name, Asset Type

const TableWindow = ({
	classes,
	assetById,
	setHighlightedAsset,
}) => {
	const rows = Object.entries(assetById).map(([id, {name, typeId}]) => ({
		id: id,
		name: name,
		type: ASSET_TYPE_BY_ID[typeId].name,
	}))
	return (
		<div className={classes.root}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Asset Name</TableCell>
						<TableCell align="right">Asset Type</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map(row => (
						<TableRow key={row.id} onClick={() => setHighlightedAsset({id: row.id})} >
							<TableCell>{row.name}</TableCell>
							<TableCell align="right">{row.type}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}

export default withStyles(styles)(TableWindow)

/*
					<TableCell component="th" scope="row">
						{row.name}
					</TableCell>
*/
