import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  value: false,
  message: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.value = action.payload;
    },
    toastMessage: (state, action) => {
      state.message = action.payload;
    }
  }
  
})

export const { setToast, toastMessage } = toastSlice.actions;
export default toastSlice.reducer;