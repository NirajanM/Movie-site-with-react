import { createSlice } from '@reduxjs/toolkit'

export const rootSlice = createSlice({
  name: 'Homepage',
  initialState: {
    url: {},
    genres: {},
  },
  reducers: {
    getApiConfigurations: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
})


export const { getApiConfigurations, getGenres } = rootSlice.actions
export default rootSlice.reducer