import axios from 'axios';
import Toast from 'react-native-simple-toast';
const BASE_URl = 'https://four-square-three.vercel.app/api';

export const getNearPlaces = async (lat, long) => {
  try {
    const response = await axios.post(`${BASE_URl}/getNearPlace`, {
      latitude: lat,
      longitude: long,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred in getNearPlaces');
  }
};
export const getParticularPlace = async id => {
  try {
    const response = await axios.post(`${BASE_URl}/getParticularPlace`, {
      _id: id,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred in getParticularPlace');
  }
};
export const getTopPlace = async (lat, long) => {
  try {
    const response = await axios.post(`${BASE_URl}/getTopPlace`, {
      latitude: lat,
      longitude: long,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred in getTopPlace');
  }
};
export const getPopularPlace = async (lat, long) => {
  try {
    const response = await axios.post(`${BASE_URl}/getPopularPlace`, {
      latitude: lat,
      longitude: long,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred in getPopularPlace');
  }
};
export const getLunchPlace = async (lat, long) => {
  try {
    const response = await axios.post(`${BASE_URl}/getRestaurants`, {
      latitude: lat,
      longitude: long,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred in get lunch Restaurants');
  }
};
export const getCoffeePlace = async (lat, long) => {
  try {
    const response = await axios.post(`${BASE_URl}/getCafe`, {
      latitude: lat,
      longitude: long,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred in get Coffee Restaurants');
  }
};
export const getReview = async id => {
  try {
    const response = await axios.post(`${BASE_URl}/getReview`, {
      _id: id,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred in getReview');
  }
};
export const addReview = async (id, review, token) => {
  try {
    const response = await axios.post(
      `${BASE_URl}/addReview`,
      {
        _id: id,
        review: review,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkFiY0BnbWFpbC5jb20iLCJpYXQiOjE2NzE2Mjc3ODAsImV4cCI6MTY3MTYzMTM4MH0.AHjroDV01cliddxYfkYhy7tjTAgaQQ2y53DjsG0pkKk`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('An error has occurred in addReview');
  }
};
