// ** React Imports
import { ReactNode, useContext } from 'react'

// ** Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Types
import { NavLink } from 'src/@core/layouts/types'

import { customAbility } from 'src/configs/customAbility'

interface Props {
  navLink?: NavLink
  children: ReactNode
}

const CanViewNavLink = (props: Props) => {
  // ** Props
  const { children, navLink } = props

  // ** Hook
  const ability = useContext(AbilityContext)

  if (navLink && navLink.auth === false) {
    return <>{children}</>
  } else {
    return ability && customAbility.can(navLink?.action, navLink?.subject, ability) ? <>{children}</> : null

    return ability && ability.can(navLink?.action, navLink?.subject) ? <>{children}</> : null
  }
}

export default CanViewNavLink
