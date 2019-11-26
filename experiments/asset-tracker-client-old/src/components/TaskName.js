import React from 'react'
import TextField from '@material-ui/core/TextField'


export default function TaskName(props) {
  const {
    name,
    errorText,
    className,
    inputProps,
    onChange,
    onBlur,
  } = props
  const errorProps = errorText ? {
    error: true,
    helperText: errorText,
  } : {}
  return (
    <TextField
      label='Task Name'
      value={name}
      fullWidth
      required
      className={className}
      inputProps={inputProps}
      {...errorProps}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}
