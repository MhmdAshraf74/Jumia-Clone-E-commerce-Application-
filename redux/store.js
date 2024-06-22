import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./toast/toastSlice";
const store = configureStore({
  reducer: {
    // You can add other reducers here if you have more slices
    toast: toastReducer,
  },
});

export default store;
