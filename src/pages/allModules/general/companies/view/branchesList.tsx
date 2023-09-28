// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails, { AccordionDetailsProps } from '@mui/material/AccordionDetails'
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import DepartmentsTable from './departmentsTable'

// Styled component for Accordion component
const Accordion = styled(MuiAccordion)<AccordionProps>(({ theme }) => ({
  boxShadow: 'none !important',
  border:
    theme.palette.mode === 'light' ? `1px solid ${theme.palette.grey[300]}` : `1px solid ${theme.palette.divider}`,
  '&:not(:last-of-type)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  },
  '&.Mui-expanded': {
    margin: 'auto'
  },
  '&:first-of-type': {
    '& .MuiButtonBase-root': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius
    }
  },
  '&:last-of-type': {
    '& .MuiAccordionSummary-root:not(.Mui-expanded)': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius
    }
  }
}))

// Styled component for AccordionSummary component
const AccordionSummary = styled(MuiAccordionSummary)<AccordionSummaryProps>(({ theme }) => ({
  marginBottom: -1,
  padding: theme.spacing(0, 4),
  minHeight: theme.spacing(12),
  transition: 'min-height 0.15s ease-in-out',
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.background.default,
  borderBottom:
    theme.palette.mode === 'light' ? `1px solid ${theme.palette.grey[300]}` : `1px solid ${theme.palette.divider}`,
  '&.Mui-expanded': {
    minHeight: theme.spacing(12)
  },
  '& .MuiAccordionSummary-content.Mui-expanded': {
    margin: '10px 0'
  }
}))

// Styled component for AccordionDetails component
const AccordionDetails = styled(MuiAccordionDetails)<AccordionDetailsProps>(({ theme }) => ({
  padding: `${theme.spacing(4)} !important`
}))

const AccordionBranches = ({ data, companyId }) => {
  // ** State
  const [expanded, setExpanded] = useState<string | false>('panel1')

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const expandIcon = (value: string) => <Icon icon={expanded === value ? 'mdi:minus' : 'mdi:plus'} />

  return (
    <div>
      {data?.map(branch => {
        return (
          <Accordion key={branch.id} expanded={expanded === branch.id} onChange={handleChange(branch.id)}>
            <AccordionSummary
              id='customized-panel-header-1'
              expandIcon={expandIcon(branch.id)}
              aria-controls={`customized-panel-content-${branch.id}`}
            >
              <CustomChip
                skin='light'
                size='small'
                label={branch.isActive === 1 ? 'Active' : 'Suspended'}
                color={branch.isActive === 1 ? 'success' : 'error'}
                sx={{ textTransform: 'capitalize' }}
              />
              <Typography>
                {branch.branch.code} - {branch.branch.name}{' '}
                {branch.branch.friendlyName && ` - ${branch.branch.friendlyName}`} -{branch.branch.city.city}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DepartmentsTable
                companyId={companyId}
                branchId={branch.id}
                data={branch?.companyBranchDepartments || []}
              />
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}

export default AccordionBranches
