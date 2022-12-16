import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import TopNavigation from './src/Navigations/TopNavigation';
import IndividualRestaurant from './src/screens/IndividualRestaurantScreen';
import LoginScreen from './src/screens/LoginScreen';
import TopNavScreen from './src/screens/TopNavScreen';
import StackNav from './src/Navigations/StackNav';




const App = () => {
  return (
    <NavigationContainer>
      <StackNav/>
    </NavigationContainer>
    
  );
};

export default App;
