import axios from 'axios';
import Toast from 'react-native-simple-toast';
const BASE_URl = 'https://four-square-three.vercel.app/api';

export const refreshToken = async token => {
  let res = await fetch(`${BASE_URl}/getAccessToken`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let data = await res.json();
  return data;
};

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
export const getProfile = async token => {
  try {
    const response = await axios.post(
      `${BASE_URl}/getProfile`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('An error has occurred in getProfile ');
  }
};
export const addProfileImage = async (image, token) => {
  console.log(image);
  try {
    let res = await fetch(`${BASE_URl}/addProfileImage`, {
      method: 'post',
      body: image,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await res.json();
    return data;
  } catch (er) {
    Toast.show('Error');
  }
};

export const addFeedBack = async (feed, token) => {
  try {
    const response = await axios.post(
      `${BASE_URl}/addFeedback`,
      {
        feedback: feed,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('An error has occurred in addFeedback');
  }
};
export const getAboutUs = async () => {
  try {
    const response = await axios.get(`${BASE_URl}/getAboutUs`, {}, {});
    return response.data;
  } catch (error) {
    console.log('An error has occurred in getAboutUs');
  }
};
