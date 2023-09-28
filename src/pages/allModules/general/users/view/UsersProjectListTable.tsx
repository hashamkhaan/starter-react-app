// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import AssignNewRole from './modals/AssignNewRole'
import Icon from 'src/@core/components/icon'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import { useSnackbar } from 'src/context/SnackbarContext'
import { useDispatch } from 'react-redux'

// import CustomChip from 'src/@core/components/mui/chip'

// ** Third Party Imports

// ** Type Imports
import { ProjectListDataType } from 'src/types/apps/userTypes'
import { removeUserRoleById } from 'src/store/apps/users'

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
    field: 'company',
    headerName: 'Company',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Img src={row.img} alt={`project-${row.branch?.name}`} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
            {row.company?.name || '*'}
          </Typography>
          <Typography variant='caption'>{row.projectType}</Typography>
        </Box>
      </Box>
    )
  },
  {
    flex: 0.1,
    minWidth: 150,
    field: 'projectTitle',
    headerName: 'Dep/Branch',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
            {row.department?.name || '*'}
          </Typography>
          <Typography variant='caption'>
            {row.branch?.name || '*'}
            {row.branch?.city && row.branch?.city?.city && `-${row.branch.city.city}`}
          </Typography>
        </Box>
      </Box>
    )
  },

  {
    flex: 0.1,
    minWidth: 110,
    field: 'role',
    headerName: 'Role',
    renderCell: ({ row }: CellType) => (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
          {row.role?.name}
        </Typography>
        <Typography variant='caption'>{row.projectType}</Typography>
      </Box>
    )
  },
  {
    flex: 0.05,
    minWidth: 20,
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
    dispatch(removeUserRoleById({ id, onSubmitSuccess, onSubmitError }))

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
const InvoiceListTable = ({ data, userId }) => {
  // ** State
  const [value, setValue] = useState<string>('')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Card>
      <CardHeader title='User Roles List' />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant='contained'
            size='small'
            color='success'
            startIcon={<Icon icon='mdi:add' />}
            sx={{ mb: 3, whiteSpace: 'nowrap' }}
            onClick={() => {
              handleClickOpen()
            }}
          >
            Assign New Role
          </Button>
          <Typography variant='body2' sx={{ mr: 2 }}>
            Search:
          </Typography>
          <TextField size='small' placeholder='Search Project' value={value} onChange={e => setValue(e.target.value)} />
        </Box>
      </CardContent>
      <DataGrid
        autoHeight
        rows={data}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
      <AssignNewRole open={open} handleClose={handleClose} userId={userId} />
    </Card>
  )
}

export default InvoiceListTable
