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
