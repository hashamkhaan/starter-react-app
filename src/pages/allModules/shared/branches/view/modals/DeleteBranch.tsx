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

import { deleteBranchInCompany } from 'src/store/apps/shared/thisCompany/branch'
import { useDispatch } from 'react-redux'

import { useSnackbar } from 'src/context/SnackbarContext'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { useRouter } from 'next/router'

const DeletionDialog = ({ itemId, open, setOpen }) => {
  const { triggerSnackbar } = useSnackbar()
  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()
  const [submitLoading, setSubmitLoading] = useState(false)

  // ** Props Test
  // ** State

  const onSubmitSuccess = async message => {
    setSubmitLoading(false)
    triggerSnackbar('success', message)
    router.push('/allModules/shared/branches/list/')

    handleClose()
  }
  const onSubmitError = async message => {
    triggerSnackbar('error', message)
    setSubmitLoading(false)
  }
  const handleSubmit = () => {
    setSubmitLoading(true)
    dispatch(deleteBranchInCompany({ id: itemId, onSubmitSuccess, onSubmitError }))
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
      <DialogTitle id='alert-dialog-title'>Branch Deletion Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are You sure you want to delete Branch id: {itemId}? This cannot be undone!
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
