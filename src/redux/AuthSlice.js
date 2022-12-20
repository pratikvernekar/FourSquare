import {createSlice} from '@reduxjs/toolkit';

const authenticateSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: {},
    isLoading: true,
    userToken: null,
    latitude: '',
    longitude: '',
  },

  reducers: {
    login: (state, action) => {
      state.userToken = action.payload.access_token;
      state.isLoading = false;
      state.latitude = false;
      state.longitude = '';
    },

    logOut: state => {
      state.isLoading = false;
      state.userToken = null;
    },
    setLatLong: (state, action) => {
      state.latitude = action.payload.lat;
      state.longitude = action.payload.long;
    },
  },
});

export const {login, logOut, setLatLong} = authenticateSlice.actions;
export default authenticateSlice.reducer;
