import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Flatlists1} from '../components/Flatlists';
import {useSelector} from 'react-redux';
import {getCoffeePlace, getLunchPlace} from '../services/Places';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-simple-toast';

const Coffee = ({navigation}) => {
  const [coffeePlaces, setCoffeePlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(async () => {
      getOneTimeLocation();
    }, 500);
  }, []);
  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setTimeout(async () => {
          try {
            const response = await getCoffeePlace(
              position.coords.latitude,
              position.coords.longitude,
            );

            setCoffeePlaces(response);
            setLoading(false);
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
      <Flatlists1 navigation={navigation} data={coffeePlaces} />
    </View>
  );
};

export default Coffee;

const styles = StyleSheet.create({});
