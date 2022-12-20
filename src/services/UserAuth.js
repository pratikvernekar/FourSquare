import axios from 'axios';
import Toast from 'react-native-simple-toast';
const BASE_URl = 'https://four-square-three.vercel.app/api';

export const register = async values => {
  try {
    const response = await axios.post(`${BASE_URl}/register`, {
      email: values.email,
      phoneNumber: values.mobile,
      password: values.password,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred in register');
  }
};
export const checkIn = async values => {
  try {
    const response = await axios.post(`${BASE_URl}/login`, {
      email: values.email,
      password: values.password,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred in Login');
  }
};
export const sendOtp = async value => {
  try {
    const response = await axios.post(`${BASE_URl}/sendOtp`, {
      email: value,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred in sentotp');
  }
};
export const verifyOtp = async value => {
  try {
    const response = await axios.post(`${BASE_URl}/verifyOtp`, {
      otp: value,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred in verify otp');
  }
};
export const forgotPassword = async (password, email) => {
   
  try {
    const response = await axios.post(`${BASE_URl}/forgotPassword`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred in forget password');
  }
};
