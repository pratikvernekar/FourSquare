import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  Platform,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Modal,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import {AirbnbRating} from 'react-native-ratings';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-simple-toast';
import {getParticularPlace} from '../services/Places';

const IndividualRestaurant = ({navigation, route}) => {
  const [particularPlace, setParticularPlace] = useState({});
  const [modal, setModal] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const mapRef = useRef(null);
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const {height, width} = useWindowDimensions();
  const imgHeight =
    width > height
      ? Platform.OS === 'ios'
        ? 250
        : 250
      : Platform.OS === 'ios'
      ? 250
      : 250;
  const mapwidth =
    width > height
      ? Platform.OS === 'ios'
        ? 600
        : 600
      : Platform.OS === 'ios'
      ? '100%'
      : '100%';
  useEffect(() => {
    const getOneTimeLocation = () => {
      setLoadingScreen(true);
      setTimeout(async () => {
        try {
          const response = await getParticularPlace(route.params.id);
          setParticularPlace(response);
          setLoadingScreen(false);
        } catch (error) {
          Toast.show('Network Error');
        }
      }, 500);
      error => {
        console.log(error.message);
      };
    };
    getOneTimeLocation();
  }, []);

  const rate = () => {
    // console.log('jj');
    setModal(true);
  };
  if (loadingScreen) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="#351247" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView
        style={{flex: 1, width: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={[styles.ImageBackground, {height: imgHeight}]}
          source={{uri: 'https' + particularPlace?.placeImage?.substring(4)}}>
          <View style={styles.header}>
            <TouchableOpacity onPressOut={() => navigation.goBack()}>
              <Image
                style={{height: 22, width: 22}}
                source={require('../assets/images/back_icon.png')}
              />
            </TouchableOpacity>

            <Text style={styles.headetText}>{particularPlace?.placeName}</Text>
            <View style={styles.shareFavView}>
              <Image
                style={{height: 22, width: 22}}
                source={require('../assets/images/share_icon.png')}
              />
              <Image
                style={{height: 22, width: 22, resizeMode: 'contain'}}
                source={require('../assets/images/favourite_icon.png')}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 140,
              width: '85%',
              alignSelf: 'center',
            }}>
            <Text style={styles.restroText}>{particularPlace?.category}</Text>
          </View>
          <View style={[styles.starView]}>
            <AirbnbRating
              count={5}
              defaultRating={particularPlace?.rating}
              size={14}
              isDisabled={true}
              showRating={false}
            />
          </View>
        </ImageBackground>

        <View style={styles.ratingPhotosView}>
          <View>
            <Pressable onPress={rate}>
              <Image
                style={{height: 50, width: 50}}
                source={require('../assets/images/rating_icon.png')}
              />
              <Text style={styles.ratingText}> Rating</Text>
            </Pressable>
          </View>
          <View>
            <Image
              style={{height: 50, width: 50}}
              source={require('../assets/images/photos_icon.png')}
            />
            <Text style={styles.ratingText}>Photos</Text>
          </View>
          <Pressable
            onPress={() =>
              navigation.navigate('Review', {
                id: route.params.id,
                placeName: particularPlace?.placeName,
              })
            }>
            <View>
              <Image
                style={{
                  height: 50,
                  width: 50,
                }}
                source={require('../assets/images/review_icon.png')}
              />
              <Text style={styles.ratingText}>Review</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.overView}>
          <Text style={styles.overViewText}>OverView</Text>
        </View>
        <View style={styles.textContainerView}>
          <ScrollView>
            <Text style={styles.containerText}>
              {particularPlace?.overview}
            </Text>
          </ScrollView>
        </View>
        <View style={[styles.mapView, {width: mapwidth}]}>
          {particularPlace?.location?.coordinates[0] &&
          particularPlace?.location?.coordinates[1] !== '' ? (
            <>
              <MapView
                style={styles.mapStyle}
                customMapStyle={mapStyle}
                initialRegion={{
                  latitude: particularPlace.location?.coordinates[1],
                  longitude: particularPlace.location?.coordinates[0],
                  latitudeDelta: 0.04,
                  longitudeDelta: 0.05,
                }}>
                <Marker
                  draggable
                  coordinate={{
                    latitude: particularPlace.location?.coordinates[1],
                    longitude: particularPlace.location?.coordinates[0],
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.05,
                  }}
                  onDragEnd={e =>
                    alert(JSON.stringify(e.nativeEvent.coordinate))
                  }
                  title={'Test Marker'}
                />
              </MapView>
              <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                locations={[0.1, 0.5]}
                colors={['rgba(249, 245, 238 ,1)', 'rgba(249, 245, 238,0)']}
                style={{
                  height: Platform.OS === 'ios' ? 170 : 180,
                  justifyContent: 'center',
                }}>
                <Text style={styles.mapText}>{particularPlace?.city}</Text>
                <Text style={styles.mapText}>
                  +91 {particularPlace?.placePhone}
                </Text>
                <Text style={styles.mapText}>
                  Drive: {route.params.distance} Km
                </Text>
              </LinearGradient>
            </>
          ) : null}
        </View>
        <Modal visible={modal} animationType="fade" transparent={true}>
          <View style={{flex: 1, backgroundColor: '#7A7A7A7C'}}>
            <SafeAreaView
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.modalContainer}>
                <View style={styles.cancelView}>
                  <Pressable onPress={() => setModal(false)}>
                    <Image
                      style={{
                        height: 12,
                        width: 12,
                      }}
                      source={require('../assets/images/close_icon_grey_xxxhdpi.png')}
                    />
                  </Pressable>
                </View>

                <Text
                  style={{
                    color: 'black',
                    fontWeight: '600',
                    fontSize: 20,
                    fontFamily: 'AvenirLTStd-Book',
                    marginTop: 40,
                  }}>
                  Overall rating
                </Text>
                <Text
                  style={{
                    color: '#36b000',
                    fontWeight: '800',
                    fontSize: 24,
                    fontFamily: 'AvenirLTStd-Book',
                    marginTop: 10,
                  }}>
                  4.5
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: '600',
                    fontSize: 20,
                    fontFamily: 'AvenirLTStd-Book',
                    marginTop: 50,

                    textAlign: 'center',
                  }}>
                  How would you rate your experience?
                </Text>
                <View style={{marginTop: Platform.OS === 'ios' ? 20 : 10}}>
                  <AirbnbRating
                    count={5}
                    defaultRating={3}
                    size={20}
                    isDisabled={true}
                    showRating={false}
                  />
                </View>
                <Pressable
                  onPress={() => setModal(false)}
                  style={{width: '100%', position: 'relative'}}>
                  <View style={styles.btnSubmit}>
                    <Text style={styles.btnTextSumit}>Submit</Text>
                  </View>
                </Pressable>
              </View>
            </SafeAreaView>
          </View>
        </Modal>
      </ScrollView>
      <View style={styles.btn}>
        <Pressable>
          <Text style={styles.btnText}>Add Review</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default IndividualRestaurant;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  ImageBackground: {
    width: '100%',
    height: 250,
  },
  header: {
    marginTop: 20,

    flexDirection: 'row',
    paddingHorizontal: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headetText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'AvenirLTStd-Book',
    marginLeft: 40,
  },
  shareFavView: {
    flexDirection: 'row',
    width: '18%',

    justifyContent: 'space-between',
  },
  ratingPhotosView: {
    borderBottomWidth: 0.7,
    borderBottomColor: '#8d8d8d',
    width: '90%',
    height: 100,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  ratingText: {
    color: '#8d8d8d',
    fontSize: 14,
    fontFamily: 'AvenirLTStd-Book',
    marginTop: 10,
  },
  overView: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 17,
  },
  overViewText: {
    color: '#351247',
    fontSize: 18,
    fontFamily: 'AvenirLTStd-Book',
    lineHeight: 18,
  },
  textContainerView: {
    width: '90%',
    height: 120,
    marginTop: 17,
    alignSelf: 'center',
    paddingBottom: 3,
  },
  containerText: {
    color: '#8d8d8d',
    fontSize: 16,
    fontFamily: 'AvenirLTStd-Book',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapView: {
    backgroundColor: 'white',
    height: Platform.OS === 'ios' ? 170 : 180,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.9,
    elevation: 10,
    alignSelf: 'center',
    marginTop: 16.4,
    justifyContent: 'center',
    position: 'relative',
  },

  btn: {
    width: '100%',
    height: 64,
    backgroundColor: '#351247',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSubmit: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#c7c7c7',
    marginTop: 16,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'AvenirLTStd-Book',
  },
  btnTextSumit: {
    color: '#351247',
    fontSize: 20,
    fontFamily: 'AvenirLTStd-Book',
  },
  restroText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'AvenirLTStd-Book',
    textAlign: 'center',
  },
  starView: {
    marginVertical: Platform.OS === 'ios' ? 5 : 3,
  },
  mapText: {
    color: '#000000',
    fontSize: 15,
    marginLeft: 20,
    marginVertical: 8,
    fontFamily: 'AvenirLTStd-Book',
  },
  modalContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 1,
    width: '80%',
    height: 300,

    borderColor: '#c7c7c7',
    position: 'relative',
  },
  cancelView: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: 'white',
    borderRadius: 15,
    height: 25,
    width: 25,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'grey',
  },
});

const mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];
