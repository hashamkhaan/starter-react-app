import { useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { ALL_COMPANIES_ADMIN_SUBJECT } from 'src/configs/aclSubjects'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

import { fetchData } from 'src/store/apps/shared/thisCompany/branch'

import { useDispatch, useSelector } from 'react-redux'

// ** Demo Components Imports
import View from './view'

const RolesComponent = () => {
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.thisCompanyBranches)

  useEffect(() => {
    dispatch(fetchData({}))
  }, [dispatch])

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h5'>Branches List</Typography>}
        subtitle={
          <Typography variant='body2'>
            A role provided access to predefined menus and features so that depending on assigned role an administrator
            can have access to what he need
          </Typography>
        }
      />
      <Grid item xs={12} sx={{ mb: 4 }}>
        <View data={store.data} />
      </Grid>
    </Grid>
  )
}
RolesComponent.acl = {
  subject: ALL_COMPANIES_ADMIN_SUBJECT
}
export default RolesComponent
