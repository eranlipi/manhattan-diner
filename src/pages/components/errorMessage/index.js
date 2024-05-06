import { Typography } from '@mui/material'
import React from 'react'

const ErrorMessage = (props) => {
  return (
    <Typography color={"red"} fontSize={"12px"} sx={{textAlign:"justify"}}>
    {props?.message}
  </Typography>  )
}

export default ErrorMessage