import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import AssetFilter from '../containers/AssetFilter'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
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
import AssetsLogsTable from '../components/AssetsLogsTable'


const styles = theme => ({
  fullHeight: {
    height: '100%',
  },
  frame: {
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
    overflow: 'auto',
  },
})


class AssetsLogsWindow extends PureComponent {

  componentDidMount() {
    const {
      refreshAssetsLogs,
    } = this.props
    refreshAssetsLogs()
  }

  render() {
    const {
      classes,
      assetsLogs,
    } = this.props

      return (
        <Paper className={classes.fullHeight}>
          <Grid container className={classes.fullHeight}>
            <Grid item className={classes.frame} >
              {assetsLogs}
            </Grid>
            <Grid item className={classes.frame}>
            <AssetsLogsTable/>
            </Grid>
          </Grid>
        </Paper>
      )
    }
  }



  export default withStyles(styles)(AssetsLogsWindow)
