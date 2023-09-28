// ** React Imports
import { ReactNode, useContext } from 'react'

// ** Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Types
import { NavGroup, NavLink } from 'src/@core/layouts/types'

import { customAbility } from 'src/configs/customAbility'

interface Props {
  navGroup?: NavGroup
  children: ReactNode
}

const CanViewNavGroup = (props: Props) => {
  // ** Props
  const { children, navGroup } = props

  // ** Hook
  const ability = useContext(AbilityContext)

  const canViewMenuGroup = (item: NavGroup) => {
    const hasAnyVisibleChild =
      item.children && item.children.some((i: NavLink) => ability && customAbility.can(i.action, i.subject, ability))

    // item.children && item.children.some((i: NavLink) => ability && ability.can(i.action, i.subject))

    // item.children && item.children.some((i: NavLink) => customAbility.can(i?.action, i?.subject, ability))

    if (!(item.action && item.subject)) {
      return hasAnyVisibleChild
    }

    return ability && customAbility.can(item?.action, item?.subject, ability)

    return ability && ability.can(item.action, item.subject) && hasAnyVisibleChild
  }

  if (navGroup && navGroup.auth === false) {
    return <>{children}</>
  } else {
    return navGroup && canViewMenuGroup(navGroup) ? <>{children}</> : null
  }
}

export default CanViewNavGroup
