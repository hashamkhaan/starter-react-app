// ** React Imports
import { useState, ElementType, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Button, { ButtonProps } from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import FormHelperText from '@mui/material/FormHelperText'
import * as yup from 'yup'
import LoadingButton from '@mui/lab/LoadingButton'

import { yupResolver } from '@hookform/resolvers/yup'

import { updateWithImageById } from 'src/store/apps/users'
import { useAuth } from 'src/hooks/useAuth'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'src/context/SnackbarContext'

// ** Icon Imports

// interface Data {
//   email: string
//   state: string
//   address: string
//   country: string
//   lastName: string
//   currency: string
//   language: string
//   timezone: string
//   firstName: string
//   organization: string
//   number: number | string
//   zipCode: number | string
// }

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

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: 4,
  marginRight: theme.spacing(5)
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccountEdit = ({ userData }) => {
  // ** State
  const auth = useAuth()

  const dispatch = useDispatch<AppDispatch>()
  const { triggerSnackbar } = useSnackbar()

  const [inputValue, setInputValue] = useState<string>('')
  console.log('Pending Bug userData.imgSrc', userData)

  // '/images/avatars/1.png'
  const [imgSrc, setImgSrc] = useState<string>(`${userData.imgSrc}`)
  const [imgFile, setImgFile] = useState<string>('')

  const defaultValues = {
    id: userData.id,
    email: userData.email,
    lastName: userData.lastName,
    firstName: userData.firstName,
    contact: userData.contact,
    username: userData.username
  }

  // ** Hooks
  const {
    control,
    reset,

    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, mode: 'onChange', resolver: yupResolver(schema) })

  // setInputValue(URL.createObjectURL(file.target.files[0]))

  const handleInputImageChange = (file: ChangeEvent) => {
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      const selectedFile = files[0]
      setImgFile(selectedFile)
      if (selectedFile.type === 'image/png' || selectedFile.type === 'image/jpeg') {
        const reader = new FileReader()
        if (files && files.length !== 0) {
          reader.onload = () => setImgSrc(reader.result as string)
          reader.readAsDataURL(files[0])
          if (reader.result !== null) {
            setInputValue(reader.result as string)
          }
        }
      } else {
        triggerSnackbar('error', 'Invalid file type. Please select an image (PNG or JPEG).')
      }
    }

    // setInputValue(URL.createObjectURL(file.target.files[0]))

    // setFile(URL.createObjectURL(event.target.files[0]))
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleInputImageChangeTemp = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement

    if (files && files.length !== 0) {
      reader.onload = event => {
        if (event.target && event.target.result) {
          const binaryData = event.target.result as ArrayBuffer
          console.log('binaryData', binaryData)
          setImgFile(binaryData)
        }
      }

      // Start reading the file as ArrayBuffer after setting up the onload handler
      reader.readAsArrayBuffer(files[0])
    }
  }

  const handleInputImageReset = () => {
    // setInputValue('')
    setImgFile('')
    setImgSrc('/images/avatars/1.png')
  }

  // const handleFormChange = (field: keyof Data, value: Data[keyof Data]) => {
  //   setFormData({ ...formData, [field]: value })
  // }
  const [submitLoading, setSubmitLoading] = useState(false)

  const onSubmitSuccess = async (message, data: object | null) => {
    setSubmitLoading(false)
    auth.setUser({ ...auth.user, imgSrc, ...data })
    triggerSnackbar('success', message)

    // reset()
  }
  const onSubmitError = async message => {
    triggerSnackbar('error', message)
    setSubmitLoading(false)
  }
  const onSubmit = data => {
    setSubmitLoading(true)

    const formData = new FormData()
    const dataStringify = JSON.stringify(data)
    formData.append('data', dataStringify)

    formData.append('imgFile', imgFile)
    dispatch(updateWithImageById({ data, formData, onSubmitSuccess, onSubmitError }))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent sx={{ pb: theme => `${theme.spacing(10)}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ImgStyled src={imgSrc} alt='Profile Pic' />
          <div>
            <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
              Upload New Photo
              <input
                hidden
                type='file'
                value={inputValue}
                accept='image/png, image/jpeg'
                onChange={handleInputImageChange}
                id='account-settings-upload-image'
              />
            </ButtonStyled>
            <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
              Reset
            </ResetButtonStyled>
            <Typography variant='caption' sx={{ mt: 4, display: 'block', color: 'text.disabled' }}>
              Allowed PNG or JPEG. Max size of 800K.
            </Typography>
          </div>
        </Box>
      </CardContent>
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
          <Grid item xs={12} sm={6}>
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
                          PK (+92)
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
              {errors.contact && <FormHelperText sx={{ color: 'error.main' }}>{errors.contact.message}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Address'
              placeholder='Address'
              value={formData.address}
              onChange={e => handleFormChange('address', e.target.value)}
            />
          </Grid> */}

        <Grid item xs={12}>
          <LoadingButton
            size='large'
            type='submit'
            sx={{ mr: 4 }}
            loading={submitLoading}
            loadingPosition='start'
            startIcon={<Icon icon='mdi:update' />}
            variant='contained'
          >
            <span>Update</span>
          </LoadingButton>
          <Button type='reset' variant='outlined' color='secondary' onClick={() => reset()}>
            Reset
          </Button>
        </Grid>
        {/* </Grid> */}
      </CardContent>
    </form>
  )
}

export default TabAccountEdit
