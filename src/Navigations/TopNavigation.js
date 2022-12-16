import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NearyouScreen from '../screens/NearyouScreen';
import Toppick from '../screens/Toppick';

const Tab = createMaterialTopTabNavigator();

const TopNavigation = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const width1 =
    width > height
      ? Platform.OS === 'ios'
        ? 150
        : 150
      : Platform.OS === 'ios'
      ? 100
      : 100;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: 'AvenirLTStd-Book',
          fontWeight: '500',
        },
        tabBarItemStyle: {width: width1},
        tabBarStyle: {backgroundColor: '#370f24'},

        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: '#370f24',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#87787f',
      }}>
      <Tab.Screen name="NearYou" component={NearyouScreen} />
      <Tab.Screen name="TopPick" component={Toppick} />
      <Tab.Screen name="Popular" component={Toppick} />
      <Tab.Screen name="Lunch" component={Toppick} />
      <Tab.Screen name="Coffee" component={Toppick} />
    </Tab.Navigator>
  );
};

export default TopNavigation;
