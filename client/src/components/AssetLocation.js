import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Chip from '@material-ui/core/Chip'
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit * 3}px 0 0 0`,
  },
  chip: {
    margin: `${theme.spacing.unit}px 8px 0 0`,
  },
})

class AssetLocation extends PureComponent {
  render() {
    const {
      classes,
    } = this.props
    return (
      <FormControl fullWidth className={classes.root}>
        <FormLabel>Location</FormLabel>
        <div>
          <Chip
            label={<AddIcon />}
            color='primary'
            className={classes.chip}
            onClick={() => {alert('hey')}}
          />
        </div>
      </FormControl>
    )
  }
}

export default withStyles(styles)(AssetLocation)
