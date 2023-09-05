import { createSlice } from '@reduxjs/toolkit'

export const rootSlice = createSlice({
  name: 'Homepage',
  initialState: {
    url: {},
    tvGenre: "",
    movieGenre: "",
  },
  reducers: {
    getApiConfigurations: (state, action) => {
      state.url = action.payload;
    },
    getTvGenre: (state, action) => {
      state.tvGenre = action.payload;
    },
    getMovieGenre: (state, action) => {
      state.movieGenre = action.payload;
    },
  },
})


export const { getApiConfigurations, getTvGenre, getMovieGenre } = rootSlice.actions
export default rootSlice.reducer