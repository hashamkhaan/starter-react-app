// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types
import { PricingPlanType } from 'src/@core/components/plan-details/types'

// ** Demo Components
import CurrentPlanCard from 'src/pages/allModules/general/users/account-settings/billing/CurrentPlanCard'
import PaymentMethodCard from 'src/pages/allModules/general/users/account-settings/billing/PaymentMethodCard'
import BillingAddressCard from 'src/pages/allModules/general/users/account-settings/billing/BillingAddressCard'
import BillingHistoryTable from 'src/pages/allModules/general/users/account-settings/billing/BillingHistoryTable'

const TabBilling = ({ apiPricingPlanData }: { apiPricingPlanData: PricingPlanType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CurrentPlanCard data={apiPricingPlanData} />
      </Grid>

      <Grid item xs={12}>
        <PaymentMethodCard />
      </Grid>

      <Grid item xs={12}>
        <BillingAddressCard />
      </Grid>

      <Grid item xs={12}>
        <BillingHistoryTable />
      </Grid>
    </Grid>
  )
}

export default TabBilling
