// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ProfileTeamsType, ProfileTabCommonType } from 'src/@fake-db/types'

interface Props {
  teams: ProfileTeamsType[]
  about: ProfileTabCommonType[]
  contacts: ProfileTabCommonType[]
  overview: ProfileTabCommonType[]
}

const renderList = (arr: ProfileTabCommonType[]) => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ display: 'flex', mr: 2 }}>
            <Icon icon={item.icon} />
          </Box>

          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
              {`${item.property.charAt(0).toUpperCase() + item.property.slice(1)}:`}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
            </Typography>
          </Box>
        </Box>
      )
    })
  } else {
    return null
  }
}

const renderTeams = (arr: ProfileTeamsType[]) => {
  if (arr && arr.length) {
    return arr.map((item, index) => {
      return (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: `${item.color}.main` }
          }}
        >
          <Icon icon='item.icon' />

          <Typography sx={{ mx: 2, fontWeight: 600, color: 'text.secondary' }}>
            {item.property.charAt(0).toUpperCase() + item.property.slice(1)}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
          </Typography>
        </Box>
      )
    })
  } else {
    return null
  }
}

const AboutOverivew = (props: Props) => {
  const { teams, contacts, overview, userData } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 6 }}>
              <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                About
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  '&:not(:last-of-type)': { mb: 4 },
                  '& svg': { color: 'text.secondary' }
                }}
              >
                <Box sx={{ display: 'flex', mr: 2 }}>
                  <Icon icon='mdi:account-outline' />
                </Box>

                <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>Full Name</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {userData.user.firstName.charAt(0).toUpperCase() + userData.user.firstName.slice(1)}{' '}
                    {userData.user.lastName.charAt(0).toUpperCase() + userData.user.lastName.slice(1)}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  '&:not(:last-of-type)': { mb: 4 },
                  '& svg': { color: 'text.secondary' }
                }}
              >
                <Box sx={{ display: 'flex', mr: 2 }}>
                  <Icon icon='mdi:user' />
                </Box>

                <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>Username</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{userData.user.username}</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  '&:not(:last-of-type)': { mb: 4 },
                  '& svg': { color: 'text.secondary' }
                }}
              >
                <Box sx={{ display: 'flex', mr: 2 }}>
                  <Icon icon='mdi:email' />
                </Box>

                <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>Email</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{userData.user.email}</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  '&:not(:last-of-type)': { mb: 4 },
                  '& svg': { color: 'text.secondary' }
                }}
              >
                <Box sx={{ display: 'flex', mr: 2 }}>
                  <Icon icon='mdi:check' />
                </Box>

                <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>Status</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {userData.user.isActive === 1 ? 'Active' : Suspended}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                Contacts
              </Typography>
              {renderList(contacts)}
            </Box>
            <div>
              <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                Teams
              </Typography>
              {renderTeams(teams)}
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <div>
              <Typography variant='caption' sx={{ mb: 5, display: 'block', textTransform: 'uppercase' }}>
                Overview
              </Typography>
              {renderList(overview)}
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AboutOverivew
