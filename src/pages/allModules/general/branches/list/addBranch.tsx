// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'

// import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// import InputAdornment from '@mui/material/InputAdornment'
import LoadingButton from '@mui/lab/LoadingButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'

import { useDispatch, useSelector } from 'react-redux'
import { fetchCitiesDropdown } from 'src/store/apps/shared/dropdown'
import { addNew } from 'src/store/apps/general/branch'

import { useSnackbar } from 'src/context/SnackbarContext'

const steps = [
  {
    title: 'Branch Info',
    subtitle: 'Branch Information'
  },
  {
    title: 'Optional Info',
    subtitle: 'Optional Information'
  }
]

const defaultPersonalValues = {
  cityId: '',

  code: '',
  name: '',
  description: ''
}
const defaultSocialValues = {
  friendlyName: '',
  address: '',
  phone: '',
  email: ''
}

const personalSchema = yup.object().shape({
  cityId: yup.number().required(),

  code: yup.string().min(3).required(),

  name: yup.string().min(3).required(),
  description: yup.string().min(3).required()
})
const socialSchema = yup.object().shape({
  // friendlyName: yup.string().required(),
  // address: yup.string().required(),
  // phone: yup.string().required(),
  // email: yup.string().required()
  email: yup.string().email()
})

const StepperLinearWithValidation = ({ open, handleClose }) => {
  const { triggerSnackbar } = useSnackbar()

  // ** States
  const [activeStep, setActiveStep] = useState<number>(0)

  // ** Hooks

  const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    getValues: getPersonalValues,

    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  })
  const {
    reset: socialReset,
    control: socialControl,
    handleSubmit: handleSocialSubmit,
    getValues: getSocialValues,
    formState: { errors: socialErrors }
  } = useForm({
    defaultValues: defaultSocialValues,
    resolver: yupResolver(socialSchema)
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  const handleReset = () => {
    setActiveStep(0)
    socialReset({ friendlyName: '', address: '', phone: '', email: '' })
    personalReset({ cityId: '', description: '', name: '', code: '' })
  }
  const onSubmit = data => {
    if (activeStep === steps.length - 1) {
      setSubmitLoading(true)
      data = { ...getPersonalValues(), ...getSocialValues() }

      dispatch(
        addNew({
          data,
          onSubmitSuccess,
          onSubmitError
        })
      )
    } else {
      setActiveStep(activeStep + 1)
    }
  }

  const onSubmitSuccess = async message => {
    setActiveStep(activeStep + 1)

    setSubmitLoading(false)
    handleClose()
    triggerSnackbar('success', message)
    handleReset()
  }
  const onSubmitError = async message => {
    triggerSnackbar('error', message)
    setSubmitLoading(false)
  }

  // Handle Password

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                {/* <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[0].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[0].subtitle}
                </Typography> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='code'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Branch Code'
                        onChange={onChange}
                        error={Boolean(personalErrors['code'])}
                        aria-describedby='stepper-linear-personal-code'
                      />
                    )}
                  />
                  {personalErrors['code'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-code'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='name'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Branch Name'
                        placeholder='Optional'
                        onChange={onChange}
                        error={Boolean(personalErrors['name'])}
                        aria-describedby='stepper-linear-personal-name'
                      />
                    )}
                  />
                  {personalErrors['name'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-name'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='description'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Description'
                        placeholder='Optional'
                        onChange={onChange}
                        error={Boolean(personalErrors['description'])}
                        aria-describedby='stepper-linear-personal-description'
                      />
                    )}
                  />
                  {personalErrors['description'] && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-description'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='stepper-linear-personal-cityId'
                    error={Boolean(personalErrors.cityId)}
                    htmlFor='stepper-linear-personal-cityId'
                  >
                    Branch
                  </InputLabel>
                  <Controller
                    name='cityId'
                    control={personalControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Branch'
                        onChange={onChange}
                        error={Boolean(personalErrors.cityId)}
                        labelId='stepper-linear-personal-cityId'
                        aria-describedby='stepper-linear-personal-cityId-helper'
                      >
                        {citiesDropdown.map(branch => (
                          <MenuItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {personalErrors.cityId && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-cityId-helper'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </form>
        )
      case 1:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                {/* <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[1].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[1].subtitle}
                </Typography> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='address'
                    control={socialControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Address'
                        onChange={onChange}
                        error={Boolean(socialErrors.address)}
                        placeholder='Address'
                        aria-describedby='stepper-linear-social-address'
                      />
                    )}
                  />
                  {socialErrors.address && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-address'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='phone'
                    control={socialControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Contact'
                        onChange={onChange}
                        error={Boolean(socialErrors.phone)}
                        placeholder='03402763736'
                        aria-describedby='stepper-linear-social-phone'
                      />
                    )}
                  />
                  {socialErrors.phone && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-phone'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='friendlyName'
                    control={socialControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Friendly Name'
                        onChange={onChange}
                        error={Boolean(socialErrors.friendlyName)}
                        aria-describedby='stepper-linear-social-friendlyName'
                        placeholder='friendlyName'
                      />
                    )}
                  />
                  {socialErrors.friendlyName && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-friendlyName'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='email'
                    control={socialControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Email'
                        onChange={onChange}
                        error={Boolean(socialErrors.email)}
                        placeholder='abc@gmail.com'
                        aria-describedby='stepper-linear-social-email'
                      />
                    )}
                  />
                  {socialErrors.email && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-social-email'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </form>
        )
      default:
        return null
    }
  }

  const renderDialogActionCancel = () => {
    if (activeStep === 0) {
      return (
        <Button size='large' variant='outlined' color='secondary' disabled>
          Back
        </Button>
      )
    } else if (activeStep === 1) {
      return (
        <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
          Back
        </Button>
      )
    }
  }
  const renderDialogActionNext = () => {
    if (activeStep === 0) {
      return (
        <Button size='large' onClick={() => handlePersonalSubmit(onSubmit)()} variant='contained'>
          Next
        </Button>
      )
    } else if (activeStep === 1) {
      return (
        <LoadingButton
          size='large'
          sx={{ mr: 2 }}
          loading={submitLoading}
          loadingPosition='start'
          startIcon={<Icon icon='mdi:add' />}
          variant='contained'
          onClick={() => handleSocialSubmit(onSubmit)()}

          // type='submit'
        >
          <span>Submit</span>
        </LoadingButton>
      )
    }
  }

  //  <Button size='large' onClick={() => handleSocialSubmit(onSubmit)()} variant='contained'>
  //         Next
  //       </Button>
  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return getStepContent(activeStep)
    }
  }
  const [submitLoading, setSubmitLoading] = useState(false)

  const handleEditClose = () => {
    handleClose()
    handleReset()
  }
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (open === true) {
      dispatch(fetchCitiesDropdown())
    }
  }, [dispatch, open])
  const store = useSelector((state: RootState) => state.dropdowns)
  const citiesDropdown = store.cities

  // Test
  return (
    <Dialog
      open={open}
      onClose={handleEditClose}
      aria-labelledby='user-view-edit'
      aria-describedby='user-view-edit-description'
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 950 } }}
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

        // sx={{
        //   pb: theme => `${theme.spacing(8)} !important`,
        //   px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        // }}
        >
          <Card>
            <CardContent>
              <StepperWrapper>
                <Stepper activeStep={activeStep}>
                  {steps.map((step, index) => {
                    const labelProps: {
                      error?: boolean
                    } = {}
                    if (index === activeStep) {
                      labelProps.error = false
                      if (
                        (personalErrors.cityId ||
                          personalErrors['name'] ||
                          personalErrors['description'] ||
                          personalErrors['code']) &&
                        activeStep === 0
                      ) {
                        labelProps.error = true
                      } else if (
                        (socialErrors.friendlyName ||
                          socialErrors.address ||
                          socialErrors.phone ||
                          socialErrors.email) &&
                        activeStep === 1
                      ) {
                        labelProps.error = true
                      } else {
                        labelProps.error = false
                      }
                    }

                    return (
                      <Step key={index}>
                        <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                          <div className='step-label'>
                            <Typography className='step-number'>{`0${index + 1}`}</Typography>
                            <div>
                              <Typography className='step-title'>{step.title}</Typography>
                              <Typography className='step-subtitle'>{step.subtitle}</Typography>
                            </div>
                          </div>
                        </StepLabel>
                      </Step>
                    )
                  })}
                </Stepper>
              </StepperWrapper>
            </CardContent>

            <Divider sx={{ m: '0 !important' }} />

            <CardContent>{renderContent()}</CardContent>
          </Card>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {renderDialogActionCancel()}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='outlined' color='primary' onClick={handleReset}>
                Reset
              </Button>
              <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                Cancel
              </Button>
            </Grid>

            {renderDialogActionNext()}
          </Grid>
        </DialogActions>
      </>
    </Dialog>
  )
}

export default StepperLinearWithValidation
