import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Toast from 'react-native-simple-toast';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {logOut, setUserName} from '../redux/AuthSlice';
import {addProfileImage, getProfile} from '../services/UserAuth';
import {getVerifiedKeys} from '../Function';
import ImagePicker from 'react-native-image-crop-picker';

const CustomDrawer = props => {
  const authData = useSelector(state => state.auth);
  const [userData, setUserData] = useState({});
  const [img, setImg] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (authData.userToken !== null) {
      setTimeout(async () => {
        setLoading(true);
        const key = await getVerifiedKeys(authData.userToken);
        const response = await getProfile(key);
        // console.log(response);
        setUserData(response);
        dispatch(setUserName(response.userName));
        setLoading(false);
      }, 500);
    }


    
  }, [img]);
  const selectImg = async () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    })
      .then(async image => {
        const payload = new FormData();
        payload.append('image', {
          uri: image.path,
          type: image.mime,
          name: `${image.filename}.${image.mime.substring(
            image.mime.indexOf('/') + 1,
          )}`,
        });
        let cred = await getVerifiedKeys(authData.userToken);
        await addProfileImage(payload, cred);
        setImg(!img);
      })
      .catch(er => console.log('User cancelled selection'));
  };

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
              {authData.userToken !== null &&
              JSON.stringify(userData) !== '{}' ? (
                loading ? (
                  <View style={{marginTop: 130}}>
                    <ActivityIndicator color={'white'} size={40} />
                  </View>
                ) : (
                  <TouchableOpacity onPress={selectImg}>
                    <Image
                      source={{uri: 'https' + userData?.userImage.substring(4)}}
                      style={styles.UserImg}
                    />
                  </TouchableOpacity>
                )
              ) : (
                <Image
                  source={require('..//assets/images/sidemenu/profile_icon.png')}
                  style={styles.UserImg}
                />
              )}

              {authData.userToken !== null ? (
                <Text style={styles.userText}>{userData?.userName}</Text>
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
                <Pressable
                  onPress={() => {
                    Toast.show('Logged Out');
                    dispatch(logOut());
                  }}>
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
    height: 110,
    width: 110,
    borderRadius: 60,
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
