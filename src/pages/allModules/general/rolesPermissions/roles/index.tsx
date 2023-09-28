// ** React Imports
import { useState, useEffect, useCallback } from 'react'
import { SUPERADMIN_SUBJECT } from 'src/configs/aclSubjects'

// ** Next Imports
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import CustomChip from 'src/@core/components/mui/chip'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData } from 'src/store/apps/general/role'

// ** Third Party Components
import axios from 'axios'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { CardStatsType } from 'src/@fake-db/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Custom Table Components Imports
import TableHeader from './TableHeader'
import AddDrawer from './AddDrawer'
import Edit from './Edit/index'
import DeletionDialog from './Delete'

// ** Vars

interface CellType {
  row: UsersType
}

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
        {getInitials(row.name ? row.name : 'Unknown')}
      </CustomAvatar>
    )
  }
}

const columns: GridColDef[] = (handleEditClickOpen, handleDelete) => [
  {
    flex: 0.1,
    field: 'name',
    minWidth: 150,
    headerName: 'Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {`${row.name}`}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 130,
    field: 'name2',
    headerName: 'Description',
    renderCell: ({ row }: CellType) => {
      const { description } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3, color: '' } }}>
          <Icon icon='' fontSize={20} />
          <Typography noWrap variant='caption'>
            {description}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 230,
    field: 'permissions',
    headerName: 'Permissions',
    renderCell: ({ row }: CellType) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return row.rights.map((right: string, index: number) => (
        <>
          <CustomChip
            size='small'
            key={index}
            skin='light'
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, '&:not(:last-of-type)': { mr: 3 } }}
            label={right.name}
            color={right?.color || 'info'}
          />
          <br />
        </>
      ))
    }
  },

  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ButtonGroup variant='text'>
          <Button size={'small'} color='primary' onClick={() => handleEditClickOpen(row.id)}>
            <Icon icon='mdi:pencil-outline' fontSize={20} />
            Edit
          </Button>
          <Button size={'small'} color='error' onClick={() => handleDelete(row.id)}>
            <Icon icon='mdi:pencil-outline' fontSize={20} />
            Delete
          </Button>
        </ButtonGroup>
      </Box>
    )

    // renderCell: ({ row }: CellType) => <RowOptions handleEditClickOpen={handleEditClickOpen} id={row.id} />
  }
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserList = ({ apiData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.roles)

  useEffect(() => {
    dispatch(
      fetchData({
        status,
        q: value
      })
    )
  }, [dispatch, status, value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  const toggleAddDrawer = () => setAddUserOpen(!addUserOpen)

  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [itemId, setItemId] = useState<number>('')
  const [deletionDialogOpen, setDeletionDialogOpen] = useState<boolean>(false)

  const handleEditClickOpen = id => {
    setItemId(id)

    setOpenEdit(true)
  }
  const handleDelete = id => {
    setItemId(id)
    setDeletionDialogOpen(true)

    // dispatch(deleteById(id))
  }

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
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value='0'>Select Status</MenuItem>
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddDrawer} />
          <DataGrid
            autoHeight
            rows={store.data}
            columns={columns(handleEditClickOpen, handleDelete)}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <AddDrawer open={addUserOpen} toggle={toggleAddDrawer} />
      <Edit itemId={itemId} openEdit={openEdit} setOpenEdit={setOpenEdit} />
      <DeletionDialog itemId={itemId} open={deletionDialogOpen} setOpen={setDeletionDialogOpen} />
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
  subject: SUPERADMIN_SUBJECT
}
export default UserList
