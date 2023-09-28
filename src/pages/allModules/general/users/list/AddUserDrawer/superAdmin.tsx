// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Chip from '@mui/material/Chip'
import LoadingButton from '@mui/lab/LoadingButton'

import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'

import { useSnackbar } from 'src/context/SnackbarContext'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import {
  fetchCompaniesDropdowns,
  fetchBranchesDropdowns,
  fetchDepartmentsDropdowns,
  fetchRolesDropdowns
} from 'src/store/apps/users'

// import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { addUser } from 'src/store/apps/users'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

// import { UsersType } from 'src/types/apps/userTypes'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

interface UserData {
  email: string
  password: string
  company: number
  username: string
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
  // company: yup.string().required(),
  // country: yup.string().required(),
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
    .required(),
  company: yup.string().required('Company is required'),

  // branch: yup.string().required('Branch is required'),
  // department: yup.string().required('Department is required'),
  roles: yup.array().required('Roles is required').min(1, 'At least one role is required')
})

const defaultValues = {
  email: '',
  password: '',
  lastName: '',
  firstName: '',
  contact: '',
  company: '',
  branch: '',
  username: '',
  department: '',
  roles: [],
  contact: ''
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { triggerSnackbar } = useSnackbar()

  const { open, toggle } = props

  // ** State

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.users)
  const companiesDropdown = store.companiesDropdown
  const branchesDropdown = store.branchesDropdown
  const departmentsDropdown = store.departmentsDropdown

  const rolesDropdown = store.rolesDropdown
  const [submitLoading, setSubmitLoading] = useState(false)

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const onSubmit = (data: UserData) => {
    setSubmitLoading(true)

    dispatch(addUser({ data, onSubmitSuccess, onSubmitError }))

    // dispatch(addUser({ ...data }))

    // toggle()
    // reset()
  }

  const handleClose = () => {
    toggle()

    // reset()
  }

  useEffect(() => {
    dispatch(fetchCompaniesDropdowns())
    dispatch(fetchRolesDropdowns())
  }, [])
  useEffect(() => {
    const selectedCompany = watch('company')
    if (selectedCompany > 0) {
      dispatch(fetchBranchesDropdowns(selectedCompany))
    }
  }, [dispatch, watch, watch('company')])
  useEffect(() => {
    const selectedBranch = watch('branch')
    if (selectedBranch > 0) {
      dispatch(fetchDepartmentsDropdowns(selectedBranch))
    }
  }, [dispatch, watch, watch('branch')])

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
        <Typography variant='h6'>Add User</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
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
            {errors.username && <FormHelperText sx={{ color: 'error.main' }}>{errors.username.message}</FormHelperText>}
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
            {errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>}
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
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='password'
                  value={value}
                  label='Password'
                  onChange={onChange}
                  placeholder='johndoe@email.com'
                  error={Boolean(errors.password)}

                  // endAdornment={
                  //   <InputAdornment position='end'>
                  //     <IconButton
                  //       edge='end'
                  //       onClick={handleClickShowPassword}
                  //       onMouseDown={e => e.preventDefault()}
                  //       aria-label='toggle password visibility'
                  //     >
                  //       <Icon icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                  //     </IconButton>
                  //   </InputAdornment>
                  // }
                />
              )}
            />
            {errors.password && <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='company-select'>Select Company</InputLabel>
            <Controller
              name='company'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  id='select-company'
                  label='Company'
                  value={value}
                  defaultValue=''
                  labelId='company-select'
                  error={Boolean(errors.company)}
                  onChange={onChange}
                >
                  {/* <MenuItem value=''>
                    <em>None</em>
                  </MenuItem> */}
                  {companiesDropdown.map(company => (
                    <MenuItem key={company.id} value={company.id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.company && <FormHelperText sx={{ color: 'error.main' }}>{errors.company.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='branch-select'>Branch</InputLabel>
            <Controller
              name='branch'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  id='select-branch'
                  label='Branch'
                  value={value}
                  defaultValue=''
                  labelId='branch-select'
                  error={Boolean(errors.branch)}
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
            {errors.branch && <FormHelperText sx={{ color: 'error.main' }}>{errors.branch.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='department-select'>Department</InputLabel>
            <Controller
              name='department'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  id='select-department'
                  label='Department'
                  value={value}
                  defaultValue=''
                  labelId='department-select'
                  error={Boolean(errors.department)}
                  onChange={onChange}
                >
                  {departmentsDropdown.map(department => (
                    <MenuItem key={department.id} value={department.id}>
                      {department.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.department && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.department.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='branch-select'>Role</InputLabel>
            <Controller
              name='roles'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  id='select-branch'
                  multiple
                  label='Role'
                  value={value}
                  defaultValue=''
                  labelId='roles-select'
                  error={Boolean(errors.roles)}
                  onChange={onChange}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {(selected as unknown as number[]).map(value => {
                        const selectedRole = rolesDropdown.find(role => role.id === value)

                        return <Chip key={value} label={selectedRole ? selectedRole.name : ''} sx={{ m: 0.75 }} />
                      })}
                    </Box>
                  )}
                >
                  {rolesDropdown.map(roles => (
                    <MenuItem key={roles.id} value={roles.id}>
                      {roles.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.roles && <FormHelperText sx={{ color: 'error.main' }}>{errors.roles.message}</FormHelperText>}
          </FormControl>

          {store.error && <FormHelperText sx={{ color: 'error.main' }}>{store.error}</FormHelperText>}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button> */}
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
