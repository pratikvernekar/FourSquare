import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import {
    createStackNavigator,
    CardStyleInterpolators,
  } from '@react-navigation/stack';
import Register from '../screens/RegisterScreen';
import OtpScreen from '../screens/OtpScreen';
import ResetPassword from '../screens/ResetPasswordScreen';
import IndividualRestaurant from '../screens/IndividualRestaurantScreen';
import LoggedInStack from './LoggedInStack';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} 
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}/>
      <Stack.Screen name="Register" component={Register} 
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}/>
      <Stack.Screen name="OtpScreen" component={OtpScreen} 
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}/>
      <Stack.Screen name="ResetPassword" component={ResetPassword} 
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}/>
    
      <Stack.Screen name="IndividualRestaurant" component={IndividualRestaurant} 
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}/>
      <Stack.Screen name="SkipStack" component={LoggedInStack} 
      options={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}/>
    </Stack.Navigator>
  );
}
export default AuthStack;
