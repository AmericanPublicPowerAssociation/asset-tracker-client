import React, { PureComponent } from 'react'
import { debounce } from 'lodash'
import TextField from '@material-ui/core/TextField'
import {
  DEBOUNCE_THRESHOLD_IN_MILLISECONDS,
} from '../constants'


class AssetName extends PureComponent {

  onChange = event => {
    const {
      setProps,
      onSuccess,
    } = this.props

    const value = event.target.value.trim()

    let errorText = ''
    if (!value.length) {
      errorText = 'cannot be empty'
    }
    setProps(value, errorText)
    
    // If onSuccess is defined and there was no error,
    if (onSuccess && !errorText) {
      /// Call onSuccess once after debounce threshold
      debounce(() => {
        onSuccess(event)
      }, DEBOUNCE_THRESHOLD_IN_MILLISECONDS)()
    }
  }

  render = () => {
    const {
      className,
      errorText,
      value,
    } = this.props
    const errorProps = errorText ? {
      error: true,
      helperText: errorText,
    } : {}
    return (
      <TextField
        fullWidth
        label='Asset Name'
        value={value}
        InputLabelProps={{ shrink: true }}
        onChange={this.onChange}
        className={className}
        {...errorProps}
      />
    )
  }
}


export default AssetName
