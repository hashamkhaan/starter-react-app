// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import FormHelperText from '@mui/material/FormHelperText'
import LoadingButton from '@mui/lab/LoadingButton'

import { useSnackbar } from 'src/context/SnackbarContext'

import DialogActions from '@mui/material/DialogActions'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import { updateById } from 'src/store/apps/general/branch'

import { useDispatch } from 'react-redux'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

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
  name: yup
    .string()
    .min(3, obj => showErrors('Name', obj.value.length, obj.min))
    .required(),
  description: yup
    .string()
    .min(3, obj => showErrors('Description', obj.value.length, obj.min))
    .required()
})

const DialogEditUserInfo = ({ setOpenEdit, dataEdit }) => {
  const { triggerSnackbar } = useSnackbar()
  const dispatch = useDispatch<AppDispatch>()

  const defaultValues = {
    id: dataEdit.id,
    name: dataEdit.name,
    description: dataEdit.description
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
  const onSubmit = (data: UserData) => {
    setSubmitLoading(true)
    dispatch(updateById({ data, onSubmitSuccess, onSubmitError }))
  }

  return (
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
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Name'
                  onChange={onChange}
                  placeholder='Company ABC'
                  error={Boolean(errors.name)}
                />
              )}
            />
            {errors.name && <FormHelperText sx={{ color: 'error.main' }}>{errors.name.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='description'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Description'
                  onChange={onChange}
                  placeholder='Travel ABC'
                  error={Boolean(errors.description)}
                />
              )}
            />
            {errors.description && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>
            )}
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
        <Button variant='outlined' color='primary' onClick={handleReset} startIcon={<Icon icon='radix-icons:reset' />}>
          Reset
        </Button>
        <Button variant='outlined' color='secondary' onClick={handleEditClose}>
          Cancel
        </Button>
      </DialogActions>
    </>
  )
}

export default DialogEditUserInfo
