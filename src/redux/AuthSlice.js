import {createSlice} from '@reduxjs/toolkit';

const authenticateSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: {},
    isLoading: true,
    userToken: null,
    
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
  },
});

export const {login, logOut} = authenticateSlice.actions;
export default authenticateSlice.reducer;
