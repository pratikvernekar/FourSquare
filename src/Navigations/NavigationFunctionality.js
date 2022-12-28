import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import AuthStack from './AuthStackNav';
import LoggedInStack from './LoggedInStack';

const NavigationFunctionality = () => {
  const userData = useSelector(state => state.auth);

  return userData.userToken !== null  ? (
    <LoggedInStack />
  ) : (
    <AuthStack />
  );
};

export default NavigationFunctionality;

const styles = StyleSheet.create({});
