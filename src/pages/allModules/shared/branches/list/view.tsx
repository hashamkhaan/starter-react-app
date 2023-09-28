// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import CustomChip from 'src/@core/components/mui/chip'

import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports

import Add from './add'

// interface CardDataType {
//   title: string
//   avatars: string[]
//   totalUsers: number
// }

// const cardData: CardDataType[] = [
//   { totalUsers: 4, title: 'Administrator', avatars: ['1.png', '2.png', '3.png', '4.png'] },
//   { totalUsers: 7, title: 'Manager', avatars: ['5.png', '6.png', '7.png', '8.png', '1.png', '2.png', '3.png'] },
//   { totalUsers: 5, title: 'Users', avatars: ['4.png', '5.png', '6.png', '7.png', '8.png'] },
//   { totalUsers: 3, title: 'Support', avatars: ['1.png', '2.png', '3.png'] },
//   { totalUsers: 2, title: 'Restricted User', avatars: ['4.png', '5.png'] }
// ]

const RolesCards = ({ data }) => {
  // ** States
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
  }

  // Handle Edit dialog
  const handleGetDataClick = () => {
    // dispatch(fetchDataById(id))
  }

  const renderCards = () =>
    data.map((item, index: number) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='body2'>{`Total ${item.companyBranchDepartmentsCount} Departments`}</Typography>
              <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.875rem' } }}>
                {item?.avatars?.map((img, index: number) => (
                  <Avatar key={index} alt={item.branch.name} src={`/images/avatars/${img}`} />
                ))}
              </AvatarGroup>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <Typography variant='h6'>
                  {item.branch.code}-{item.branch.name}
                </Typography>
                <Typography variant='h7'>{item.branch.city.cityCode}</Typography>
                <Typography variant='body2'>
                  {item.branch.description}
                  {item.branch.friendlyName && ` - ${item.branch.friendlyName}`}
                </Typography>

                <Typography
                  variant='body2'
                  component={Link}
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                  href={`/allModules/shared/branches/view/overview?id=${item.id}`}
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  onClick={e => {
                    // e.preventDefault()
                    handleGetDataClick(item.id)
                  }}
                >
                  View
                </Typography>
              </Box>
              <IconButton sx={{ color: 'text.secondary' }}>
                <CustomChip
                  skin='light'
                  size='small'
                  label={item.isActive === 1 ? 'Active' : 'Suspended'}
                  color={item.isActive === 1 ? 'success' : 'error'}
                  sx={{ textTransform: 'capitalize' }}
                />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))

  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            handleClickOpen()
          }}
        >
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={5}>
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <img width={65} height={130} alt='add-role' src='/images/cards/pose_m1.png' />
              </Box>
            </Grid>
            <Grid item xs={7}>
              <CardContent>
                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    variant='contained'
                    sx={{ mb: 3, whiteSpace: 'nowrap' }}
                    onClick={() => {
                      handleClickOpen()
                    }}
                  >
                    Add Branch
                  </Button>
                  <Typography>Add New Branch</Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Add open={open} handleClose={handleClose} />
    </Grid>
  )
}

export default RolesCards
