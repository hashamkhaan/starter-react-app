// ** MUI Components
import Grid from '@mui/material/Grid'

// ** Demo Components
import AboutOverivew from 'src/pages/allModules/general/users/user-profile/profile/AboutOverivew'

// import ProjectsTable from 'src/pages/allModules/general/users/user-profile/profile/ProjectsTable'
// import ActivityTimeline from 'src/pages/allModules/general/users/user-profile/profile/ActivityTimeline'
// import ConnectionsTeams from 'src/pages/allModules/general/users/user-profile/profile/ConnectionsTeams'
import { useAuth } from 'src/hooks/useAuth'

// ** Types
import { ProfileTabType } from 'src/@fake-db/types'

const ProfileTab = ({ data }: { data: ProfileTabType }) => {
  const auth = useAuth()

  return data && Object.values(data).length ? (
    <Grid container spacing={6}>
      <Grid item lg={4} md={5} xs={12}>
        <AboutOverivew
          userData={auth}
          about={data.about}
          contacts={data.contacts}
          teams={data.teams}
          overview={data.overview}
        />
      </Grid>
      {/* <Grid item lg={8} md={7} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ActivityTimeline />
          </Grid>
          <ConnectionsTeams connections={data.connections} teams={data.teamsTech} />
          <Grid item xs={12}>
            <ProjectsTable />
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  ) : null
}

export default ProfileTab
