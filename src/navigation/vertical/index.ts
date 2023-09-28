// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import {
  SUPERADMIN_SUBJECT,
  SUPERADMIN_ALL_COMPANIES_ADMIN_SUBJECT,
  TRAVEL_COMPANY_ADMIN_SUBJECT,
  MALL_COMPANY_ADMIN_SUBJECT,
  SPORTS_COMPANY_ADMIN_SUBJECT,
  ALL_COMPANIES_ADMIN_SUBJECT,
  ACCOUNTS_SUBJECT
} from 'src/configs/aclSubjects'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboards',
      icon: 'mdi:home-outline',

      // badgeContent: 'new',
      // badgeColor: 'error',
      children: [
        {
          title: 'CRM',
          path: '/dashboards/crm'
        },
        {
          title: 'Analytics',
          path: '/dashboards/analytics'
        },
        {
          title: 'eCommerce',
          path: '/dashboards/ecommerce'
        }
      ]
    },

    {
      subject: '1',
      title: 'superAdmin',
      icon: 'mdi:home-outline',
      badgeContent: 'new',
      badgeColor: 'error',
      subject: SUPERADMIN_SUBJECT,
      children: [
        {
          subject: SUPERADMIN_SUBJECT,
          title: 'Dashboard',
          path: '/allModules/dashBoards/superAdmin'
        }
      ]
    },
    {
      // subject: '1,null,null',
      // action: '1',
      title: 'Travel Admin',
      icon: 'mdi:home-outline',

      // badgeContent: 'new',
      // badgeColor: 'error',

      children: [
        {
          // subject: [...TRAVEL_COMPANY_ADMIN_SUBJECT, ...ACCOUNTS_SUBJECT],

          subject: TRAVEL_COMPANY_ADMIN_SUBJECT,

          // action: '1',

          title: 'Dashboard',
          path: '/allModules/dashBoards/travel/admin'
        }
      ]
    },
    {
      // subject: '1,null,null',
      // action: '1',
      title: 'Mall Admin',
      icon: 'mdi:home-outline',

      // badgeContent: 'new',
      // badgeColor: 'error',

      children: [
        {
          subject: MALL_COMPANY_ADMIN_SUBJECT,

          // action: '1',

          title: 'Dashboard',
          path: '/allModules/dashBoards/mall/admin'
        }
      ]
    },
    {
      // subject: '1,null,null',
      // action: '1',
      title: 'Sports Admin',
      icon: 'mdi:home-outline',

      // badgeContent: 'new',
      // badgeColor: 'error',

      children: [
        {
          subject: SPORTS_COMPANY_ADMIN_SUBJECT,

          // action: '1',

          title: 'Dashboard',
          path: '/allModules/dashBoards/sports/admin'
        }
      ]
    },

    {
      title: 'user Dashboard',
      icon: 'mdi:home-outline',
      badgeContent: 'new',
      badgeColor: 'error',
      children: [
        {
          title: 'user Dashboard',
          path: '/allModules/dashBoards/travel/user'
        }
      ]
    },
    {
      sectionTitle: 'Super Admin'
    },
    {
      title: 'Companies',
      icon: 'mdi:company',
      path: '/allModules/general/companies/list',

      subject: SUPERADMIN_SUBJECT
    },
    {
      subject: SUPERADMIN_SUBJECT,
      title: 'Branches',
      icon: 'icon-park-outline:branch-one',
      path: '/allModules/general/branches/list'
    },
    {
      subject: SUPERADMIN_SUBJECT,
      title: 'Departments',
      icon: 'noto-v1:department-store',
      path: '/allModules/general/departments/list'
    },
    {
      subject: SUPERADMIN_SUBJECT,
      title: 'Roles & Permissions',
      icon: 'mdi:shield-outline',
      children: [
        {
          subject: SUPERADMIN_SUBJECT,
          title: 'Roles',
          path: '/allModules/general/rolesPermissions/roles'
        }

        // {
        //   title: 'Permissions',
        //   path: '/allModules/general/rolesPermissions/'
        // }
      ]
    },
    {
      subject: SUPERADMIN_ALL_COMPANIES_ADMIN_SUBJECT,
      title: 'System Users',
      icon: 'mdi:account-outline',
      children: [
        {
          subject: SUPERADMIN_ALL_COMPANIES_ADMIN_SUBJECT,
          title: 'List',
          path: '/allModules/general/users/list'
        },
        {
          title: 'View',
          children: [
            {
              title: 'Overview',
              path: '/apps/user/view/overview'
            },
            {
              title: 'Security',
              path: '/apps/user/view/security'
            },
            {
              title: 'Billing & Plans',
              path: '/apps/user/view/billing-plan'
            },
            {
              title: 'Notifications',
              path: '/apps/user/view/notification'
            },
            {
              title: 'Connection',
              path: '/apps/user/view/connection'
            }
          ]
        }
      ]
    },

    // ALl Companies Shared
    {
      title: 'Branches',
      icon: 'mdi:company',
      path: '/allModules/shared/branches/list',

      subject: ALL_COMPANIES_ADMIN_SUBJECT
    },
    {
      title: 'Auth Pages',
      icon: 'mdi:lock-outline',
      children: [
        {
          title: 'Login',
          children: [
            {
              openInNewTab: true,
              title: 'Login v1',
              path: '/pages/auth/login-v1'
            },
            {
              openInNewTab: true,
              title: 'Login v2',
              path: '/pages/auth/login-v2'
            },
            {
              openInNewTab: true,
              title: 'Login With AppBar',
              path: '/pages/auth/login-with-appbar'
            }
          ]
        },
        {
          title: 'Register',
          children: [
            {
              openInNewTab: true,
              title: 'Register v1',
              path: '/pages/auth/register-v1'
            },
            {
              openInNewTab: true,
              title: 'Register v2',
              path: '/pages/auth/register-v2'
            },
            {
              openInNewTab: true,
              title: 'Register Multi-Steps',
              path: '/pages/auth/register-multi-steps'
            }
          ]
        },
        {
          title: 'Verify Email',
          children: [
            {
              openInNewTab: true,
              title: 'Verify Email v1',
              path: '/pages/auth/verify-email-v1'
            },
            {
              openInNewTab: true,
              title: 'Verify Email v2',
              path: '/pages/auth/verify-email-v2'
            }
          ]
        },
        {
          title: 'Forgot Password',
          children: [
            {
              openInNewTab: true,
              title: 'Forgot Password v1',
              path: '/pages/auth/forgot-password-v1'
            },
            {
              openInNewTab: true,
              title: 'Forgot Password v2',
              path: '/pages/auth/forgot-password-v2'
            }
          ]
        },
        {
          title: 'Reset Password',
          children: [
            {
              openInNewTab: true,
              title: 'Reset Password v1',
              path: '/pages/auth/reset-password-v1'
            },
            {
              openInNewTab: true,
              title: 'Reset Password v2',
              path: '/pages/auth/reset-password-v2'
            }
          ]
        },
        {
          title: 'Two Steps',
          children: [
            {
              openInNewTab: true,
              title: 'Two Steps v1',
              path: '/pages/auth/two-steps-v1'
            },
            {
              openInNewTab: true,
              title: 'Two Steps v2',
              path: '/pages/auth/two-steps-v2'
            }
          ]
        }
      ]
    },

    // Accounts
    {
      subject: ACCOUNTS_SUBJECT,
      title: 'Accounts',
      icon: 'mdi:account-outline',
      children: [
        {
          subject: ACCOUNTS_SUBJECT,
          title: 'overView',
          path: '/allModules/accounts/overView'
        },
        {
          subject: ACCOUNTS_SUBJECT,
          title: 'accountHeads',
          path: '/allModules/accounts/accountHeads'
        },
        {
          subject: ACCOUNTS_SUBJECT,
          title: 'financialStatements',
          path: '/allModules/accounts/financialStatements'
        }
      ]
    },

    {
      title: 'Others',
      icon: 'mdi:dots-horizontal',
      children: [
        {
          title: 'Menu Levels',
          children: [
            {
              title: 'Menu Level 2.1'
            },
            {
              title: 'Menu Level 2.2',
              children: [
                {
                  title: 'Menu Level 3.1'
                },
                {
                  title: 'Menu Level 3.2'
                }
              ]
            }
          ]
        },
        {
          title: 'Disabled Menu',
          disabled: true
        },
        {
          title: 'Raise Support',
          externalLink: true,
          openInNewTab: true,
          path: 'https://themeselection.com/support'
        },
        {
          title: 'Documentation',
          externalLink: true,
          openInNewTab: true,
          path: 'https://demos.themeselection.com/materio-mui-react-nextjs-admin-template/documentation'
        }
      ]
    }
  ]
}

export default navigation
