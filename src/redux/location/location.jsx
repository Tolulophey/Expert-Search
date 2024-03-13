import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allowedCountries: [
    {
      country_id: 1,
      name: "Nigeria",
      postalCode: "120291",
      location: "africa",
    },
    {
      country_id: 2,
      name: "Ghana",
      postalCode: "120250",
      location: "africa",
    },
    {
      country_id: 3,
      name: "USA",
      postalCode: "122291",
      location: "america",
    },
    {
      country_id: 4,
      name: "France",
      postalCode: "542291",
      location: "europe",
    },
  ],
  chosenCountry: null,
  error: null,
  loading: false,
  deleteLoading: false,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    updateLocationStart: (state) => {
      state.loading = true;
    },
    updateLocationSuccess: (state, action) => {
      state.chosenCountry = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateLocationFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});


export const { 
  updateLocationStart, 
  updateLocationSuccess, 
  updateLocationFailure 
} = locationSlice.actions;

export default locationSlice.reducer;
