import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  Platform,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import React, {useEffect, useRef, useState} from 'react';
import {SearchInput} from '../components/TextInputs/textInputs';
import {useSelector} from 'react-redux';
import {getNearCity, searchPlaceWithOutFilter} from '../services/Places';
import {Flatlists1, NearByPlaces} from '../components/Flatlists';
import Buttons, {Button1} from '../components/Buttons/Buttons';

const SearchScreen = ({navigation}) => {
  const [text, setText] = useState('');
  const mapRef = useRef(null);
  const authData = useSelector(state => state.auth);
  const [neatCity, setNearCity] = useState([]);
  const [nearBy, setNearBy] = useState(false);
  const [nearMe, setNearMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchedPlacesVisible, setSearchedPlacesVisible] = useState(false);
  const [searchedPlaces, setSearchedPlaces] = useState([]);
  const [mapView, setMapView] = useState(false);
  useEffect(() => {
    setTimeout(async () => {
      setLoading(true);
      const response = await getNearCity(authData.latitude, authData.longitude);
      setNearCity(response);
      setLoading(false);
    }, 500);
  }, []);

  const {height, width} = useWindowDimensions();
  const width1 =
    width > height
      ? Platform.OS === 'ios'
        ? '82%'
        : '82%'
      : Platform.OS === 'ios'
      ? '66%'
      : '66%';
  const width2 =
    width > height
      ? Platform.OS === 'ios'
        ? 741
        : 776
      : Platform.OS === 'ios'
      ? 382
      : 377;
  // console.log(authData);
  const renderItem = ({item}) => {
    return (
      <Pressable
        //style={{borderWidth:1}}
        onPress={() =>
          navigation.navigate(
            'IndividualRestaurant',
            (obj = {
              id: item._id,
              distance: (item.distance.calculated / 1609).toFixed(2),
            }),
          )
        }>
        <View style={[styles.searchMainView, {width: width2}]}>
          <Image
            style={{height: '100%', width: 130}}
            source={{uri: 'https' + item.placeImage.substring(4)}}
          />

          <View style={{flexDirection: 'column', width: width1}}>
            <View style={styles.searchTextContainer}>
              <Text style={styles.text1}>{item.placeName}</Text>
              <Image
                style={{height: 20, width: 20}}
                source={require('../assets/images/favourite_iconcopy.png')}
              />
            </View>
            <View style={styles.batch}>
              <Text style={{color: 'white'}}>{item.rating * 2}</Text>
            </View>
            <Text style={styles.text2}>
              Indian •{' '}
              {item.priceRange > 750
                ? '₹₹₹₹'
                : item.priceRange > 500
                ? '₹₹₹'
                : item.priceRange > 250
                ? '₹₹'
                : '₹'}{' '}
              {(item.distance.calculated / 1609).toFixed(2)} Km
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text3}>
                {item.address.length > 25
                  ? item.address.substring(0, 35) + '...'
                  : item.address}
                ,{item.city}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/images/back_icon.png')}
              style={styles.imgBack}
            />
          </Pressable>
          <View style={{width: '70%', alignItems: 'center'}}>
            <SearchInput
              value={text}
              placeholder="Search"
              placeholderTextColor="grey"
              source={require('../assets/images/serch_xxxhdpi.png')}
              onChangeText={async txt => {
                setText(txt);
                if (txt.length > 0) {
                  //   setNearMe(false);
                  setNearBy(false);
                  try {
                    const response = await searchPlaceWithOutFilter(
                      authData.latitude,
                      authData.longitude,
                      text,
                    );
                    console.log(txt.length);
                    setSearchedPlaces(response);
                    if (mapView === false) {
                      setSearchedPlacesVisible(true);
                    } else {
                      setSearchedPlacesVisible(false);
                    }
                  } catch (error) {
                    console.log('error in searchPlaceWithOutFilter');
                  }
                }
                if (txt.length === 0) {
                  console.log('else', txt.length);
                  setSearchedPlacesVisible(false);
                  setNearBy(true);
                  setNearMe(false);
                  setMapView(false);
                }
              }}
              onFocus={txt => {
                setSearchedPlacesVisible(false);
                setNearBy(true);
                setNearMe(false);
                if (txt.length === 0) {
                  setSearchedPlacesVisible(false);
                }
              }}
            />
            <SearchInput
              placeholder="Near me"
              placeholderTextColor="grey"
              source={require('../assets/images/near_me_xxxhdpi.png')}
              onChangeText={text => {}}
              onFocus={() => {
                setNearBy(false);
                setNearMe(true);
                setSearchedPlacesVisible(false);
                setMapView(false);
              }}
            />
          </View>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/images/filter_icon.png')}
              style={styles.imgFilter}
            />
          </Pressable>
        </View>
      </View>

      {/* <View style={styles.container}> */}
      {nearBy ? (
        <ScrollView>
          <View>
            <Text style={styles.nearYouText}>Near by places</Text>
            <View>
              {loading ? (
                <ActivityIndicator color={'#370f24'} size="large" />
              ) : (
                <NearByPlaces data={neatCity} />
              )}
            </View>

            <Text style={styles.nearYouText}>Suggessions</Text>
            <View style={styles.suggesstionsView}>
              <Text style={styles.suggesstionsText}>Top Pick</Text>
            </View>
            <View style={styles.suggesstionsView}>
              <Text style={styles.suggesstionsText}>Popular</Text>
            </View>
            <View style={styles.suggesstionsView}>
              <Text style={styles.suggesstionsText}>Lunch</Text>
            </View>
            <View style={styles.suggesstionsView}>
              <Text style={styles.suggesstionsText}>Coffee</Text>
            </View>
          </View>
        </ScrollView>
      ) : null}

      {nearMe ? (
        <>
          <ScrollView>
            <View style={styles.nearMeView}>
              <Image
                source={require('../assets/images/location_icon.png')}
                style={styles.imgFilter}
              />
              <Text style={styles.nearMeText}>Use my current location</Text>
            </View>
            <View style={styles.nearMeView}>
              <Image
                source={require('../assets/images/map_icon.png')}
                style={styles.imgFilter}
              />
              <Text style={styles.nearMeText}>Select Search area from map</Text>
            </View>
          </ScrollView>
        </>
      ) : null}
      {/* </View> */}

      {searchedPlacesVisible ? (
        searchedPlaces?.length > 0 ? (
          <View
            style={{backgroundColor: '#f2f1f1', borderWidth: 0, height: '86%'}}>
            <Flatlists1 data={searchedPlaces} navigation={navigation} />
            <Button1
              title="Map View"
              onPress={() => {
                setMapView(true);
                setSearchedPlaces(false);
                // try {
                //   setTimeout(() => {
                //     mapRef.current.animateToRegion(
                //       {
                //         latitude: authData.latitude,
                //         longitude: authData.longitude,
                //         latitudeDelta: 0.1,
                //         longitudeDelta: 0.1,
                //       },
                //       3 * 1000,
                //     );
                //     setMapView(true);
                //   }, 500);
                // } catch (er) {
                //   console.log('hello');
                // }
              }}
            />
          </View>
        ) : null
      ) : null}
      {mapView && searchedPlaces?.length > 0 ? (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.mapStyle}
            customMapStyle={mapStyle}
            initialRegion={{
              latitude: authData.latitude,
              longitude: authData.longitude,
              latitudeDelta: 0.7,
              longitudeDelta: 0.7,
            }}
            ref={mapRef}>
            {searchedPlaces.map(ele => {
              return (
                <Marker
                  key={ele._id}
                  draggable
                  coordinate={{
                    latitude: ele?.location?.coordinates[1],
                    longitude: ele?.location?.coordinates[0],
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                  }}
                  onDragEnd={e =>
                    alert(JSON.stringify(e.nativeEvent.coordinate))
                  }
                  title={ele.placeName}
                />
              );
            })}
          </MapView>
          <View
            style={{
              height: 150,
              width: '100%',
              // position: 'absolute',bottom:510,
            }}>
            <FlatList
              keyExtractor={item => item._id}
              pagingEnabled
              data={searchedPlaces}
              renderItem={renderItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
            {/* <Flatlists1
              data={searchedPlaces}
              navigation={navigation}
              horizontal={true}
            /> */}
          </View>

          <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
            <Button1
              title="List View"
              onPress={() => {
                setSearchedPlaces(true);
                setMapView(false);
              }}
            />
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 110,
    backgroundColor: '#370f24',
    paddingHorizontal: 17,
    justifyContent: 'center',
  },
  imgBack: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    marginTop: 3,
  },
  headerText: {
    fontSize: 21,
    color: 'white',
    fontFamily: 'AvenirLTStd-Book',
    fontWeight: '600',
  },
  imgFilter: {
    resizeMode: 'contain',
    width: 28,
    height: 28,
    marginTop: 3,
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  nearYouText: {
    color: '#858585',
    fontFamily: 'AvenirLTStd-Book',
    fontSize: 18,
    alignSelf: 'center',
    width: '90%',
    marginVertical: 15,
  },
  suggesstionsView: {
    width: '100%',
    height: 70,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    justifyContent: 'center',
  },
  suggesstionsText: {
    color: '#000000',
    fontFamily: 'AvenirLTStd-Book',
    fontSize: 18,
    alignSelf: 'center',
    width: '90%',
  },
  nearMeView: {
    color: '#000000',
    fontFamily: 'AvenirLTStd-Book',
    fontSize: 18,
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 87,
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderBottomColor: '#d4d4d4',
  },
  nearMeText: {
    width: '60%',
    textAlign: 'left',
    lineHeight: 26,
    color: 'black',
    fontSize: 18,
    fontFamily: 'AvenirLTStd-Book',
    marginLeft: 30,
  },
  mapContainer: {
    flex: 1,
  },
  mapStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },
  searchMainView: {
    backgroundColor: 'white',
    marginTop: 7,
    height: 130,
    flexDirection: 'row',
    marginHorizontal: Platform.OS == 'ios' ? 4 : 3.5,
    // alignSelf: 'center',
  },
  searchTextContainer: {
    flexDirection: 'row',

    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  batch: {
    height: 24,
    width: 24,
    backgroundColor: '#73cf42',
    marginTop: Platform.OS === 'ios' ? 10 : 5,
    borderRadius: 6,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text2: {
    color: '#7C7C7C',
    fontSize: 16,
    fontFamily: 'AvenirLTStd-Book',
    marginTop: 6,
    marginLeft: 10,
  },
  text3: {
    color: '#7C7C7C',
    fontSize: 16,
    fontFamily: 'AvenirLTStd-Book',
    paddingLeft: 10,
    width: '100%',
  },
  text1: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'AvenirLTStd-Book',
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
