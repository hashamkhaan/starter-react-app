// ** React Imports
import { useContext } from 'react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MALL_COMPANY_ADMIN_SUBJECT } from 'src/configs/aclSubjects'

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
          <CardHeader title='Common' />
          <CardContent>
            <Typography sx={{ mb: 4 }}>No ability is required to view this card</Typography>
            <Typography sx={{ color: 'primary.main' }}>This card is visible to 'user' and 'admin' both</Typography>
          </CardContent>
        </Card>
      </Grid>

      {customAbility.can([], MALL_COMPANY_ADMIN_SUBJECT, ability) ? (
        <Grid item md={6} xs={12}>
          <Card>
            <CardHeader title='Mall Company Admin' />
            <CardContent>
              <Typography sx={{ color: 'error.main' }}>This card is visible to 'Company Admin' only</Typography>
            </CardContent>
          </Card>
        </Grid>
      ) : null}
      {customAbility.can([], MALL_COMPANY_ADMIN_SUBJECT, ability) ? (
        <Grid item md={6} xs={12}>
          <Card>
            <CardHeader title='Branch Admin' />
            <CardContent>
              <Typography sx={{ color: 'error.main' }}>This card is visible to 'Branch Admin' only</Typography>
            </CardContent>
          </Card>
        </Grid>
      ) : null}
    </Grid>
  )
}

ACLPage.acl = {
  subject: MALL_COMPANY_ADMIN_SUBJECT
}

export default ACLPage
