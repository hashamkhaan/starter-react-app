// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'
import Menu from '@mui/material/Menu'

// import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import CustomChip from 'src/@core/components/mui/chip'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

// import Link from 'next/link'

import { useSnackbar } from 'src/context/SnackbarContext'

import { useDispatch } from 'react-redux'

import { deleteDepartmentInCompanyBranch } from 'src/store/apps/general/company'

// import DeletionDialogDepartment from './modals/DeleteDepartment'

// import CustomChip from 'src/@core/components/mui/chip'

// ** Third Party Imports

// ** Type Imports
import { ProjectListDataType } from 'src/types/apps/userTypes'

interface CellType {
  row: ProjectListDataType
}
const Img = styled('img')(({ theme }) => ({
  width: 34,
  height: 34,
  borderRadius: '50%',
  marginRight: theme.spacing(3)
}))

const columns: GridColDef[] = [
  {
    flex: 0.1,
    minWidth: 150,
    field: 'department',
    headerName: 'Department',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Img src={row.img} alt={`project-${row?.department?.name}`} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
            {row?.department?.name}
          </Typography>
          <Typography variant='caption'>{row?.department?.description}</Typography>
        </Box>
      </Box>
    )
  },
  {
    flex: 0.1,
    minWidth: 150,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => (
      <CustomChip
        skin='light'
        size='small'
        label={row.isActive === 1 ? 'Active' : 'Suspended'}
        color={row.isActive === 1 ? 'success' : 'error'}
        sx={{ textTransform: 'capitalize' }}
      />
    )
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
const RowOptions = ({ id }: { id: number | string }) => {
  // ** Hooks
  const { triggerSnackbar } = useSnackbar()

  const dispatch = useDispatch<AppDispatch>()

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

    // handleClose()
  }
  const onSubmitError = async message => {
    triggerSnackbar('error', message)

    // setSubmitLoading(false)
  }
  const handleDeleteDepartment = () => {
    dispatch(deleteDepartmentInCompanyBranch({ id, onSubmitSuccess, onSubmitError }))

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
        {/* <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href={`/allModules/general/users/view/overview?id=${id}`}
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem> */}
        {/* <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem> */}
        <MenuItem onClick={handleDeleteDepartment} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const InvoiceListTable = ({ data }) => {
  // ** State

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  return (
    <Card>
      {/* <CardHeader title='Departments' /> */}
      <CardContent></CardContent>
      <DataGrid
        autoHeight
        rows={data}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
      {/* <DeletionDialogDepartment
        itemId={itemId}
        open={deletionDialogOpen}
        setOpen={setDeletionDialogOpen}
        branchId={branchId}
      /> */}
    </Card>
  )
}

export default InvoiceListTable
