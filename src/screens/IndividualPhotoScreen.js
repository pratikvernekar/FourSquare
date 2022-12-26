import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import moment from 'moment';
import Share from 'react-native-share';
import { useDispatch } from 'react-redux';

const IndividualPhotoScreen = ({navigation, route}) => {
  // console.log(route);
  const dispatch = useDispatch();

  const share = async () => {
    shareOptions = {
      url: 'https' + route.params.image.substring(4),
      message: `Image:`,
    };
    try {
      const shareResponse = await Share.open(shareOptions);
      Toast.show('Shared Successfully');
    } catch (error) {
      console.log('error while sharing');
    }
  };
  return (
    <SafeAreaView style={styles.main}>
      <ImageBackground
        style={{flex: 1}}
        source={{uri: 'https' + route.params.image.substring(4)}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/images/close_icon_xxxhdpi.png')}
              style={styles.imgMenu}
            />
          </TouchableOpacity>

          <Text style={styles.headerText}>Hotel Name</Text>

          <TouchableOpacity onPress={share}>
            <Image
              source={require('../assets/images/share_icon.png')}
              style={styles.imgSearch}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bottonView1}></View>
        <View style={styles.bottonView}>
          <View
            style={{
              borderRadius: 60,
              marginLeft: 40,
              alignItems: 'center',
              justifyContent: 'center',
              width: 70,
              height: 70,
              marginTop: 15,
            }}>
            <Image
              source={{uri: 'https' + route.params.rImage.substring(4)}}
              style={styles.userProfile}
            />
          </View>
          <View
            style={{
              marginLeft: 30,
              borderWidth: 0,
              borderColor: 'white',
              marginTop: 13,
            }}>
            <Text style={styles.bottomText1}>{route.params.rName}</Text>
            <Text style={styles.bottomText2}>
              Added{' '}
              {moment(new Date(route.params.rDate.toString()))
                .format('MMMM DD,YYYY')
                .toString()}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default IndividualPhotoScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
  },
  img: {
    resizeMode: 'contain',
    width: 130,
    height: 80,
    marginLeft: 40,
  },
  imgMenu: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },
  imgSearch: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'AvenirLTStd-Book',
    fontWeight: '600',
  },
  bottonView: {
    position: 'absolute',
    width: '100%',
    height: 110,
    bottom: 0,
    flexDirection: 'row',
  },
  bottonView1: {
    position: 'absolute',
    width: '100%',
    height: 110,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.3,
  },

  userProfile: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  bottomText1: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'AvenirLTStd-Book',
    fontWeight: '600',
  },
  bottomText2: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'AvenirLTStd-Book',
    fontWeight: '600',
  },
});
