import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackbar: {
    open: null,
    message: null,
    severity: null,
  },
  isLoading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    resetApp: () => initialState,
    openSnackbar: (state, action) => {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },

    closeSnackbar: (state) => {
      state.snackbar.open = false;
      state.snackbar.severity = null;
      state.snackbar.message = null;
    },
  },
});

export default appSlice.reducer;

export const { openSnackbar, closeSnackbar, resetApp } = appSlice.actions;

export const snackbarState = (state) => state.app.snackbar;
export const appState = (state) => state.app;
