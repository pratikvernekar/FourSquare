import {refreshToken} from './services/UserAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function isTokenExpired(token) {
  var jwt_decode = require('jwt-decode');
  var decoded = jwt_decode(token);
  const time = new Date(decoded.exp);
  const time2 = new Date(Date.now() / 1000);
  if (time.getTime() <= time2.getTime()) {
    return true;
  } else {
    return false;
  }
}

export async function getVerifiedKeys(key) {
  if (key) {
    if (isTokenExpired(key)) {
      let response = await refreshToken(key);
     // console.log('New Token,', response);
      await AsyncStorage.setItem('token', response.access_token);
      return response.access_token;
    } else {
      return key;
    }
  } else {
    return 'Enter access token';
  }
}
