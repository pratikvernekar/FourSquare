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
import {
  addFavourite,
  addRating,
  getFavouriteId,
  getParticularPlace,
} from '../services/Places';
import {useDispatch, useSelector} from 'react-redux';
import {getVerifiedKeys} from '../Function';
import Share from 'react-native-share';
import {setFavourite, setRatings, setSkip} from '../redux/AuthSlice';

const IndividualRestaurant = ({navigation, route}) => {
  const userData = useSelector(state => state.auth);
  const [particularPlace, setParticularPlace] = useState({});
  const [modal, setModal] = useState(false);
  const [fav, setFav] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const dispatch = useDispatch();
  const [rate, setRate] = useState(0);
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
    setTimeout(async () => {
      const key = await getVerifiedKeys(userData.userToken);
      const response = await getFavouriteId(key);
      dispatch(setFavourite(response));
    }, 500);
  }, [userData.skip]);

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
  }, [userData.skip, userData.ratings]);

  const addRate = async () => {
    const key = await getVerifiedKeys(userData.userToken);
    var response = await addRating(route.params.id, rate, key);
    dispatch(setRatings(userData.ratings));
    Toast.show(response.message);
    setTimeout(() => {
      setModal(false);
    }, 1500);
  };

  const addFav = async () => {
    try {
      const key = await getVerifiedKeys(userData.userToken);
      const response = await addFavourite(route.params.id, key);
      dispatch(setSkip(userData.skip));
      Toast.show(response.message);
    } catch (error) {
      console.log('eee');
    }
  };
  
  const share = async () => {
    shareOptions = {
      url: 'https' + particularPlace?.placeImage?.substring(4),
      message: `Place Name:${particularPlace?.placeName}${'\n'}Address:${
        particularPlace?.address
      }${'\n'}City:${particularPlace?.city}${'\n'}Phone No:${
        particularPlace?.placePhone
      }${'\n'}Rating:${particularPlace?.rating}${'\n'}`,
    };
    try {
      const shareResponse = await Share.open(shareOptions);
      Toast.show('Shared Successfully');
    } catch (error) {
      console.log('error while sharing');
    }
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
        {JSON.stringify(particularPlace) !== '{}' ? (
          <ImageBackground
            style={[styles.imageBackground, {height: imgHeight}]}
            source={{uri: 'https' + particularPlace?.placeImage?.substring(4)}}>
            <View style={styles.header}>
              <TouchableOpacity onPressOut={() => navigation.goBack()}>
                <Image
                  style={{height: 22, width: 22}}
                  source={require('../assets/images/back_icon.png')}
                />
              </TouchableOpacity>

              <Text style={styles.headetText}>
                {particularPlace?.placeName}
              </Text>
              <View style={styles.shareFavView}>
                <TouchableOpacity onPress={share}>
                  <Image
                    style={{height: 22, width: 22}}
                    source={require('../assets/images/share_icon.png')}
                  />
                </TouchableOpacity>

                {userData.userToken !== null ? (
                  userData.favourite.favouritePlaces?.length > 0 ? (
                    userData.favourite.favouritePlaces.filter(
                      e => e.placeId === route.params.id,
                    ).length > 0 ? (
                      <TouchableOpacity onPress={addFav}>
                        <Image
                          style={{height: 22, width: 22, resizeMode: 'contain'}}
                          source={require('../assets/images/favourite_icon_selected.png')}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={addFav}>
                        <Image
                          style={{height: 22, width: 22, resizeMode: 'contain'}}
                          source={require('../assets/images/favourite_icon.png')}
                        />
                      </TouchableOpacity>
                    )
                  ) : (
                    <TouchableOpacity onPress={addFav}>
                      <Image
                        style={{height: 22, width: 22, resizeMode: 'contain'}}
                        source={require('../assets/images/favourite_icon.png')}
                      />
                    </TouchableOpacity>
                  )
                ) : (
                  <TouchableOpacity onPress={() => Toast.show('Login First')}>
                    <Image
                      style={{height: 22, width: 22, resizeMode: 'contain'}}
                      source={require('../assets/images/favourite_icon.png')}
                    />
                  </TouchableOpacity>
                )}
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
                size={17}
                isDisabled={true}
                showRating={false}
              />
            </View>
          </ImageBackground>
        ) : null}

        <View style={styles.ratingPhotosView}>
          <View>
            <Pressable
              onPress={() => {
                if (userData.userToken !== null) {
                  setModal(true);
                } else {
                  Toast.show('Please Login');
                }
              }}>
              <Image
                style={{height: 50, width: 50}}
                source={require('../assets/images/rating_icon.png')}
              />
              <Text style={styles.ratingText}> Rating</Text>
            </Pressable>
          </View>
          <View>
            <Pressable
              onPress={() =>
                navigation.navigate(
                  'Photos',
                  (obj = {
                    id: route.params.id,
                    name: particularPlace?.placeName,
                  }),
                )
              }>
              <Image
                style={{height: 50, width: 50}}
                source={require('../assets/images/photos_icon.png')}
              />
            </Pressable>

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
               // customMapStyle={mapStyle}
                initialRegion={{
                  latitude: particularPlace.location?.coordinates[1],
                  longitude: particularPlace.location?.coordinates[0],
                  latitudeDelta: 0.04,
                  longitudeDelta: 0.05,
                }}>
                {}
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
                locations={[0.3, 0.6]}
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
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={styles.modalContainer}>
                <Pressable
                  onPress={() => setModal(false)}
                  style={styles.cancelView}>
                  <View>
                    <Image
                      style={{
                        height: 12,
                        width: 12,
                      }}
                      source={require('../assets/images/close_icon_grey_xxxhdpi.png')}
                    />
                  </View>
                </Pressable>

                <Text
                  style={{
                    color: 'black',
                    fontWeight: '600',
                    fontSize: 20,
                    fontFamily: 'AvenirLTStd-Book',
                    marginTop: 50,
                  }}>
                  Overall rating
                </Text>
                <Text
                  style={{
                    color: '#36b000',
                    fontWeight: '800',
                    fontSize: 24,
                    fontFamily: 'AvenirLTStd-Book',
                    marginTop: 20,
                  }}>
                  {particularPlace?.rating?.toFixed(1)}
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
                <View style={{marginTop: Platform.OS === 'ios' ? 30 : 20}}>
                  <AirbnbRating
                    count={5}
                    defaultRating={particularPlace.rating}
                    size={20}
                    isDisabled={false}
                    showRating={false}
                    onFinishRating={rate => setRate(rate)}
                  />
                </View>
                <Pressable
                  onPress={addRate}
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
      <Pressable
        onPress={() => {
          if (userData.userToken !== null) {
            navigation.navigate('AddReview', route.params.id);
          } else {
            Toast.show('Please Login');
          }

          
        }}
        style={{width: '100%'}}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Add Review</Text>
        </View>
      </Pressable>
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
  imageBackground: {
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
   // left: 0,
    right: 0,
    bottom: 0,
    width:'70%'
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
    marginTop: 50,
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
    height: 370,

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
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#523735',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#c9b2a6',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#dcd2be',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ae9e90',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#93817c',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a5b076',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#447530',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#fdfcf8',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f8c967',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#e9bc62',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e98d58',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#db8555',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#806b63',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8f7d77',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#b9d3c2',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#92998d',
      },
    ],
  },
];
