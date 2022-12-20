import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Flatlists1} from '../components/Flatlists';
import {useSelector} from 'react-redux';
import {getTopPlace} from '../services/Places';

const Toppick = ({navigation}) => {
  const [topPlaces,setTopPlaces]=useState([])
  const authData = useSelector(state => state.auth);
  useEffect(() => {
    setTimeout(async () => {
      const response = await getTopPlace(authData.latitude, authData.longitude);
     
      setTopPlaces(response)
    }, 500);
  }, []);

  return (
    <View style={{flex: 1,}}>
      <Flatlists1 navigation={navigation} data={topPlaces}/>
    </View>
  );
};

export default Toppick;

const styles = StyleSheet.create({});
