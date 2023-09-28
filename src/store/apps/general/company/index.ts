// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import toast from 'react-hot-toast'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DataParams {}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}
import {
  createCompanyAPI,
  getCompaniesAPI,
  getCompanyByIdAPI,
  updateCompanyAPI,
  deleteCompanyByIdAPI,
  getSimpleBranchesDropdownAPI,
  getDepartmentsDropdownAPI,
  getCompanyTypesDropdownAPI,
  getSimpleBranchesWhereNotInCompanyDropdownAPI,
  getSimpleDepartmentsDropdownAPI,
  addBranchWithDepartmentsInCompanyAPI,
  addNewDepartmentInBranchCompanyAPI,
  deleteDepartmentInCompanyBranchAPI,
  deleteBranchInCompanyAPI,
  toggleCompanyIsActiveAPI
} from 'src/store/apis/index.ts'

// ** Fetch Users
export const fetchData = createAsyncThunk('companies/fetchData', async (params: DataParams) => {
  try {
    const {
      data: { status, message, payload }
    } = await getCompaniesAPI(params)
    if (status === 'SUCCESS') {
      return payload
    } else {
      return rejectWithValue(message)
    }
  } catch (error) {
    throw error
    toast.error('Error')
  }
})

export const fetchDataById = createAsyncThunk('companies/fetchDataById', async id => {
  try {
    const {
      data: { status, message, payload }
    } = await getCompanyByIdAPI(id)

    if (status === 'SUCCESS') {
      return payload
    } else {
      return rejectWithValue(message)
    }
  } catch (error) {
    // toast.error('Error')

    return rejectWithValue(error.message)
  }
})

// ** Add User
export const addNew = createAsyncThunk(
  'companies/addNew',

  async ({ data, onSubmitSuccess, onSubmitError }, { getState, dispatch }: Redux) => {
    try {
      const {
        data: { status, message }
      } = await createCompanyAPI({ ...data })
      if (status === 'SUCCESS') {
        onSubmitSuccess(message)
        dispatch(fetchData(getState().user.params))
      } else {
        onSubmitError(message)
      }
    } catch (error) {
      onSubmitError(error.message)
    }
  }
)
export const updateById = createAsyncThunk(
  'companies/updateById',
  async ({ data, onSubmitSuccess, onSubmitError }, { getState, dispatch }: Redux) => {
    try {
      const {
        data: { status, message }
      } = await updateCompanyAPI({ ...data })
      if (status === 'SUCCESS') {
        onSubmitSuccess(message)
        dispatch(fetchDataById(data.id))
        dispatch(fetchData(getState().user.params))
      } else {
        onSubmitError(message)
      }
    } catch (error) {
      onSubmitError(error.message)
    }
  }
)

// ** Delete User
export const deleteById = createAsyncThunk(
  'companies/deleteById',
  async ({ id, onSubmitSuccess, onSubmitError }, { getState, dispatch }: Redux) => {
    try {
      const {
        data: { status, message }
      } = await deleteCompanyByIdAPI(id)

      if (status === 'SUCCESS') {
        onSubmitSuccess(message)
        dispatch(fetchData(getState().user.params))
      } else {
        onSubmitError(message)
      }
    } catch (error) {
      onSubmitError(error.message)
    }
  }
)
export const deleteDepartmentInCompanyBranch = createAsyncThunk(
  'companies/deleteDepartmentInCompanyBranch',
  async ({ id, onSubmitSuccess, onSubmitError }, {}: Redux) => {
    try {
      const {
        data: { status, message }
      } = await deleteDepartmentInCompanyBranchAPI(id)

      if (status === 'SUCCESS') {
        onSubmitSuccess(message)

        // dispatch(fetchDataById(data.companyId))
      } else {
        onSubmitError(message)
      }
    } catch (error) {
      onSubmitError(error.message)
    }
  }
)
export const deleteBranchInCompany = createAsyncThunk(
  'companies/deleteBranchInCompany',
  async ({ id, companyId, onSubmitSuccess, onSubmitError }, { dispatch }: Redux) => {
    try {
      const {
        data: { status, message }
      } = await deleteBranchInCompanyAPI(id)

      if (status === 'SUCCESS') {
        onSubmitSuccess(message)
        dispatch(fetchDataById(companyId))
      } else {
        onSubmitError(message)
      }
    } catch (error) {
      onSubmitError(error.message)
    }
  }
)

