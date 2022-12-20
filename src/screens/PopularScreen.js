import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Flatlists1} from '../components/Flatlists';
import {useSelector} from 'react-redux';
import {getPopularPlace,} from '../services/Places';

const Popular = ({navigation}) => {
  const [popularPlaces,setPopularPlaces]=useState([])
  const authData = useSelector(state => state.auth);
  useEffect(() => {
    setTimeout(async () => {
      const response = await getPopularPlace(authData.latitude, authData.longitude);
      setPopularPlaces(response)
    }, 500);
  }, []);

  return (
    <View style={{flex: 1,}}>
      <Flatlists1 navigation={navigation} data={popularPlaces}/>
    </View>
  );
};

export default Popular;

const styles = StyleSheet.create({});
