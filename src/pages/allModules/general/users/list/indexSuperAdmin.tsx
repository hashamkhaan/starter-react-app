// ** React Imports
import { useState, useEffect, MouseEvent, useCallback, useContext } from 'react'

import { SUPERADMIN_ALL_COMPANIES_ADMIN_SUBJECT } from 'src/configs/aclSubjects'

// ** Next Imports
import Link from 'next/link'
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useSnackbar } from 'src/context/SnackbarContext'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData, deleteById } from 'src/store/apps/users'

// ** Third Party Components
import axios from 'axios'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { CardStatsType } from 'src/@fake-db/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Custom Table Components Imports
import TableHeader from './TableHeader'
import AddUserDrawerSuperAdmin from './AddUserDrawer/superAdmin'

import { customAbility } from 'src/configs/customAbility'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { SUPERADMIN_SUBJECT } from 'src/configs/aclSubjects'
import {
  fetchCompaniesDropdowns,
  fetchBranchesDropdowns,
  fetchDepartmentsDropdowns,
  fetchRolesDropdowns
} from 'src/store/apps/users'

interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

// ** Vars
const userRoleObj: UserRoleType = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

interface CellType {
  row: UsersType
}

const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

// ** renders client column
const renderClient = (row: UsersType) => {
  if (row.avatar?.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 30, height: 30 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 30, height: 30, fontSize: '.875rem' }}
      >
        {getInitials(row.fullName ? row.fullName : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ id }: { id: number | string }) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const { triggerSnackbar } = useSnackbar()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }
  const onSubmitSuccess = async message => {
    // setSubmitLoading(false)
    triggerSnackbar('success', message)

    // toggle()
    // reset()
  }
  const onSubmitError = async message => {
    triggerSnackbar('error', message)

    // setSubmitLoading(false)
  }

  const handleDelete = async () => {
    await dispatch(deleteById({ id, onSubmitSuccess, onSubmitError }))

    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href={`/allModules/general/users/view/overview?id=${id}`}
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem>
        {/* <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem> */}
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'username',
    headerName: 'Username',
    renderCell: ({ row }: CellType) => {
      const { fullName, username } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <LinkStyled href='/apps/user/view/overview/'>{fullName}</LinkStyled>
            <Typography noWrap variant='caption'>
              {`@${username}`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.email}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'companyId',
    minWidth: 150,
    headerName: 'Role',
    renderCell: ({ row }: CellType) => {
      return (
        <Box
          sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3, color: userRoleObj[row.companyId]?.color } }}
        >
          <Icon icon={userRoleObj[row.companyId]?.icon} fontSize={20} />
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.companyId}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'Plan',
    field: 'currentPlan',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap sx={{ textTransform: 'capitalize' }}>
          {row.currentPlan}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'departmentId',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.isActive === 1 ? 'Active' : 'Suspended'}
          color={row.isActive === 1 ? 'success' : 'error'}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
  }
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserList = ({ apiData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // ** State
  const [companyId, setCompanyId] = useState<number>(0)
  const [branchId, setBranchId] = useState<number>(0)
  const [value, setValue] = useState<string>('')
  const [departmentId, setDepartmentId] = useState<number>(0)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.users)
  const ability = useContext(AbilityContext)

  const companiesDropdown = store.companiesDropdown
  const branchesDropdown = store.branchesDropdown
  const departmentsDropdown = store.departmentsDropdown
  const fetchDataLoading = store.fetchDataLoading
  const getTableData = () => {
    dispatch(
      fetchData({
        companyId,
        departmentId,
        q: value,
        branchId
      })
    )
  }
  useEffect(() => {
    getTableData()
  }, [dispatch])

  // }, [dispatch, branchId, companyId, departmentId, value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleCompanyChange = useCallback((e: SelectChangeEvent) => {
    setDepartmentId('')
    setBranchId('')

    setCompanyId(e.target.value)
  }, [])

  const handleBranchChange = useCallback((e: SelectChangeEvent) => {
    setDepartmentId('')

    setBranchId(e.target.value)
  }, [])

  const handleDepartmentChange = useCallback((e: SelectChangeEvent) => {
    setDepartmentId(e.target.value)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  useEffect(() => {
    dispatch(fetchCompaniesDropdowns())
    dispatch(fetchRolesDropdowns())
  }, [dispatch])
  useEffect(() => {
    if (companyId > 0) {
      dispatch(fetchBranchesDropdowns(companyId))
    }
  }, [dispatch, companyId])

  useEffect(() => {
    if (branchId > 0) {
      dispatch(fetchDepartmentsDropdowns(branchId))
    }
  }, [dispatch, branchId])

  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12}>
        {apiData && (
          <Grid container spacing={6}>
            {apiData.statsHorizontal.map((item: CardStatsHorizontalProps, index: number) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatisticsHorizontal {...item} icon={<Icon icon={item.icon as string} />} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid> */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='companyId-select'>Company</InputLabel>
                  <Select
                    size='small'
                    fullWidth
                    value={companyId}
                    id='select-companyId'
                    label='Select Role'
                    labelId='companyId-select'
                    onChange={handleCompanyChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value='0'>All</MenuItem>
                    {companiesDropdown.map(company => (
                      <MenuItem key={company.id} value={company.id}>
                        {company.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='branchId-select'>Branch</InputLabel>
                  <Select
                    size='small'
                    fullWidth
                    value={branchId}
                    id='select-branchId'
                    label='Select Plan'
                    labelId='branchId-select'
                    onChange={handleBranchChange}
                    inputProps={{ placeholder: 'Select Plan' }}
                  >
                    <MenuItem value='0'>All</MenuItem>

                    {branchesDropdown.map(branchId => (
                      <MenuItem key={branchId.id} value={branchId.id}>
                        {branchId.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='departmentId-select'>Department</InputLabel>
                  <Select
                    size='small'
                    fullWidth
                    value={departmentId}
                    id='select-departmentId'
                    label='Select Status'
                    labelId='departmentId-select'
                    onChange={handleDepartmentChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value='0'>All</MenuItem>

                    {departmentsDropdown.map(department => (
                      <MenuItem key={department.id} value={department.id}>
                        {department.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <TableHeader
            value={value}
            handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
            getTableData={getTableData}
          />
          {fetchDataLoading && <LinearProgress />}
          <DataGrid
            autoHeight
            rows={store.data}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
      {customAbility.can([], SUPERADMIN_SUBJECT, ability) ? (
        <AddUserDrawerSuperAdmin open={addUserOpen} toggle={toggleAddUserDrawer} />
      ) : null}
    </Grid>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('/cards/statistics')
  const apiData: CardStatsType = res.data

  return {
    props: {
      apiData
    }
  }
}
UserList.acl = {
  subject: SUPERADMIN_ALL_COMPANIES_ADMIN_SUBJECT
}
export default UserList
