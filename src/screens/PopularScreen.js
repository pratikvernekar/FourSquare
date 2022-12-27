import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Flatlists1} from '../components/Flatlists';

import {getPopularPlace} from '../services/Places';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';

const Popular = ({navigation}) => {
  const [popularPlaces, setPopularPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.auth);
  useEffect(() => {
    setTimeout(async () => {
      getOneTimeLocation();
    }, 500);
  }, [userData.ratings]);
  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setTimeout(async () => {
          try {
            setLoading(true);

            const response = await getPopularPlace(
              position.coords.latitude,
              position.coords.longitude,
            );
            setPopularPlaces(response);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            Toast.show('Failed to animate direction');
          }
        }, 500);
       
      },

      error => {
        Toast.show(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  if (loading) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="#351247" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Flatlists1 navigation={navigation} data={popularPlaces} />
    </View>
  );
};

export default Popular;

const styles = StyleSheet.create({});
