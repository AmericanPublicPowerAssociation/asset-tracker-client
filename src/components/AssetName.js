import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField'


class AssetName extends PureComponent {

  render = () => {
    const {
      name,
      errorText,
      className,
      onChange,
      onBlur,
    } = this.props
    const errorProps = errorText ? {
      error: true,
      helperText: errorText,
    } : {}
    return (
      <TextField
        label='Asset Name'
        value={name}
        fullWidth
        required
        className={className}
        InputLabelProps={{
          shrink: true,
        }}
        {...errorProps}
        onChange={onChange}
        onBlur={onBlur}
      />
    )
  }

}


export default AssetName
