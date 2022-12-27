import {createSlice} from '@reduxjs/toolkit';

const authenticateSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: {},
    isLoading: true,
    userToken: null,
    latitude: '',
    longitude: '',
    skip: false,
    favourite: [],
    ratings: false,
  },

  reducers: {
    login: (state, action) => {
      state.userToken = action.payload.access_token;
      state.isLoading = false;
    },

    logOut: state => {
      state.isLoading = false;
      state.userToken = null;
    },
    setLatLong: (state, action) => {
      state.latitude = action.payload.lat;
      state.longitude = action.payload.long;
    },
    setFavourite: (state, action) => {
      state.favourite = action.payload;
    },
    setSkip: (state, action) => {
      state.skip = !action.payload;
    },
    setRatings: (state, action) => {
      state.ratings = !action.payload;
    },
    setUserName: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {
  login,
  logOut,
  setLatLong,
  setFavourite,
  setSkip,
  setRatings,
  setUserName,
} = authenticateSlice.actions;
export default authenticateSlice.reducer;
