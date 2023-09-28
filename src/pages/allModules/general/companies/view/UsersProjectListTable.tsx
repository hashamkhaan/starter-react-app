// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

// import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'

// import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import AddBranch from './modals/addBranch'

// ** Third Party Imports

// ** Type Imports
import AccordionBranches from './branchesList.tsx'

const InvoiceListTable = ({ data, companyId }) => {
  // ** State
  // const [value, setValue] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Card>
      <CardHeader title='Branches List' />

      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button
            variant='contained'
            size='small'
            sx={{ mb: 3, whiteSpace: 'nowrap' }}
            onClick={() => {
              handleClickOpen()
            }}
          >
            Add Branch
          </Button>
          {/* <Typography variant='body2' sx={{ mr: 2 }}>
            Search:
          </Typography>

          <TextField size='small' placeholder='Search Project' value={value} onChange={e => setValue(e.target.value)} /> */}
        </Box>
      </CardContent>
      <AccordionBranches data={data} companyId={companyId} />
      <AddBranch open={open} handleClose={handleClose} companyId={companyId} />
    </Card>
  )
}

export default InvoiceListTable
