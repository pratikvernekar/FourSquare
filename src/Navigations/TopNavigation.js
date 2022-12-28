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
import Toppick from '../screens/ToppickScreen';
import Popular from '../screens/PopularScreen';
import Lunch from '../screens/LunchScreen';
import Coffee from '../screens/CoffeeScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

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
            fontSize: 16,
            fontFamily: 'AvenirLTStd-Book',
            fontWeight: '600',
            textTransform: 'none',
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
        <Tab.Screen name="Popular" component={Popular} />
        <Tab.Screen name="Lunch" component={Lunch} />
        <Tab.Screen name="Coffee" component={Coffee} />
      </Tab.Navigator>
  );
};

export default TopNavigation;
