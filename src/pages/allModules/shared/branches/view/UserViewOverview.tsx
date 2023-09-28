// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types

// ** Demo Component Imports
import UsersProjectListTable from './UsersProjectListTable'

const UserViewOverview = ({ data, branchId }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UsersProjectListTable data={data} branchId={branchId} />
      </Grid>
    </Grid>
  )
}

export default UserViewOverview
