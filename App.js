import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import TopNavigation from './src/Navigations/TopNavigation';
import IndividualRestaurant from './src/screens/IndividualRestaurantScreen';
import LoginScreen from './src/screens/LoginScreen';
import TopNavScreen from './src/screens/TopNavScreen';
import StackNav from './src/Navigations/AuthStackNav';
import ReviewScreen from './src/screens/ReviewScreen';
import AddReviewScreen from './src/screens/AddReviewScreen';
import NearyouScreen from './src/screens/NearyouScreen';
import NavigationFunctionality from './src/Navigations/NavigationFunctionality';
import DrawerNav from './src/Navigations/Drawer';
import FavouriteScreen from './src/screens/FavouriteScreen';
import SearchScreen from './src/screens/SearchScreen';

let persistor = persistStore(store);

const App = () => {
  return (
    
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <NavigationFunctionality />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    
  );
};

export default App;
