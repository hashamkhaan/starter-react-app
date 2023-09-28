// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import FormHelperText from '@mui/material/FormHelperText'
import LoadingButton from '@mui/lab/LoadingButton'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'

import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import MenuItem from '@mui/material/MenuItem'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import Icon from 'src/@core/components/icon'

import { addNew, fetchBranchesDropdowns, fetchCompanyTypesDropdowns } from 'src/store/apps/general/company'

import { useDispatch, useSelector } from 'react-redux'
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
  name: yup
    .string()
    .min(3, obj => showErrors('Name', obj.value.length, obj.min))
    .required(),
  description: yup
    .string()
    .min(3, obj => showErrors('Description', obj.value.length, obj.min))
    .required(),
  companyTypeId: yup.number().required(),
  branches: yup.array().required('Roles is required').min(1, 'At least one role is required')
})

const DialogEditUserInfo = ({ open, handleClose }) => {
  const { triggerSnackbar } = useSnackbar()

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.companies)
  const companyTypesDropdown = store.companyTypesDropdown
  const branchesDropdown = store.branchesDropdown

  const defaultValues = {
    name: '',
    description: '',
    companyTypeId: '',
    branches: []
  }

  const handleEditClose = () => {
    handleClose()
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
    handleClose()
    triggerSnackbar('success', message)
    reset()
  }
  const onSubmitError = async message => {
    triggerSnackbar('error', message)
    setSubmitLoading(false)
  }
  const onSubmit = (data: UserData) => {
    setSubmitLoading(true)
    dispatch(addNew({ data, onSubmitSuccess, onSubmitError }))
  }

  useEffect(() => {
    if (open === true) {
      dispatch(fetchBranchesDropdowns())
      dispatch(fetchCompanyTypesDropdowns())
    }
  }, [dispatch, open])

  return (
    <Dialog
      open={open}
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
        New Company Information
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
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='companyTypeId-select'>Select Company</InputLabel>
              <Controller
                name='companyTypeId'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    id='select-companyTypeId'
                    label='Company'
                    value={value}
                    defaultValue=''
                    labelId='companyTypeId-select'
                    error={Boolean(errors.companyTypeId)}
                    onChange={onChange}
                  >
                    {/* <MenuItem value=''>
                    <em>None</em>
                  </MenuItem> */}
                    {companyTypesDropdown.map(companyTypeId => (
                      <MenuItem key={companyTypeId.id} value={companyTypeId.id}>
                        {companyTypeId.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.companyTypeId && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.companyTypeId.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='branch-select'>Branches</InputLabel>
              <Controller
                name='branches'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    id='select-branch'
                    label='Branches'
                    multiple
                    value={value}
                    defaultValue=''
                    labelId='branch-select'
                    error={Boolean(errors.branches)}
                    onChange={onChange}
                  >
                    {branchesDropdown.map(branch => (
                      <MenuItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.branches && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.branches.message}</FormHelperText>
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
            startIcon={<Icon icon='mdi:add' />}
            variant='contained'
          >
            <span>Submit</span>
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
