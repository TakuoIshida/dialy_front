import { ISnackbarProps } from '@/types/type'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import React from 'react'

const SnackBar = (props: ISnackbarProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={props.open}>
      <MuiAlert severity="success" elevation={6} variant="filled">
        {props.message}
      </MuiAlert>
    </Snackbar>
  )
}

export default SnackBar
