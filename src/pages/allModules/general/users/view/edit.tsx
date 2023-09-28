// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import FormHelperText from '@mui/material/FormHelperText'
import LoadingButton from '@mui/lab/LoadingButton'
import InputAdornment from '@mui/material/InputAdornment'

import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import Icon from 'src/@core/components/icon'

import { updateWithImageById } from 'src/store/apps/users'

import { useDispatch } from 'react-redux'
import { useSnackbar } from 'src/context/SnackbarContext'

// import LinearProgress from '@mui/material/LinearProgress'
// <LinearProgress />

// ** Icon Imports

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const schema = yup.object().shape({
  email: yup.string().email().required(),

  username: yup
    .string()
    .min(3, obj => showErrors('Username', obj.value.length, obj.min))
    .required(),
  firstName: yup
    .string()
    .min(3, obj => showErrors('firstName', obj.value.length, obj.min))
    .required(),
  lastName: yup
    .string()
    .min(1, obj => showErrors('lastName', obj.value.length, obj.min))
    .required(),
  contact: yup
    .string()
    .min(10, obj => showErrors('Contact', obj.value.length, obj.min))
    .required()
})

const DialogEditUserInfo = ({ openEdit, setOpenEdit, dataEdit }) => {
  const { triggerSnackbar } = useSnackbar()

  const dispatch = useDispatch<AppDispatch>()

  const defaultValues = {
    id: dataEdit.id,
    email: dataEdit.email,
    lastName: dataEdit.lastName,
    firstName: dataEdit.firstName,
    contact: dataEdit.contact,
    username: dataEdit.username
  }

  const handleEditClose = () => {
    setOpenEdit(false)
    reset()
  }
  const handleReset = () => {
    reset()
  }

  const {
    reset,
    control,

    // watch,

    // setValue,
    // setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const [submitLoading, setSubmitLoading] = useState(false)

  const onSubmitSuccess = async message => {
    setSubmitLoading(false)
    setOpenEdit(false)
    triggerSnackbar('success', message)
    reset()
  }
  const onSubmitError = async message => {
    triggerSnackbar('error', message)
    setSubmitLoading(false)
  }

  const onSubmit = data => {
    const formData = new FormData()
    const dataStringify = JSON.stringify(data)
    formData.append('data', dataStringify)

    // formData.append('imgFile', null)
    dispatch(updateWithImageById({ data, formData, onSubmitSuccess, onSubmitError }))
  }

  return (
    <Dialog
      open={openEdit}
      onClose={handleEditClose}
      aria-labelledby='user-view-edit'
      aria-describedby='user-view-edit-description'
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
    >
      <DialogTitle
        id='user-view-edit'
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        Edit User Information
      </DialogTitle>
      <>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
            Updating user details will receive a privacy audit.
          </DialogContentText>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='username'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='Username'
                    onChange={onChange}
                    placeholder='johndoe'
                    error={Boolean(errors.username)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Icon icon='mdi:account-outline' />
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
              {errors.username && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='firstName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='firstName'
                    onChange={onChange}
                    placeholder='johndoe'
                    error={Boolean(errors.firstName)}
                  />
                )}
              />
              {errors.firstName && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='lastName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='lastName'
                    onChange={onChange}
                    placeholder='johndoe'
                    error={Boolean(errors.lastName)}
                  />
                )}
              />
              {errors.lastName && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='contact'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label='contact'
                    onChange={onChange}
                    placeholder='123-456-7890'
                    error={Boolean(errors.contact)}
                    type='number'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Icon icon='mdi:phone' />
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
              {errors.contact && <FormHelperText sx={{ color: 'error.main' }}>{errors.contact.message}</FormHelperText>}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    type='email'
                    value={value}
                    label='Email'
                    onChange={onChange}
                    placeholder='johndoe@email.com'
                    error={Boolean(errors.email)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Icon icon='mdi:email-outline' />
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
              {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <LoadingButton
            size='large'
            onClick={() => handleSubmit(onSubmit)()}
            sx={{ mr: 2 }}
            loading={submitLoading}
            loadingPosition='start'
            startIcon={<Icon icon='mdi:update' />}
            variant='contained'
          >
            <span>Update</span>
          </LoadingButton>
          <Button variant='outlined' color='primary' onClick={handleReset}>
            Reset
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleEditClose}>
            Cancel
          </Button>
        </DialogActions>
      </>
    </Dialog>
  )
}

export default DialogEditUserInfo
