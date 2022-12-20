import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import TopNavScreen from '../screens/TopNavScreen';
import IndividualRestaurant from '../screens/IndividualRestaurantScreen';
const Stack = createStackNavigator();

const LoggedInStack = () => {
  return (
    <Stack.Navigator initialRouteName="TopNav">
      <Stack.Screen
        name="TopNav"
        component={TopNavScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />

      <Stack.Screen
        name="IndividualRestaurant"
        component={IndividualRestaurant}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      {/* <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="TopNav"
        component={TopNavScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="IndividualRestaurant"
        component={IndividualRestaurant}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default LoggedInStack;
