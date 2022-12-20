import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Flatlists1} from '../components/Flatlists';
import {useSelector} from 'react-redux';
import {getLunchPlace} from '../services/Places';

const Lunch = ({navigation}) => {
  const [lunchPlaces, setLunchPlaces] = useState([]);
  const authData = useSelector(state => state.auth);
  useEffect(() => {
    setTimeout(async () => {
      const response = await getLunchPlace(
        authData.latitude,
        authData.longitude,
      );

      setLunchPlaces(response);
    }, 500);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Flatlists1 navigation={navigation} data={lunchPlaces} />
    </View>
  );
};

export default Lunch;

const styles = StyleSheet.create({});
