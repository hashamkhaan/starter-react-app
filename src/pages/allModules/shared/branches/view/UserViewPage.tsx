import { useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { fetchDataById } from 'src/store/apps/shared/thisCompany/branch'
import { useDispatch } from 'react-redux'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Components Imports
import UserViewLeft from './UserViewLeft'
import UserViewRight from './UserViewRight'
import LinearProgress from '@mui/material/LinearProgress'

type Props = {
  tab: string
  invoiceData: InvoiceType[]
}

const UserView = ({ tab, invoiceData }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()

  const branchId = router.query.id
  useEffect(() => {
    dispatch(fetchDataById(branchId))
  }, [dispatch, branchId])
  const data = useSelector((state: RootState) => state.thisCompanyBranches.dataById)

  const dataByIdLoading = useSelector((state: RootState) => state.thisCompanyBranches.dataByIdLoading)

  return dataByIdLoading && !data ? (
    <LinearProgress />
  ) : (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserViewLeft data={data} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight data={data?.companyBranchDepartments} tab={tab} invoiceData={invoiceData} branchId={branchId} />
      </Grid>
    </Grid>
  )
}

export default UserView
