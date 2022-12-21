import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Flatlists1} from '../components/Flatlists';

import {getTopPlace} from '../services/Places';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-simple-toast';

const Toppick = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [topPlaces, setTopPlaces] = useState([]);
  useEffect(() => {
    setTimeout(async () => {
      // const response = await getTopPlace(authData.latitude, authData.longitude);
      // setTopPlaces(response);
      getOneTimeLocation();
    }, 500);
  }, []);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setTimeout(async () => {
          try {
            setLoading(true);
            const response = await getTopPlace(
              position.coords.latitude,
              position.coords.longitude,
            );
            setTopPlaces(response);
            setLoading(false);
            // const response = await getNearPlaces(
            //   position.coords.latitude,
            //   position.coords.longitude,
            // );
            // setNearPlaces(response);
          } catch (error) {
            setLoading(false);
            Toast.show('Failed to animate direction');
          }
        }, 500);
        Toast.show('You are Here');
        
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
      <Flatlists1 navigation={navigation} data={topPlaces} />
    </View>
  );
};

export default Toppick;

const styles = StyleSheet.create({});
