// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import LoadingButton from '@mui/lab/LoadingButton'
import { useSnackbar } from 'src/context/SnackbarContext'
import { useDispatch } from 'react-redux'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { toggleUserStatusById } from 'src/store/apps/users'

type Props = {
  open: boolean
  data: object
  setOpen: (val: boolean) => void
}

const SuspendDialog = (props: Props) => {
  // ** Props
  const { open, setOpen } = props
  const { data } = props
  const { triggerSnackbar } = useSnackbar()
  const dispatch = useDispatch<AppDispatch>()

  // ** States
  const [userInput, setUserInput] = useState<string>('yes')
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)

  const handleClose = () => setOpen(false)

  const handleSecondDialogClose = () => setSecondDialogOpen(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  const handleConfirmation = (value: string) => {
    handleClose()
    setUserInput(value)
    setSecondDialogOpen(true)
  }
  const onSubmitSuccess = async message => {
    setSubmitLoading(false)
    handleClose()
    setSecondDialogOpen(true)

    // setOpenEdit(false)
    triggerSnackbar('success', message)
  }
  const onSubmitError = async message => {
    triggerSnackbar('error', message)
    setSubmitLoading(false)
  }
  const onSubmit = () => {
    setSubmitLoading(true)
    dispatch(toggleUserStatusById({ data: { id: data.id, isActive: data.isActive }, onSubmitSuccess, onSubmitError }))
  }

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              '& svg': { mb: 8, color: 'warning.main' }
            }}
          >
            <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
            <Typography variant='h4' sx={{ mb: 5, color: 'text.secondary' }}>
              Are you sure?
            </Typography>
            {data.isActive === 1 ? (
              <>
                <Typography sx={{ color: 'error.main' }}>Suspend User {data.username} </Typography>
                <Typography>User won't be able to login!</Typography>
              </>
            ) : (
              <Typography sx={{ color: 'error.main' }}>Activate User {data.username} </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          {/* <Button variant='contained' sx={{ mr: 2 }} onClick={() => handleConfirmation('yes')}>
            Yes, Suspend user!
          </Button> */}
          <LoadingButton
            size='large'
            sx={{ mr: 2 }}
            onClick={() => onSubmit()}
            loading={submitLoading}
            loadingPosition='start'
            startIcon={<Icon icon='mdi:update' />}
            variant='contained'
            color={data.isActive === 1 ? 'error' : 'success'}
          >
            {data.isActive === 1 ? <span> Yes, Suspend user!</span> : <span> Yes, Activate user!</span>}
          </LoadingButton>
          <Button variant='outlined' color='secondary' onClick={() => handleConfirmation('cancel')}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        open={secondDialogOpen}
        onClose={handleSecondDialogClose}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}
      >
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& svg': {
                mb: 14,
                color: userInput === 'yes' ? 'success.main' : 'error.main'
              }
            }}
          >
            <Icon
              fontSize='5.5rem'
              icon={userInput === 'yes' ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'}
            />
            <Typography variant='h4' sx={{ mb: 8 }}>
              {userInput === 'yes' ? 'Suspended!' : 'Cancelled'}
            </Typography>
            <Typography>{userInput === 'yes' ? 'User has been suspended.' : 'Cancelled Suspension :)'}</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' color='success' onClick={handleSecondDialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SuspendDialog
