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

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
// import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import SuspendDialog from './modals/SuspendDialog'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'
import DeletionDialog from './modals/DeleteBranch'

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserViewLeft = ({ data }) => {
  // ** States
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)

  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false)

  const handleDeleteBranch = () => {
    setDeletionDialogOpen(true)
  }

  // Handle Upgrade Plan dialog

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {data?.avatar ? (
                <CustomAvatar
                  src={data.name}
                  variant='rounded'
                  alt={data.fullName}
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
                {data.branch.code}-{data.branch.name}
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
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Branch Code:</Typography>
                  <Typography variant='body2'>{data.branch.code}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Branch Desription:</Typography>
                  <Typography variant='body2'>{data.branch.description}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Friendly Name:</Typography>
                  <Typography variant='body2'>{data.branch.friendlyName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>City:</Typography>
                  <Typography variant='body2'>
                    {data.branch.city.cityCode}-{data.branch.city.city}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Address:</Typography>
                  <Typography variant='body2'>{data.branch.address}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Contact:</Typography>
                  <Typography variant='body2'>{data.branch.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Email:</Typography>
                  <Typography variant='body2'>{data.branch.email}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Status:</Typography>
                  <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                    {data.isActive === 1 ? 'Active' : 'Suspended'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                color={data.isActive === 1 ? 'error' : 'success'}
                variant='outlined'
                onClick={() => setSuspendDialogOpen(true)}
              >
                {data.isActive === 1 ? 'Suspend' : 'Activate'}
              </Button>
              <Button
                color='error'
                variant='contained'
                onClick={() => {
                  handleDeleteBranch()
                }}
              >
                Delete Branch
              </Button>
            </CardActions>

            <DeletionDialog itemId={data.id} open={deletionDialogOpen} setOpen={setDeletionDialogOpen} />

            <SuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} data={data} />
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
