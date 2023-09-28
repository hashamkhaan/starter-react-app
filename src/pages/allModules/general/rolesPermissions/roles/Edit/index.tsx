/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import AlertTitle from '@mui/material/AlertTitle'

import DialogTitle from '@mui/material/DialogTitle'
import Alert from '@mui/material/Alert'

// ** Third Party Imports

import LinearProgress from '@mui/material/LinearProgress'
import EditForm from './form'
import { fetchDataById, fetchRightsDropdowns } from 'src/store/apps/general/role'
import { useDispatch, useSelector } from 'react-redux'

// ** Icon Imports

const DialogEditUserInfo = ({ itemId, openEdit, setOpenEdit }) => {
  const dispatch = useDispatch<AppDispatch>()

  const dataEdit = useSelector((state: RootState) => state.roles.dataById)
  const dataByIdLoading = useSelector((state: RootState) => state.roles.dataByIdLoading)
  const dataByIdError = useSelector((state: RootState) => state.departments.dataByIdError)

  useEffect(() => {
    if (openEdit) {
      dispatch(fetchDataById(itemId))
      dispatch(fetchRightsDropdowns())
    }
  }, [dispatch, itemId, openEdit])

  const handleClose = () => {
    setOpenEdit(false)

    // reset()
  }

  return (
    <Dialog
      open={openEdit}
      onClose={(event, reason) => {
        if (!dataEdit || reason !== 'backdropClick') {
          handleClose()
        }
      }}
      aria-labelledby='user-view-edit'
      aria-describedby='user-view-edit-description'
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
    >
      <DialogTitle
        id='user-view-edit'
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        Edit Role Information {itemId}
      </DialogTitle>
      {dataByIdLoading && <LinearProgress />}

      {dataByIdError && (
        <Alert severity='warning' sx={{ maxWidth: '500px' }}>
          <AlertTitle>Warning!</AlertTitle>
          Error fetching Data.
        </Alert>
      )}
      {dataEdit && <EditForm dataEdit={dataEdit} setOpenEdit={setOpenEdit} />}
    </Dialog>
  )
}

export default DialogEditUserInfo
