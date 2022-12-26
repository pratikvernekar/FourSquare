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
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('An error has occurred in addReview');
  }
};
export const getNearCity = async (lat, long) => {
  try {
    const response = await axios.post(`${BASE_URl}/getNearCity`, {
      latitude: lat,
      longitude: long,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred in getNearCity');
  }
};
export const searchPlaceWithOutFilter = async (lat, long, place) => {
  try {
    const response = await axios.post(`${BASE_URl}/searchPlace`, {
      latitude: lat,
      longitude: long,
      text: place,
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred in searchPlaceWithOutFilter');
  }
};
export const addFavourite = async (id, token) => {
  try {
    const response = await axios.post(
      `${BASE_URl}/addFavourite`,
      {
        _id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('An error has occurred in addFavourite');
  }
};

export const searchFavourite = async (text, lat, long, token) => {
  try {
    const response = await axios.post(
      `${BASE_URl}/searchFavourite`,
      {
        text: text,
        latitude: lat,
        longitude: long,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('An error has occurred in searchFavourite');
  }
};

export const searchPlaceWithFilter = async (obj, token) => {
  try {
    const response = await axios.post(`${BASE_URl}/filterSearch`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('An error has occurred in searchPlaceWithFilter');
  }
};
export const getReviewImage = async (id, token) => {
  try {
    const response = await axios.post(
      `${BASE_URl}/getReviewImage`,
      {
        _id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('An error has occurred in getReviewImage');
  }
};
export const addReviewImage = async (image, token) => {
  console.log(image);
  try {
    let res = await fetch(`${BASE_URl}/addReviewImage`, {
      method: 'post',
      body: image,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await res.json();
    return data;
  } catch (er) {
    Toast.show('Error in addReviewImage');
  }
};

export const getFavouriteId = async (token) => {
  try {
    const response = await axios.get(
      `${BASE_URl}/getFavouriteId`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('An error has occurred in getFavouriteId');
  }
};
