// ** React Imports
import { useContext } from 'react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { ACCOUNTS_SUBJECT } from 'src/configs/aclSubjects'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import { customAbility } from 'src/configs/customAbility'

const ACLPage = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)

  return (
    <Grid container spacing={6}>
      <Grid item md={6} xs={12}>
        <Card>
          <CardHeader title='Overview' />
          {/* <CardContent>
            <Typography sx={{ mb: 4 }}>No ability is required to view this card</Typography>
            <Typography sx={{ color: 'primary.main' }}>This card is visible to 'user' and 'admin' both</Typography>
          </CardContent> */}
        </Card>
        {customAbility.can([], ACCOUNTS_SUBJECT, ability) ? (
          <Grid item md={6} xs={12}>
            <Card>
              <CardHeader title='Accounts Admin' />
              <CardContent>
                <Typography sx={{ color: 'error.main' }}>This card is visible to 'Accounts Admin' only</Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  )
}

ACLPage.acl = {
  subject: ACCOUNTS_SUBJECT
}

export default ACLPage
