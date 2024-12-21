import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./features/bookSlice";
import productSlice from "./features/productSlice";
import deleteProductSlice from "./features/deleteProductSlice";
import usersSlice from "./features/usersSlice";
import categorySlice from "./features/categorySlice";
import cartSlice from "./features/cartSlice";
import favouriteSlice from "./features/favouriteSlice";
import orderSlice from "./features/orderSlice";
import authSlice from "./features/authSlice";

export const store = configureStore({
  reducer: {
    booksReducer: bookSlice,
    productsReducer: productSlice,
    usersReducer: usersSlice,
    authReducer: authSlice,
    deleteProductReducer: deleteProductSlice,
    categoryReducer: categorySlice,
    cartReducer: cartSlice,
    favouriteReducer: favouriteSlice,
    orderReducer: orderSlice,
  },
});
