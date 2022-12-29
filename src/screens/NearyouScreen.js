import {
  StyleSheet,
  Text,
  Vie,
  SafeAreaView,
  View,
  ScrollView,
  useWindowDimensions,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-simple-toast';

import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Flatlists1} from '../components/Flatlists';
import {getNearPlaces} from '../services/Places';
import {useDispatch, useSelector} from 'react-redux';
import {setLatLong} from '../redux/AuthSlice';

const NearyouScreen = ({navigation}) => {
  const userData = useSelector(state => state.auth);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const [nearPlaces, setNearPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingFav, setLoadingfav] = useState(false);
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const {height, width} = useWindowDimensions();
  const mapHeight =
    width > height
      ? Platform.OS === 'ios'
        ? 100
        : 100
      : Platform.OS === 'ios'
      ? 200
      : 200;
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
          } else {
            Toast.show('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
  }, [userData.skip, userData.ratings]);

  const getOneTimeLocation = () => {
    setLoading(true);
    setLoadingList(true);
    Geolocation.getCurrentPosition(
      position => {
        setTimeout(async () => {
          try {
            mapRef.current.animateToRegion(
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.2,
              },
              3 * 1000,
            );

            setLoading(false);
            const response = await getNearPlaces(
              position.coords.latitude,
              position.coords.longitude,
            );
            setNearPlaces(response);
            setLoadingList(false);
          } catch (error) {
            setLoading(false);
            setLoadingList(false);
            Toast.show('Failed to animate direction');
          }
        }, 1000);

        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        const obj = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
        dispatch(setLatLong(obj));
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },

      error => {
        Toast.show(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E5E5E5'}}>
      <View style={[styles.mapView, {height: mapHeight}]}>
        <View style={[styles.container, {height: mapHeight}]}>
          {loading ? <ActivityIndicator size={25} /> : null}
          {currentLatitude && currentLongitude !== '' ? (
            <MapView
              style={styles.mapStyle}
             // customMapStyle={mapStyle}
              ref={mapRef}>
              <Marker
                draggable
                coordinate={{
                  latitude: currentLatitude,
                  longitude: currentLongitude,
                  latitudeDelta: 0.53,
                  longitudeDelta: 0.01,
                }}
                onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
                title={'Test Marker'}
              />
            </MapView>
          ) : null}
        </View>
      </View>
      {loadingList ? (
        <View
          style={{
            marginTop: 10,
            height: 30,

            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#351247" />
        </View>
      ) : null}
      {nearPlaces?.length > 0 ? (
        <View style={{flex: 1}}>
          <Flatlists1
            navigation={navigation}
            data={nearPlaces}
            loadingFav={loadingFav}
            setLoadingfav={setLoadingfav}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default NearyouScreen;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',

    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.9,
    elevation: 10,
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
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.9,
    elevation: 10,
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
