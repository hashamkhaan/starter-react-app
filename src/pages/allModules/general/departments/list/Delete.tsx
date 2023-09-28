// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

import { deleteById } from 'src/store/apps/general/department'
import { useDispatch } from 'react-redux'

import { useSnackbar } from 'src/context/SnackbarContext'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const DeletionDialog = ({ itemId, open, setOpen }) => {
  const { triggerSnackbar } = useSnackbar()

  const dispatch = useDispatch<AppDispatch>()
  const [submitLoading, setSubmitLoading] = useState(false)

  // ** Props
  // ** State

  const onSubmitSuccess = async message => {
    setSubmitLoading(false)
    triggerSnackbar('success', message)
    handleClose()
  }
  const onSubmitError = async message => {
    triggerSnackbar('error', message)
    setSubmitLoading(false)
  }
  const handleSubmit = () => {
    setSubmitLoading(true)
    dispatch(deleteById({ id: itemId, onSubmitSuccess, onSubmitError }))
  }
  const handleClose = () => {
    setOpen(false)
    setSubmitLoading(false)
  }

  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      onClose={handleClose}
    >
      <DialogTitle id='alert-dialog-title'>Deletion Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are You sure you want to delete Department id: {itemId}? This cannot be undone!
        </DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={handleClose}>Cancel</Button>

        <LoadingButton
          size='large'
          color='error'
          onClick={handleSubmit}
          sx={{ mr: 2 }}
          loading={submitLoading}
          loadingPosition='start'
          startIcon={<Icon icon='mdi:delete' />}
          variant='contained'
        >
          <span> Yes, Delete!</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default DeletionDialog
