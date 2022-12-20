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
export const getParticularPlace = async (id) => {
  try {
    const response = await axios.post(`${BASE_URl}/getParticularPlace`, {
     _id:id
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred in getParticularPlace');
  }
};

