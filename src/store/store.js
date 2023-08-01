import { configureStore } from '@reduxjs/toolkit'
import rootSlice from './rootSlice'
export const store = configureStore({
    reducer: {
        home: rootSlice,
    },
})