// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types

// ** Demo Component Imports
import UsersProjectListTable from './UsersProjectListTable'

const UserViewOverview = ({ data, companyId }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UsersProjectListTable data={data} companyId={companyId} />
      </Grid>
    </Grid>
  )
}

export default UserViewOverview
