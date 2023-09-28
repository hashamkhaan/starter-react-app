import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = {
  companyTypeId: number | null
  branchId: number | null
  departmentId: number | null
  companyId: number | null
}
export type Actions = string[]

export type AppAbility = Ability<[Actions, Subjects[]]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: Subjects[]
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, subject: string, user) => {
  const { can, rules } = new AbilityBuilder(AppAbility)
  if (user.userRights) {
    user.userRights.forEach(element => {
      can(`${element.rightId}`, {
        companyTypeId: element.companyTypeId,
        branchId: element.branchId,
        departmentId: element.departmentId,
        companyId: element.companyId
      })

      // can(`${element.rightId}`, {
      //   companyTypeId: `${element.companyTypeId}`,
      //   branchId: `${element.branchId}`,
      //   departmentId: `${element.departmentId}`,
      //   companyId: `${element.companyId}`
      // })
    })

    // user.userRights.forEach(element => {
    //   can([`${element.rightId}`], `${element.companyTypeId},${element.branchId},${element.departmentId}`)
    // })
  }

  return rules
}

export const buildAbilityFor = (role: string, subject: string, user): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject, user), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: ['manage'],
  subject: [
    // {
    //   companyTypeId: '9999',
    //   branchId: '9999',
    //   departmentId: '9999',
    //   companyId: '9999'
    // }
  ]
}

// export const defaultACLObj: ACLObj = {
//   action: 'manage',
//   subject: 'all'
// }

export default defineRulesFor
