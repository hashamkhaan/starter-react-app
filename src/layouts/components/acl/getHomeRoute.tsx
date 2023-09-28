/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  // if (role === 'client') return '/acl'
  // if (role === 'admin2') return '/dashboards/crm'

  if (role === 'null') return '/allModules/dashBoards/superAdmin'
  if (role === '1') return '/allModules/dashBoards/travel/admin'
  if (role === '2') return '/allModules/dashBoards/sports/admin'
  if (role === '3') return '/allModules/dashBoards/mall/admin'
  else return '/401'
}

export default getHomeRoute
