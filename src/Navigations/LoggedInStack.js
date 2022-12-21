import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import IndividualRestaurant from '../screens/IndividualRestaurantScreen';
import DrawerNav from './Drawer';
import FavouriteScreen from '../screens/FavouriteScreen';
import AboutScreen from '../screens/AboutScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import ReviewScreen from '../screens/ReviewScreen'
import AddReview from '../screens/AddReviewScreen'

const Stack = createStackNavigator();

const LoggedInStack = () => {
  return (
    <Stack.Navigator initialRouteName="Drawer">
      <Stack.Screen
        name="Drawer"
        component={DrawerNav}
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

      <Stack.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="FeedBack"
        component={FeedbackScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="AddReview"
        component={AddReview}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
   
    </Stack.Navigator>
  );
};

export default LoggedInStack;
