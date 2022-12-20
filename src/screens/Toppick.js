import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Flatlists, { Flatlists1 } from '../components/Flatlists';

const Toppick = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Flatlists1 navigation={navigation}/>
    </View>
  );
};

export default Toppick;

const styles = StyleSheet.create({});
