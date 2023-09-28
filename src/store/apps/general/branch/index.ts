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
  createBranchAPI,
  getBranchesAPI,
  getBranchByIdAPI,
  updateBranchAPI,
  deleteBranchByIdAPI
} from 'src/store/apis/index.ts'

// ** Fetch Users
export const fetchData = createAsyncThunk('branches/fetchData', async (params: DataParams) => {
  try {
    const response = await getBranchesAPI(params)

    return response.data
  } catch (error) {
    toast.error('Error')
  }
})

export const fetchDataById = createAsyncThunk('branches/fetchDataById', async id => {
  try {
    const {
      data: { status, message, payload }
    } = await getBranchByIdAPI(id)

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
  'branches/addNew',

  async ({ data, onSubmitSuccess, onSubmitError }, { getState, dispatch }: Redux) => {
    try {
      const {
        data: { status, message }
      } = await createBranchAPI({ ...data })
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
  'branches/updateById',
  async ({ data, onSubmitSuccess, onSubmitError }, { getState, dispatch }: Redux) => {
    try {
      const {
        data: { status, message }
      } = await updateBranchAPI({ ...data })
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

// ** Delete User
export const deleteById = createAsyncThunk(
  'branches/deleteById',
  async ({ id, onSubmitSuccess, onSubmitError }, { getState, dispatch }: Redux) => {
    try {
      const {
        data: { status, message }
      } = await deleteBranchByIdAPI(id)

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

export const appUsersSlice = createSlice({
  name: 'branches',
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
    updateByIdError: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload.payload
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
  }
})

export default appUsersSlice.reducer
