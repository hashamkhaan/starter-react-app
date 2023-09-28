import axios from 'src/configs/axios-config'

export const logoutMeAPI = async () => axios.post(`/auth/logout`)
export const fetchMyDataApi = async () => axios.get(`/users/me`)

export const getUsersAPI = async params => axios.get('/users', { params })

export const getUserByIdAPI = async id => axios.get(`/users/${id}`)

export const createUserAPI = async user => axios.post(`/users/createUser`, user)
export const assignRolesToUserAPI = async (user, userId) => axios.post(`/users/assignRolesToUser/${userId}`, user)

export const updateUserAPI = async user => axios.patch(`/users/${user.id}`, user)
export const changeMyPasswordAPI = async user => axios.patch(`/users/changeMyPassword`, user)
export const updateUserWithImageAPI = async (id, user) =>
  axios.post(`/users/${id}`, user, {
    headers: {
      'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
    }
  })

export const toggleUserStatusByIdAPI = async (id, isActive) =>
  axios.patch(`/users/toggleUserStatusById/${id}`, { isActive })

export const deleteUserByIdAPI = async id => axios.delete(`/users/${id}`)
export const removeUserRoleByIdAPI = async id => axios.delete(`/users/removeUserRole/${id}`)
export const getRolesDropdownAPI = async () => axios.get(`/roles/dropdown`)
export const getCompaniesDropdownAPI = async () => axios.get(`/companies/dropdown`)
export const getBranchesDropdownAPI = async id => axios.get(`/branches/dropdown?companyId=${id ? id : ''}`)
export const getSimpleBranchesDropdownAPI = async () => axios.get(`/branches/branchesDropdown`)
export const getSimpleBranchesWhereNotInCompanyDropdownAPI = async id =>
  axios.get(`/branches/simpleBranchesWhereNotInCompanyDropdown?companyId=${id}`)
export const getDepartmentsDropdownAPI = async id => axios.get(`/departments/dropdown?branchId=${id ? id : ''}`)
export const getSimpleDepartmentsDropdownAPI = async () => axios.get(`/departments/departmentsdropdown`)
export const getCompanyTypesDropdownAPI = async () => axios.get(`/companies/typesDropdown`)

// Branches
export const getBranchesAPI = async () => axios.get('/branches')

export const getBranchByIdAPI = async id => axios.get(`/branches/${id}`)

export const createBranchAPI = async branch => axios.post(`/branches`, branch)
export const addBranchWithDepartmentsInCompanyAPI = async branch =>
  axios.post(`/companies/addBranchWithDepartmentsInCompany`, branch)
export const addNewDepartmentInBranchCompanyAPI = async branch =>
  axios.post(`/companies/addNewDepartmentInBranchCompany`, branch)

export const updateBranchAPI = async branch => axios.patch(`/branches/${branch.id}`, branch)

export const deleteBranchByIdAPI = async id => axios.delete(`/branches/${id}`)
export const getBranchesByThisCompanyAPI = async () => axios.get(`/branches/thisCompany`)
export const getBranchByIdByThisCompanyAPI = async id => axios.get(`/branches/thisCompany/${id}`)
export const toggleCompanyBranchIsActiveAPI = async (id, isActive) =>
  axios.patch(`/branches/toggleIsActive/${id}`, { isActive })

// Departments
export const getDepartmentsAPI = async () => axios.get('/departments')

export const getDepartmentByIdAPI = async id => axios.get(`/departments/${id}`)

export const createDepartmentAPI = async user => axios.post(`/departments`, user)

export const updateDepartmentAPI = async user => axios.patch(`/departments/${user.id}`, user)

export const deleteDepartmentByIdAPI = async id => axios.delete(`/departments/${id}`)

// Companies
export const getCompaniesAPI = async () => axios.get('/companies')

export const getCompanyByIdAPI = async id => axios.get(`/companies/${id}`)

export const createCompanyAPI = async user => axios.post(`/companies`, user)

export const updateCompanyAPI = async data => axios.patch(`/companies/${data.id}`, data)

export const deleteCompanyByIdAPI = async id => axios.delete(`/companies/${id}`)
export const deleteDepartmentInCompanyBranchAPI = async id =>
  axios.delete(`/companies/deleteDepartmentInCompanyBranch/${id}`)
export const deleteBranchInCompanyAPI = async id => axios.delete(`/companies/deleteBranchInCompany/${id}`)
export const toggleCompanyIsActiveAPI = async (id, isActive) =>
  axios.patch(`/companies/toggleIsActive/${id}`, { isActive })

// Roles
export const getRolesAPI = async () => axios.get('/roles')

export const getRoleByIdAPI = async id => axios.get(`/roles/${id}`)

export const createRoleAPI = async user => axios.post(`/roles`, user)

export const updateRoleAPI = async user => axios.patch(`/roles/${user.id}`, user)

export const deleteRoleByIdAPI = async id => axios.delete(`/roles/${id}`)
export const getRightsDropdownAPI = async () => axios.get(`/roles/rightsDropdown`)
