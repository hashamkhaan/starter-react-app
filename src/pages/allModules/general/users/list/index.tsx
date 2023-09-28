// ** React Imports
import { useContext } from 'react'

import {
  SUPERADMIN_ALL_COMPANIES_ADMIN_SUBJECT,
  SUPERADMIN_SUBJECT,
  ALL_COMPANIES_ADMIN_SUBJECT
} from 'src/configs/aclSubjects'
import IndexSuperAdmin from './indexSuperAdmin'
import IndexThisCompanyAdmin from './indexCompanyAdmin'
import { customAbility } from 'src/configs/customAbility'
import { AbilityContext } from 'src/layouts/components/acl/Can'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserList = () => {
  // ** State
  const ability = useContext(AbilityContext)

  return (
    <>
      {customAbility.can([], SUPERADMIN_SUBJECT, ability) ? <IndexSuperAdmin /> : null}
      {customAbility.can([], ALL_COMPANIES_ADMIN_SUBJECT, ability) ? <IndexThisCompanyAdmin /> : null}
    </>
  )
}

UserList.acl = {
  subject: SUPERADMIN_ALL_COMPANIES_ADMIN_SUBJECT
}
export default UserList
