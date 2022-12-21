import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import TopNavScreen from '../screens/TopNavScreen';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerNav({navigation}) {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName="TopNavScreen"
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        overlayColor: 'transparent',
        drawerStyle: {
          width: "85%",
        },
      }}>
      <Drawer.Screen name="TopNavScreen" component={TopNavScreen} />
    </Drawer.Navigator>
  );
}
