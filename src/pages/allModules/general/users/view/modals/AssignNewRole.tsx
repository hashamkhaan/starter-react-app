// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
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

import { assignRolesToUser } from 'src/store/apps/users'
import {
  fetchBranchesDropdowns,
  fetchCompaniesDropdowns,
  fetchDepartmentsDropdowns,
  fetchRolesDropdowns
} from 'src/store/apps/users'

import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'src/context/SnackbarContext'

// import LinearProgress from '@mui/material/LinearProgress'
// <LinearProgress />

// ** Icon Imports

const schema = yup.object().shape({
  companyId: yup.number().required(),
  roles: yup.array().required('role is required').min(1, 'At least one role is required')
})

const DialogEditUserInfo = ({ open, handleClose, userId }) => {
  const { triggerSnackbar } = useSnackbar()

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.users)

  // const branchesDropdown = store.branchesDropdown
  const companiesDropdown = store.companiesDropdown
  const rolesDropdown = store.rolesDropdown
  const branchesDropdown = store.branchesDropdown
  const departmentsDropdown = store.departmentsDropdown

  const defaultValues = {
    companyId: '',
    branchId: '',
    departmentId: '',
    roles: []
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

    watch,

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
    dispatch(assignRolesToUser({ data, userId, onSubmitSuccess, onSubmitError }))
  }

  useEffect(() => {
    if (open === true) {
      dispatch(fetchCompaniesDropdowns())
      dispatch(fetchRolesDropdowns())
    }
  }, [dispatch, open])

  useEffect(() => {
    const selectedCompany = watch('companyId')
    if (selectedCompany > 0) {
      dispatch(fetchBranchesDropdowns(selectedCompany))
    }
  }, [dispatch, watch, watch('companyId')])
  useEffect(() => {
    const selectedBranch = watch('branchId')
    if (selectedBranch > 0) {
      dispatch(fetchDepartmentsDropdowns(selectedBranch))
    }
  }, [dispatch, watch, watch('branchId')])

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
        Assign New Role
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
              <InputLabel id='companyId-select'>Company</InputLabel>
              <Controller
                name='companyId'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    id='select-companyId'
                    label='Company'
                    value={value}
                    defaultValue=''
                    labelId='companyId-select'
                    error={Boolean(errors.companyId)}
                    onChange={onChange}
                  >
                    {/* <MenuItem value=''>
                    <em>None</em>
                  </MenuItem> */}
                    {companiesDropdown.map(branch => (
                      <MenuItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.companyId && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.companyId.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='branchId-select'>Branch</InputLabel>
              <Controller
                name='branchId'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    id='select-branchId'
                    label='Branch'
                    value={value}
                    defaultValue=''
                    labelId='branchId-select'
                    error={Boolean(errors.branchId)}
                    onChange={onChange}
                  >
                    {/* <MenuItem value=''>
                    <em>None</em>
                  </MenuItem> */}
                    {branchesDropdown.map(branch => (
                      <MenuItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.branchId && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.branchId.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='departmentId-select'>Department</InputLabel>
              <Controller
                name='departmentId'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    id='select-departmentId'
                    label='Branch'
                    value={value}
                    defaultValue=''
                    labelId='departmentId-select'
                    error={Boolean(errors.departmentId)}
                    onChange={onChange}
                  >
                    {/* <MenuItem value=''>
                    <em>None</em>
                  </MenuItem> */}
                    {departmentsDropdown.map(branch => (
                      <MenuItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.departmentId && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.departmentId.message}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='roles-select'>Roles</InputLabel>
              <Controller
                name='roles'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    id='select-roles'
                    label='roles'
                    multiple
                    value={value}
                    defaultValue=''
                    labelId='roles-select'
                    error={Boolean(errors.roles)}
                    onChange={onChange}
                  >
                    {rolesDropdown.map(department => (
                      <MenuItem key={department.id} value={department.id}>
                        {department.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.roles && <FormHelperText sx={{ color: 'error.main' }}>{errors.roles.message}</FormHelperText>}
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
