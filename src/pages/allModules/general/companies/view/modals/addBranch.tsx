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

import {
  addNewBranchWithDepartmentsInCompany,
  fetchSimpleDepartmentsDropdowns,
  fetchNewBranchesForCompanyDropdown
} from 'src/store/apps/general/company'

import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'src/context/SnackbarContext'

// import LinearProgress from '@mui/material/LinearProgress'
// <LinearProgress />

// ** Icon Imports

const schema = yup.object().shape({
  branchId: yup.number().required(),
  departments: yup.array().required('department is required').min(1, 'At least one department is required')
})

const DialogEditUserInfo = ({ open, handleClose, companyId }) => {
  const { triggerSnackbar } = useSnackbar()

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.companies)

  // const branchesDropdown = store.branchesDropdown
  const branchesDropdown = store.branchesForCompanyDropdown
  const departmentsDropdown = store.simpleDepartmentsDropdown

  const defaultValues = {
    companyId: companyId,
    branchId: '',
    departments: []
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
    dispatch(addNewBranchWithDepartmentsInCompany({ data, onSubmitSuccess, onSubmitError }))
  }

  useEffect(() => {
    if (open === true) {
      dispatch(fetchNewBranchesForCompanyDropdown(companyId))
    }
  }, [companyId, dispatch, open])
  useEffect(() => {
    if (open === true) {
      dispatch(fetchSimpleDepartmentsDropdowns())
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
        Register New Branch
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
              <InputLabel id='branchId-select'>Select Branch</InputLabel>
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
              <InputLabel id='departments-select'>departments</InputLabel>
              <Controller
                name='departments'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    id='select-departments'
                    label='departments'
                    multiple
                    value={value}
                    defaultValue=''
                    labelId='departments-select'
                    error={Boolean(errors.departments)}
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
              {errors.departments && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.departments.message}</FormHelperText>
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
