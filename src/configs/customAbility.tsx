// src/customAbility.ts
import { Ability } from '@casl/ability'
import type { AppAbility, Subjects } from 'src/configs/acl'

class CustomAbility extends Ability {
  // Override the 'can' method to customize permission checks
  can(action: string[], subject: Subjects[], ability: AppAbility) {
    // Your custom logic here to check permissions based on the action and sub
    // You can access the user or any other context data you need
    if (!(action || subject)) {
      return false
    }
    if (!Array.isArray(subject)) {
      return false
    }

    const allowedRoles = action || []
    for (const sub of subject) {
      const allowedBranchId = sub?.branchId
      const allowedDepartmentId = sub?.departmentId
      const allowedCompanyId = sub?.companyId
      const allowedCompanyTypeId = sub?.companyTypeId

      const isAllowed = ability.rules.some(right => {
        const isMatchingBranch = allowedBranchId === 0 || right.subject.branchId === allowedBranchId

        const isMatchingDepartment = allowedDepartmentId === 0 || right.subject.departmentId === allowedDepartmentId

        const isMatchingCompany = allowedCompanyId === 0 || right.subject.companyId === allowedCompanyId

        const isMatchingCompanyType = allowedCompanyTypeId === 0 || right.subject.companyTypeId === allowedCompanyTypeId

        return (
          (!allowedRoles || allowedRoles.length === 0 || allowedRoles.includes(`${right.action}`)) &&
          isMatchingBranch &&
          isMatchingDepartment &&
          isMatchingCompany &&
          isMatchingCompanyType
        )
      })
      if (isAllowed) {
        return true
      }
    }

    return false

    // Default behavior (fallback to CASL's original 'can' implementation)
    return super.can(action, sub)
  }
}

// Export the custom ability instance
export const customAbility = new CustomAbility()
