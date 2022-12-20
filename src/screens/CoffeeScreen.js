import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Flatlists1} from '../components/Flatlists';
import {useSelector} from 'react-redux';
import {getCoffeePlace, getLunchPlace} from '../services/Places';

const Coffee = ({navigation}) => {
  const [coffeePlaces, setCoffeePlaces] = useState([]);
  const authData = useSelector(state => state.auth);
  useEffect(() => {
    setTimeout(async () => {
      const response = await getCoffeePlace(
        authData.latitude,
        authData.longitude,
      );

      setCoffeePlaces(response);
    }, 500);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Flatlists1 navigation={navigation} data={coffeePlaces} />
    </View>
  );
};

export default Coffee;

const styles = StyleSheet.create({});
