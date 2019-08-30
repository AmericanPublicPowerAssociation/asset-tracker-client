import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import AssetFilter from '../containers/AssetFilter'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';



const styles = theme => ({
    // root: {
    //   width: '100%',
    //   marginTop: theme.spacing(3),
    //   overflowX: 'auto',
    // },

    toolBarRoot: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    toolBarHighlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    toolBarSpacer: {
        flex: '1 1 100%',
    },
    toolBarActions: {
        color: theme.palette.text.secondary,
    },
    toolBarTitle: {
        flex: '0 0 auto',
    },

    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },

})

// const useToolbarStyles = theme => ({
//     toolBarRoot: {
//         paddingLeft: theme.spacing(2),
//         paddingRight: theme.spacing(1),
//     },
//     toolBarHighlight:
//         theme.palette.type === 'light'
//             ? {
//                 color: theme.palette.secondary.main,
//                 backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//             }
//             : {
//                 color: theme.palette.text.primary,
//                 backgroundColor: theme.palette.secondary.dark,
//             },
//         spacer: {
//         flex: '1 1 100%',
//     },
//     toolBarActions: {
//         color: theme.palette.text.secondary,
//     },
//     toolBarTitle: {
//         flex: '0 0 auto',
//     },
// });

// const useStyles = makeStyles(theme => ({
//     root: {
//         width: '100%',
//         marginTop: theme.spacing(3),
//     },
//     paper: {
//         width: '100%',
//         marginBottom: theme.spacing(2),
//     },
//     table: {
//         minWidth: 750,
//     },
//     tableWrapper: {
//         overflowX: 'auto',
//     },
//     visuallyHidden: {
//         border: 0,
//         clip: 'rect(0 0 0 0)',
//         height: 1,
//         margin: -1,
//         overflow: 'hidden',
//         padding: 0,
//         position: 'absolute',
//         top: 20,
//         width: 1,
//     },
// }));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
  ];

  const headRows = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];


class AssetsLogsTable extends PureComponent {
    

    constructor(props) {
        super(props)
        this.state = {
            order : 'asc',
            orderBy : 'calories',
            selected : [],
            page : 0,
            dense : false,
            rowsPerPage : 5
        }
        this.handleRequestSort = this.handleRequestSort.bind(this)
        this.handleSelectAllClick = this.handleSelectAllClick.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
        this.handleChangeDense = this.handleChangeDense.bind(this)

      }

      handleRequestSort(event, property) {
        const isDesc = this.state.orderBy === property && this.state.order === 'desc';
        
            if(isDesc) {
                this.setState({order: 'asc'})
            }else this.setState({order: 'desc'})

        this.setState({ orderBy: property });
    }

      handleSelectAllClick(event) {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.name);
            this.setState({ selected: newSelecteds });
        }
        this.setState({ selected: [] });
    }

      handleClick(event, name) {
        const selectedIndex = this.state.selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(this.state.selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(this.state.selected.slice(1));
        } else if (selectedIndex === this.state.selected.length - 1) {
            newSelected = newSelected.concat(this.state.selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                this.state.selected.slice(0, selectedIndex),
                this.state.selected.slice(selectedIndex + 1),
            );
        }
        this.setState({ selected: newSelected });
    }

     handleChangePage(event, newPage) {
        this.setState({ page: newPage });
    }

     handleChangeRowsPerPage(event) {
        this.setState({ rowsPerPage: this.state.rowsPerPage + event.target.value });
        this.setState({ page: 0 });
    }

     handleChangeDense(event) {
        this.setState({ dense: event.target.checked });
    }

    

    render() {

        const {
            classes,
        } = this.props

        // const [order, setOrder] = React.useState('asc');
        // const [orderBy, setOrderBy] = React.useState('calories');
        // const [selected, setSelected] = React.useState([]);
        // const [page, setPage] = React.useState(0);
        // const [dense, setDense] = React.useState(false);
        // const [rowsPerPage, setRowsPerPage] = React.useState(5);

        

        
        const isSelected = name => this.state.selected.indexOf(name) !== -1;

        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows.length - this.state.page * this.state.rowsPerPage)

        function desc(a, b, orderBy) {
            if (b[orderBy] < a[orderBy]) {
                return -1;
            }
            if (b[orderBy] > a[orderBy]) {
                return 1;
            }
            return 0;
        }

        function stableSort(array, cmp) {
            const stabilizedThis = array.map((el, index) => [el, index]);
            stabilizedThis.sort((a, b) => {
                const order = cmp(a[0], b[0]);
                if (order !== 0) return order;
                return a[1] - b[1];
            });
            return stabilizedThis.map(el => el[0]);
        }

        function getSorting(order, orderBy) {
            return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
        }

        function EnhancedTableHead(props) {
            const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
            const createSortHandler = property => event => {
                onRequestSort(event, property);
            };

            return (
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={numSelected === rowCount}
                                onChange={onSelectAllClick}
                                inputProps={{ 'aria-label': 'select all desserts' }}
                            />
                        </TableCell>
                        {headRows.map(row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === row.id}
                                    direction={order}
                                    onClick={createSortHandler(row.id)}
                                >
                                    {row.label}
                                    {orderBy === row.id ? (
                                        <span className={classes.visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </span>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
            );
        }

        EnhancedTableHead.propTypes = {
            classes: PropTypes.object.isRequired,
            numSelected: PropTypes.number.isRequired,
            onRequestSort: PropTypes.func.isRequired,
            onSelectAllClick: PropTypes.func.isRequired,
            order: PropTypes.oneOf(['asc', 'desc']).isRequired,
            orderBy: PropTypes.string.isRequired,
            rowCount: PropTypes.number.isRequired,
        };



        const EnhancedTableToolbar = props => {
            //const classes = useToolbarStyles();
            const { numSelected } = props;

            return (
                <Toolbar
                    className={clsx(classes.toolBarRoot, {
                        [classes.toolBarHighlight]: numSelected > 0,
                    })}
                >
                    <div className={classes.toolBarTitle}>
                        {numSelected > 0 ? (
                            <Typography color="inherit" variant="subtitle1">
                                {numSelected} selected
                    </Typography>
                        ) : (
                                <Typography variant="h6" id="tableTitle">
                                    Nutrition
                    </Typography>
                            )}
                    </div>
                    <div className={classes.toolBarSpacer} />
                    <div className={classes.toolBarActions}>
                        {numSelected > 0 ? (
                            <Tooltip title="Delete">
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        ) : (
                                <Tooltip title="Filter list">
                                    <IconButton aria-label="filter list">
                                        <FilterListIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                    </div>
                </Toolbar>
            );
        };

        EnhancedTableToolbar.propTypes = {
            numSelected: PropTypes.number.isRequired,
        };



        //const classes = useStyles();
        

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar numSelected={this.state.selected.length} />
                    <div className={classes.tableWrapper}>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={this.state.dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={this.state.selected.length}
                                order={this.state.order}
                                orderBy={this.state.orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {stableSort(rows, getSorting(this.state.order, this.state.orderBy))
                                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.name);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={event => this.handleClick(event, row.name)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.name}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.calories}</TableCell>
                                                <TableCell align="right">{row.fat}</TableCell>
                                                <TableCell align="right">{row.carbs}</TableCell>
                                                <TableCell align="right">{row.protein}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        backIconButtonProps={{
                            'aria-label': 'previous page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'next page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={this.state.dense} onChange={this.handleChangeDense} />}
                    label="Dense padding"
                />
            </div>
        );
    }
}



export default withStyles(styles)(AssetsLogsTable)
