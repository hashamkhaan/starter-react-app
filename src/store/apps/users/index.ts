// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getUsersAPI,
  createUserAPI,
  getCompaniesDropdownAPI,
  getBranchesDropdownAPI,
  getDepartmentsDropdownAPI,
  getRolesDropdownAPI,
  getUserByIdAPI,
  deleteUserByIdAPI,
  assignRolesToUserAPI,
  removeUserRoleByIdAPI,
  updateUserAPI,
  updateUserWithImageAPI,
  toggleUserStatusByIdAPI,
  changeMyPasswordAPI,
  fetchMyDataApi,
  logoutMeAPI
} from 'src/store/apis/index.ts'

import toast from 'react-hot-toast'

// ** Axios Imports

interface DataParams {
  q: string
  role: string
  status: string
  currentPlan: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Users
export const fetchData = createAsyncThunk('appUsers2/fetchData', async (params: DataParams) => {
  try {
    const response = await getUsersAPI(params)

    return response.data
  } catch (error) {
    throw error
  }
})

// ** Fetch Companies
export const fetchCompaniesDropdowns = createAsyncThunk('appUsers2/fetchCompaniesDropdowns', async () => {
  try {
    const {
      data: { payload }
    } = await getCompaniesDropdownAPI()

    return payload
  } catch (error) {
    throw error
  }
})
export const fetchBranchesDropdowns = createAsyncThunk('appUsers2/fetchBranchesDropdowns', async id => {
  try {
    const {
      data: { payload }
    } = await getBranchesDropdownAPI(id)

    return payload
  } catch (error) {
    throw error

    console.log('Data fetch error', error)
  }
})
export const fetchDepartmentsDropdowns = createAsyncThunk('appUsers2/fetchDepartmentsDropdowns', async id => {
  try {
    const {
      data: { payload }
    } = await getDepartmentsDropdownAPI(id)

    return payload
  } catch (error) {
    throw error

    console.log('Data fetch error', error)
  }
})
export const fetchRolesDropdowns = createAsyncThunk('appUsers2/fetchRolesDropdowns', async () => {
  try {
    const {
      data: { payload }
    } = await getRolesDropdownAPI()

    return payload
  } catch (error) {
    throw error

    console.log('Data fetch error', error)
  }
})

// ** Add User
export const addUser = createAsyncThunk(
  'appUsers2/addUser',
  async ({ data, onSubmitSuccess, onSubmitError }, { getState, dispatch }: Redux) => {
    // async (data: { [key: string]: number | string }, { getState, dispatch, rejectWithValue }: Redux) => {
    try {
      const {
        data: { status, message }
      } = await createUserAPI({ ...data })
      if (status === 'SUCCESS') {
        onSubmitSuccess(message)
        dispatch(fetchData(getState().user.params))
      } else {
        onSubmitError(message)
      }
    } catch (error) {
      throw error

      onSubmitError(error.message)
    }
  }
)
export const assignRolesToUser = createAsyncThunk(
  'departments/assignRolesToUser',

  async ({ data, userId, onSubmitSuccess, onSubmitError }, { dispatch }: Redux) => {
    try {
      const {
        data: { status, message }
      } = await assignRolesToUserAPI({ ...data }, userId)
      if (status === 'SUCCESS') {
        onSubmitSuccess(message)
        dispatch(fetchDataById(userId))
      } else {
        onSubmitError(message)
      }
    } catch (error) {
      onSubmitError(error.message)
      throw error
    }
  }
)

// ** Delete User
export const deleteById = createAsyncThunk(
  'appUsers2/deleteById',
  async ({ id, onSubmitSuccess, onSubmitError }, { getState, dispatch }: Redux) => {
    try {
      const {
        data: { status, message }
      } = await deleteUserByIdAPI(id)

      if (status === 'SUCCESS') {
        onSubmitSuccess(message)
        dispatch(fetchData(getState().user.params))
      } else {
        onSubmitError(message)
      }
    } catch (error) {
      onSubmitError(error.message)
      throw error
    }
  }
)
export const removeUserRoleById = createAsyncThunk(
  'appUsers2/removeUserRoleById',
  async ({ id, onSubmitSuccess, onSubmitError }, {}: Redux) => {
    try {
      const {
        data: { status, message }
      } = await removeUserRoleByIdAPI(id)

      if (status === 'SUCCESS') {
        onSubmitSuccess(message)
      } else {
        onSubmitError(message)
      }
    } catch (error) {
      onSubmitError(error.message)
      throw error
    }
  }
)
export const logoutMe = createAsyncThunk('appUsers2/logoutMe', async () => {
  try {
    const {
      data: { status, message }
    } = await logoutMeAPI()

    if (status === 'SUCCESS') {
      // onSubmitSuccess(message)
    } else {
      // onSubmitError(message)
    }
    console.log('Logout2', message)
  } catch (error) {
    console.log('Logout', error.message)
    throw error
  }
})

export const logoutMe2 = createAsyncThunk('appUsers2/logoutMe2', async () => {
  try {
    console.log('logoutMe2-------')
  } catch (error) {
    console.log('Logout', error.message)
    throw error
  }
})

export const fetchMyData = createAsyncThunk('appUsers2/fetchMyData', async () => {
  try {
    const {
      data: { status, message, payload }
    } = await fetchMyDataApi()

    if (status === 'SUCCESS') {
      return payload
    } else {
      return rejectWithValue(message)
    }
  } catch (error) {
    // toast.error('Error')

    return rejectWithValue(error.message)
    throw error
  }
})
export const fetchDataById = createAsyncThunk('appUsers2/fetchDataById', async id => {
  try {
    const {
      data: { status, message, payload }
    } = await getUserByIdAPI(id)

    if (status === 'SUCCESS') {
      return payload
    } else {
      return rejectWithValue(message)
    }
  } catch (error) {
    // toast.error('Error')

    return rejectWithValue(error.message)
    throw error
  }
})
export const updateWithImageById = createAsyncThunk(
  'appUsers2/updateWithImageById',
  async ({ data, formData, onSubmitSuccess, onSubmitError }, { dispatch }: Redux) => {
    try {
      const {
        data: { status, message }
      } = await updateUserWithImageAPI(data.id, formData)
      if (status === 'SUCCESS') {
        onSubmitSuccess(message, data)
        dispatch(fetchDataById(data.id))
      } else {
        onSubmitError(message)
      }
    } catch (error) {
      onSubmitError(error.response.data.message)
      throw error
    }
  }
)
export const updateById = createAsyncThunk(
  'appUsers2/updateById',
  async ({ data, onSubmitSuccess, onSubmitError }, { dispatch }: Redux) => {
    try {
      const {
        data: { status, message }
      } = await updateUserAPI({ ...data })
      if (status === 'SUCCESS') {
        onSubmitSuccess(message)
        dispatch(fetchDataById(data.id))
      } else {
        onSubmitError(message)
      }
    } catch (error) {
      onSubmitError(error.message)
      throw error
    }
  }
)
export const changeMyPassword = createAsyncThunk(
  'appUsers2/changeMyPassword',
  async ({ data, onSubmitSuccess, onSubmitError }, { dispatch }: Redux) => {
    try {
      const {
        data: { status, message }
      } = await changeMyPasswordAPI({ ...data })
      if (status === 'SUCCESS') {
        onSubmitSuccess(message)
        dispatch(fetchDataById(data.id))
      } else {
        onSubmitError(message)
      }
    } catch (error) {
      onSubmitError(error.message)
      throw error
    }
  }
)
export const toggleUserStatusById = createAsyncThunk(
  'appUsers2/toggleUserStatusById',
  async ({ data, onSubmitSuccess, onSubmitError }, { dispatch }: Redux) => {
    try {
      const {
        data: { status, message }
      } = await toggleUserStatusByIdAPI(data.id, data.isActive === 0 ? 1 : 0)
      if (status === 'SUCCESS') {
        onSubmitSuccess(message)
        dispatch(fetchDataById(data.id))
      } else {
        onSubmitError(message)
      }
    } catch (error) {
      onSubmitError(error.message)
      throw error
    }
  }
)

export const appUsersSlice = createSlice({
  name: 'appUsers2',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    error: '',
    fetchDataLoading: false,
    companiesDropdown: [],
    rolesDropdown: [],
    branchesDropdown: [],
    departmentsDropdown: [],
    dataById: null,
    dataByIdLoading: true,
    dataByIdError: null,
    authUser: null,
    authUserLoading: true
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload.payload
        state.total = action.payload.total || 10
        state.params = action.payload.params || null
        state.allData = action.payload.payload
        state.fetchDataLoading = false
      })
      .addCase(fetchData.pending, state => {
        state.fetchDataLoading = true
      })
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.payload // Update your state with the error payload
        state.loading = false // Reset loading state
        toast.error('Internal Server Error')
      })
      .addCase(addUser.fulfilled, state => {
        state.error = null // Clear the error
        state.loading = false // Reset loading state
      })
      .addCase(fetchCompaniesDropdowns.fulfilled, (state, action) => {
        state.companiesDropdown = action.payload // Clear the error
        state.loading = false // Reset loading state
      })
      .addCase(fetchBranchesDropdowns.fulfilled, (state, action) => {
        state.branchesDropdown = action.payload // Clear the error
        state.loading = false // Reset loading state
      })
      .addCase(fetchDepartmentsDropdowns.fulfilled, (state, action) => {
        state.departmentsDropdown = action.payload // Clear the error
        state.loading = false // Reset loading state
      })
      .addCase(fetchRolesDropdowns.fulfilled, (state, action) => {
        state.rolesDropdown = action.payload // Clear the error
        state.loading = false // Reset loading state
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
      .addCase(fetchMyData.fulfilled, (state, action) => {
        state.authUser = action.payload.userData
        state.authUserLoading = false
      })
      .addCase(fetchMyData.rejected, state => {
        state.authUser = null
        state.authUserLoading = false
      })
  }
})

export default appUsersSlice.reducer
