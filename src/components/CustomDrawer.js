import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {login, logOut, setSkip} from '../redux/AuthSlice';
import {getProfile} from '../services/UserAuth';

const CustomDrawer = (props, {navigation}) => {
  const authData = useSelector(state => state.auth);
  const [userData,setUserData]=useState({})
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(async () => {
      const response = await getProfile();
      console.log(response);
      setUserData(response)
    }, 500);
  }, []);

  return (
    <View style={styles.main}>
      <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}}>
        <ImageBackground
          blurRadius={40}
          resizeMode="cover"
          style={{flex: 1}}
          source={require('../assets/images/background.png')}>
          <ScrollView>
            <View style={styles.container}>
              <Image
                source={{uri:userData.userImage}}
                style={styles.UserImg}
              />
              {authData.userToken !== null ? (
                <Text style={styles.userText}>{userData.userName}</Text>
              ) : (
                <Pressable
                  onPress={() => props.navigation.navigate('LoginScreen')}>
                  <Text style={styles.userText}>Login</Text>
                </Pressable>
              )}
            </View>
            <View
              style={{
                width: '100%',
                marginTop: 60,
              }}>
              {authData.userToken !== null ? (
                <Pressable
                  onPress={() => props.navigation.navigate('Favourite')}>
                  <View style={styles.drawerItemView}>
                    <Image
                      source={require('../assets/images/Imgs/favourite_icon_unselected_white2.png')}
                      style={{
                        height: 23,
                        width: 23,
                        margin: 20,
                        resizeMode: 'contain',
                      }}
                    />
                    <Text style={styles.drawItemtext}>Favourite</Text>
                  </View>
                </Pressable>
              ) : (
                <View style={styles.drawerItemViewDisable}>
                  <Image
                    source={require('../assets/images/Imgs/favourite_icon_unselected_white2.png')}
                    style={{
                      height: 23,
                      width: 23,
                      margin: 20,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text style={styles.drawItemtext}>Favourite</Text>
                </View>
              )}
              {authData.userToken !== null ? (
                <Pressable
                  onPress={() => props.navigation.navigate('FeedBack')}>
                  <View style={styles.drawerItemView}>
                    <Image
                      source={require('../assets/images/sidemenu/feedback2.png')}
                      style={{height: 23, width: 23, margin: 20}}
                    />
                    <Text style={styles.drawItemtext}>Feedback</Text>
                  </View>
                </Pressable>
              ) : (
                <View style={styles.drawerItemViewDisable}>
                  <Image
                    source={require('../assets/images/sidemenu/feedback2.png')}
                    style={{height: 23, width: 23, margin: 20}}
                  />
                  <Text style={styles.drawItemtext}>Feedback</Text>
                </View>
              )}

              <Pressable onPress={() => props.navigation.navigate('AboutUs')}>
                <View style={styles.drawerItemView}>
                  <Image
                    source={require('../assets/images/sidemenu/aboutus3.png')}
                    style={{height: 23, width: 23, margin: 20}}
                  />
                  <Text style={styles.drawItemtext}>About Us</Text>
                </View>
              </Pressable>
              {authData.userToken !== null ? (
                <Pressable onPress={() => dispatch(logOut())}>
                  <View style={styles.drawerItemView}>
                    <Image
                      source={require('../assets/images/sidemenu/logout.png')}
                      style={{height: 23, width: 23, margin: 20}}
                    />
                    <Text style={styles.drawItemtext}>Logout</Text>
                  </View>
                </Pressable>
              ) : (
                <View style={styles.drawerItemViewDisable}>
                  <Image
                    source={require('../assets/images/sidemenu/logout.png')}
                    style={{height: 23, width: 23, margin: 20}}
                  />
                  <Text style={styles.drawItemtext}>Logout</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: -4,
  },
  container: {
    alignItems: 'center',
  },
  UserImg: {
    height: 90,
    width: 90,
    borderRadius: 50,
    resizeMode: 'contain',
    marginTop: 60,
  },
  userText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'AvenirLTStd-Book',
    marginTop: 20,
  },
  drawerItemView: {
    width: '90%',
    borderBottomWidth: 1,
    alignSelf: 'center',
    height: 70,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#52434D',
  },
  drawItemtext: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'AvenirLTStd-Book',
  },
  drawerItemViewDisable: {
    width: '90%',
    borderBottomWidth: 1,
    alignSelf: 'center',
    height: 70,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#52434D',
    opacity: 0.2,
  },
});
