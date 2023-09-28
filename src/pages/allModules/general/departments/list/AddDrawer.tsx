// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import LoadingButton from '@mui/lab/LoadingButton'

import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useSnackbar } from 'src/context/SnackbarContext'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { addNew } from 'src/store/apps/general/department'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// import { UsersType } from 'src/types/apps/userTypes'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

interface UserData {
  description: string
  password: string
  company: number
  name: string
  branch: number
  department: number
  roles: array
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, obj => showErrors('name', obj.value.length, obj.min))
    .required(),
  description: yup
    .string()
    .min(3, obj => showErrors('description', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  description: '',
  name: ''
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  const { triggerSnackbar } = useSnackbar()

  // ** Props
  const { open, toggle } = props
  const [submitLoading, setSubmitLoading] = useState(false)

  // ** State

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.departments)

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const onSubmitSuccess = async message => {
    setSubmitLoading(false)
    triggerSnackbar('success', message)
    toggle()
    reset()
  }
  const onSubmitError = async message => {
    triggerSnackbar('error', message)
    setSubmitLoading(false)
  }
  const onSubmit = async (data: UserData) => {
    setSubmitLoading(true)
    await dispatch(addNew({ data, onSubmitSuccess, onSubmitError }))
  }

  const handleClose = () => {
    toggle()

    // reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add Department</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
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
                  placeholder='johndoe'
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
                  type='description'
                  value={value}
                  label='Description'
                  onChange={onChange}
                  placeholder='description'
                  error={Boolean(errors.description)}
                />
              )}
            />
            {errors.description && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.description.message}</FormHelperText>
            )}
          </FormControl>

          {store.error && <FormHelperText sx={{ color: 'error.main' }}>{store.error}</FormHelperText>}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LoadingButton
              size='large'
              type='submit'
              sx={{ mr: 3 }}
              loading={submitLoading}
              loadingPosition='start'
              startIcon={<Icon icon='ic:baseline-save' />}
              variant='contained'
            >
              <span>Save</span>
            </LoadingButton>

            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
