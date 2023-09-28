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

import { fetchSimpleDepartmentsDropdowns } from 'src/store/apps/general/company'
import { addNewDepartmentInBranchCompany } from 'src/store/apps/shared/thisCompany/branch'

import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'src/context/SnackbarContext'

// import LinearProgress from '@mui/material/LinearProgress'
// <LinearProgress />

// ** Icon Imports

const schema = yup.object().shape({
  branchId: yup.number().required(),
  departmentId: yup.number().required()
})

const DialogEditUserInfo = ({ open, handleClose, branchId }) => {
  const { triggerSnackbar } = useSnackbar()

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.companies)

  // const branchesDropdown = store.branchesDropdown
  const departmentsDropdown = store.simpleDepartmentsDropdown

  const defaultValues = {
    // companyId: companyId,
    branchId: branchId,
    departmentId: ''
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

    dispatch(addNewDepartmentInBranchCompany({ data, onSubmitSuccess, onSubmitError }))
  }

  useEffect(() => {
    if (open === true) {
      dispatch(fetchSimpleDepartmentsDropdowns())
    }
  }, [dispatch, open, branchId])

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
        Register New Department
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
              <InputLabel id='departmentId-select'>departmentId</InputLabel>
              <Controller
                name='departmentId'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    id='select-departmentId'
                    label='departmentId'
                    value={value}
                    defaultValue=''
                    labelId='departmentId-select'
                    error={Boolean(errors.departmentId)}
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
              {errors.departmentId && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.departmentId.message}</FormHelperText>
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
