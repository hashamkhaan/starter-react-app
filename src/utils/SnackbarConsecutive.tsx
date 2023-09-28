// ** React Imports
import { Fragment, SyntheticEvent, useEffect } from 'react'

// ** MUI Imports
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useSnackbar } from '../context/SnackbarContext' // Adjust the import path

// ** Hook Import
// import { useSettings } from 'src/@core/hooks/useSettings'

const SnackbarAlert = () => {
  // ** State
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { snackPack, setSnackPack, setMessageInfo, setOpen, messageInfo, handleExited, open, closeSnackbar } =
    useSnackbar() // Use the useSnackbar hook to access the context

  // ** Hook & Var
  // const { settings } = useSettings()

  // const { skin } = settings

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClose = (event: Event | SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setOpen(true)
      setSnackPack(prev => prev.slice(1))
      setMessageInfo({ ...snackPack[0] })
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false)
    }
  }, [snackPack, messageInfo, open, setOpen, setSnackPack, setMessageInfo])

  return (
    <Fragment>
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
        TransitionProps={{ onExited: handleExited }}
        key={messageInfo ? messageInfo.key : undefined}
        message={messageInfo ? messageInfo.message : undefined}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          elevation={3}
          variant='filled'
          onClose={handleClose}
          sx={{ width: '100%' }}
          severity={messageInfo?.status === 'success' ? 'success' : 'error'}

          // elevation={skin === 'bordered' ? 0 : 3}
        >
          {messageInfo?.message}
        </Alert>
      </Snackbar>
    </Fragment>
  )
}

export default SnackbarAlert