export const fetchCompanyTypesDropdowns = createAsyncThunk('companies/fetchCompaniesDropdowns', async () => {
  try {
    const {
      data: { payload }
    } = await getCompanyTypesDropdownAPI()

    return payload
  } catch (error) {
    console.log('Data fetch error', error)
  }
})
export const fetchBranchesDropdowns = createAsyncThunk('companies/fetchBranchesDropdowns', async id => {
  try {
    const {
      data: { payload }
    } = await getSimpleBranchesDropdownAPI(id)

    return payload
  } catch (error) {
    console.log('Data fetch error', error)
  }
})
export const fetchDepartmentsDropdowns = createAsyncThunk('companies/fetchDepartmentsDropdowns', async id => {
  try {
    const {
      data: { payload }
    } = await getDepartmentsDropdownAPI(id)

    return payload
  } catch (error) {
    console.log('Data fetch error', error)
  }
})
export const fetchSimpleDepartmentsDropdowns = createAsyncThunk(
  'companies/fetchSimpleDepartmentsDropdowns',
  async () => {
    try {
      const {
        data: { payload }
      } = await getSimpleDepartmentsDropdownAPI()

      return payload
    } catch (error) {
      console.log('Data fetch error', error)
    }
  }
)
export const addNewBranchWithDepartmentsInCompany = createAsyncThunk(
  'companies/addNewBranchWithDepartmentsInCompany',

  async ({ data, onSubmitSuccess, onSubmitError }, { dispatch }: Redux) => {
    try {
      console.log('data', data)
      const {
        data: { status, message }
      } = await addBranchWithDepartmentsInCompanyAPI({ ...data })
      if (status === 'SUCCESS') {
        onSubmitSuccess(message)
        dispatch(fetchDataById(data.companyId))

        // dispatch(fetchData(getState().user.params))
      } else {
        onSubmitError(message)
      }
    } catch (error) {
      onSubmitError(error.message)
    }
  }
)
export const addNewDepartmentInBranchCompany = createAsyncThunk(
  'companies/addNewDepartmentInBranchCompany',

  async ({ data, onSubmitSuccess, onSubmitError }, { dispatch }: Redux) => {
    try {
      const {
        data: { status, message }
      } = await addNewDepartmentInBranchCompanyAPI({ ...data })
      if (status === 'SUCCESS') {
        onSubmitSuccess(message)
        dispatch(fetchDataById(data.companyId))

        // dispatch(fetchData(getState().user.params))
      } else {
        onSubmitError(message)
      }
    } catch (error) {
      onSubmitError(error.message)
    }
  }
)
export const fetchNewBranchesForCompanyDropdown = createAsyncThunk(
  'companies/fetchNewBranchesForCompanyDropdown',
  async id => {
    try {
      const {
        data: { payload }
      } = await getSimpleBranchesWhereNotInCompanyDropdownAPI(id)

      return payload
    } catch (error) {
      console.log('Data fetch error', error)
    }
  }
)
export const toggleCompanyIsActive = createAsyncThunk(
  'appUsers2/toggleCompanyIsActive',
  async ({ data, onSubmitSuccess, onSubmitError }, { dispatch }: Redux) => {
    try {
      const {
        data: { status, message }
      } = await toggleCompanyIsActiveAPI(data.id, data.isActive === 0 ? 1 : 0)
      if (status === 'SUCCESS') {
        onSubmitSuccess(message)
        dispatch(fetchDataById(data.id))
      } else {
        onSubmitError(message)
      }
    } catch (error) {
      onSubmitError(error.message)
    }
  }
)

export const appUsersSlice = createSlice({
  name: 'companies',
  initialState: {
    data: [],
    total: 10,
    params: {},
    allData: [],
    dataById: null,
    dataByIdLoading: true,
    dataByIdError: null,
    error: null,
    updateByIdLoading: true,
    updateByIdError: null,
    companyTypesDropdown: [],
    branchesDropdown: [],
    departmentsDropdown: [],
    branchesForCompanyDropdown: [],
    simpleDepartmentsDropdown: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        console.log('action', action)
        state.data = action?.payload
      })
      .addCase(addNew.rejected, (state, action) => {
        state.error = action.payload // Update your state with the error payload
        state.loading = false // Reset loading state
      })
      .addCase(addNew.fulfilled, state => {
        state.error = null // Clear the error
        state.loading = false // Reset loading state
        // You might want to update other state properties here as well
      })
      .addCase(fetchDataById.pending, state => {
        state.dataByIdLoading = true
        state.dataByIdError = null
        state.dataById = null
      })
      .addCase(fetchDataById.fulfilled, (state, action) => {
        state.dataById = action.payload
        state.dataByIdLoading = false
        state.dataByIdError = null
      })
      .addCase(fetchDataById.rejected, state => {
        state.dataByIdLoading = false
        state.dataByIdError = 'Error'
        state.dataById = null
      })
      .addCase(fetchBranchesDropdowns.fulfilled, (state, action) => {
        state.branchesDropdown = action.payload // Clear the error
        state.loading = false // Reset loading state
        // You might want to update other state properties here as well
      })
      .addCase(fetchDepartmentsDropdowns.fulfilled, (state, action) => {
        state.departmentsDropdown = action.payload // Clear the error
        state.loading = false // Reset loading state
        // You might want to update other state properties here as well
      })
      .addCase(fetchSimpleDepartmentsDropdowns.fulfilled, (state, action) => {
        state.simpleDepartmentsDropdown = action.payload // Clear the error
        state.loading = false // Reset loading state
        // You might want to update other state properties here as well
      })
      .addCase(fetchCompanyTypesDropdowns.fulfilled, (state, action) => {
        state.companyTypesDropdown = action.payload // Clear the error
        state.loading = false // Reset loading state
        // You might want to update other state properties here as well
      })
      .addCase(fetchNewBranchesForCompanyDropdown.fulfilled, (state, action) => {
        state.branchesForCompanyDropdown = action.payload // Clear the error
        state.loading = false // Reset loading state
        // You might want to update other state properties here as well
      })
  }
})

export default appUsersSlice.reducer
