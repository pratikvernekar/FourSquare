import {
  StyleSheet,
  Text,
  Vie,
  SafeAreaView,
  View,
  ScrollView,
  useWindowDimensions,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Flatlists from '../components/Flatlists';

const NearyouScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const mapHeight =
    width > height
      ? Platform.OS === 'ios'
        ? 100
        : 100
      : Platform.OS === 'ios'
      ? 200
      : 200;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E5E5E5'}}>
      
      <View style={[styles.mapView]}>
        <View style={[styles.container, {height: mapHeight}]}>
          <MapView
            style={styles.mapStyle}
            initialRegion={{
              latitude: 13.3409,
              longitude: 74.7421,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            customMapStyle={mapStyle}>
            <Marker
              draggable
              coordinate={{
                latitude: 13.3409,
                longitude: 74.7421,
              }}
              onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
              title={'Test Marker'}
              description={'This is a description of the marker'}
            />
          </MapView>
        </View>
      </View>
      <View style={{flex: 1}}>
        <Flatlists  navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
};

export default NearyouScreen;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    //height:300,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.9,
    elevation: 10,
    // backgroundColor: 'blue',
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
