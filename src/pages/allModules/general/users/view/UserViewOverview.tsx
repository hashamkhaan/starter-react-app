// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types

// ** Demo Component Imports
import UsersProjectListTable from './UsersProjectListTable'

const UserViewOverview = ({ data, userId }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UsersProjectListTable data={data} userId={userId} />
      </Grid>
    </Grid>
  )
}

export default UserViewOverview
