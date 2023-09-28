// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports

import { getCitiesDropdownAPI } from 'src/store/apis/dropdowns'

// ** Fetch Users
export const fetchCitiesDropdown = createAsyncThunk('dropdowns/fetchCitiesDropdown', async () => {
  try {
    const {
      data: { payload }
    } = await getCitiesDropdownAPI()

    return payload
  } catch (error) {
    console.log('Data fetch error', error)
  }
})

export const appDropdownsSlice = createSlice({
  name: 'dropdowns',
  initialState: {
    cities: [],
    citiesLoading: true
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCitiesDropdown.fulfilled, (state, action) => {
      state.cities = action.payload // Clear the error
      state.citiesLoading = false // Reset loading state
      // You might want to update other state properties here as well
    })
  }
})

export default appDropdownsSlice.reducer
