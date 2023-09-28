// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CustomChip from 'src/@core/components/mui/chip'
import moment from 'moment'
import Edit from './edit'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
// import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import SuspendDialog from './modals/SuspendDialog'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Import
// import { getInitials } from 'src/@core/utils/get-initials'

// interface ColorsType {
//   [key: string]: ThemeColor
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const data2: UsersType = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Company Details',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/4.png'
}

// const roleColors: ColorsType = {
//   admin: 'error',
//   editor: 'info',
//   author: 'warning',
//   maintainer: 'success',
//   subscriber: 'primary'
// }

const renderField = (field, value) => {
  return (
    <Box sx={{ display: 'flex', mb: 2 }}>
      <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>{field}:</Typography>
      <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
        {value}
      </Typography>
    </Box>
  )
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserViewLeft = ({ data }) => {
  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)

  // Handle Upgrade Plan dialog

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {data?.avatar ? (
                <CustomAvatar
                  src={data.username}
                  variant='rounded'
                  alt={data.email}
                  sx={{ width: 120, height: 120, fontWeight: 600, mb: 4 }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={data?.avatarColor as ThemeColor}
                  sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
                >
                  ---
                </CustomAvatar>
              )}
              <Typography variant='h6' sx={{ mb: 4 }}>
                {data.firstName}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={data.isActive === 1 ? 'Active' : 'suspended'}
                color={data.isActive === 1 ? 'success' : 'error'}
                sx={{ textTransform: 'capitalize' }}
              />
            </CardContent>

            <CardContent sx={{ my: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4, width: 44, height: 44 }}>
                    <Icon icon='mdi:check' />
                  </CustomAvatar>
                  <div>
                    <Typography variant='h6'>1.23k</Typography>
                    <Typography variant='body2'>Task Done</Typography>
                  </div>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 4, width: 44, height: 44 }}>
                    <Icon icon='mdi:star-outline' />
                  </CustomAvatar>
                  <div>
                    <Typography variant='h6'>568</Typography>
                    <Typography variant='body2'>Project Done</Typography>
                  </div>
                </Box>
              </Box>
            </CardContent>

            <CardContent>
              <Typography variant='h6'>Details</Typography>
              <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
              <Box sx={{ pb: 1 }}>
                {renderField('Username', data.username)}
                {renderField('First Email', data.email)}
                {renderField('First Name', data.firstName)}
                {renderField('Last Name', data.lastName)}
                {renderField('contact', data.contact)}
                {renderField('fatherName', data.userProfile?.fatherName)}
                {renderField('birthPlace', data.userProfile?.birthPlace)}
                {renderField(
                  'birthDate',
                  data.userProfile?.birthDate ? moment(data.userProfile?.birthDate).format('DD-MM-YYYY') : ''
                )}
                {renderField('gender', data.userProfile?.gender)}
                {renderField('maritalStatus', data.userProfile?.maritalStatus)}
                {renderField('nationality', data.userProfile?.nationality)}
                {renderField('bloodGroup', data.userProfile?.bloodGroup)}
                {renderField('cnic', data.userProfile?.cnic)}
                {renderField('homeAddress', data.userProfile?.homeAddress)}
                {renderField('homePhone', data.userProfile?.homePhone)}
                {renderField('mobilePhone', data.userProfile?.mobilePhone)}
                {renderField('emailinfo', data.userProfile?.emailinfo)}
                {renderField('officialNumber', data.userProfile?.officialNumber)}
                {renderField('profession', data.userProfile?.profession)}
                {renderField('experience', data.userProfile?.experience)}
                {renderField('education', data.userProfile?.education)}
                {renderField('HiringDate', data.userProfile?.HiringDate)}
                {renderField('ContactName', data.userProfile?.ContactName)}
                {renderField('ContactAdress', data.userProfile?.ContactAdress)}
                {renderField('ContactPhoneNo', data.userProfile?.ContactPhoneNo)}
                {renderField('ContactEmail', data.userProfile?.ContactEmail)}
                {renderField('Relation', data.userProfile?.Relation)}
                {renderField('OfficialNumber2', `${data.userProfile?.OfficialNumber2}`)}
                {renderField('fatherName', data.userProfile?.fatherName)}
                {renderField('fatherName', data.userProfile?.fatherName)}
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Edit
              </Button>
              <Button
                color={data.isActive === 1 ? 'error' : 'success'}
                variant='outlined'
                onClick={() => setSuspendDialogOpen(true)}
              >
                {data.isActive === 1 ? 'Suspend' : 'Activate'}
              </Button>
            </CardActions>

            <SuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} data={data} />
          </Card>
        </Grid>
        <Edit openEdit={openEdit} setOpenEdit={setOpenEdit} dataEdit={data} />
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
