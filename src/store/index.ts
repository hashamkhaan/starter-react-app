// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import users from 'src/store/apps/users'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import companies from 'src/store/apps/general/company'
import branches from 'src/store/apps/general/branch'
import departments from 'src/store/apps/general/department'
import roles from 'src/store/apps/general/role'
import thisCompanyBranches from 'src/store/apps/shared/thisCompany/branch'
import dropdowns from 'src/store/apps/shared/dropdown'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    users,
    companies,
    branches,
    departments,
    roles,
    thisCompanyBranches,
    dropdowns
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
