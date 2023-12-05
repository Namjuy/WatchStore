import { configureStore } from '@reduxjs/toolkit'
import userLoginSlice from './middlewares/userLoginSlice'
import { productListSlice } from './middlewares/productListSlice'
import { watchListSlice } from './middlewares/watchListSlice'


export default configureStore({
  reducer: {
    userLogin: userLoginSlice,
    productList: productListSlice,
    watchList: watchListSlice
  }
})
