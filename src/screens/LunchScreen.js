import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Flatlists1} from '../components/Flatlists';
import {getLunchPlace} from '../services/Places';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';

const Lunch = ({navigation}) => {
  const [lunchPlaces, setLunchPlaces] = useState([]);
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
            const response = await getLunchPlace(
              position.coords.latitude,
              position.coords.longitude,
            );

            setLunchPlaces(response);
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
      <Flatlists1 navigation={navigation} data={lunchPlaces} />
    </View>
  );
};

export default Lunch;

const styles = StyleSheet.create({});
