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
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import {Rating, AirbnbRating} from 'react-native-ratings';

const IndividualRestaurant = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const imgHeight =
    width > height
      ? Platform.OS === 'ios'
        ? 130
        : 130
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
  return (
    <SafeAreaView style={styles.main}>
      <ImageBackground
        style={[styles.ImageBackground, {height: imgHeight}]}
        source={require('../assets/images/background.png')}>
        <View style={styles.header}>
          <TouchableOpacity onPressOut={()=>navigation.goBack()}>
            <Image
              style={{height: 22, width: 22}}
              source={require('../assets/images/back_icon.png')}
            />
          </TouchableOpacity>

          <Text style={styles.headetText}>Attil</Text>
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
          <Text style={styles.restroText}>
            IndividualRestaurant,IndividualRestaurant,IndividualRestaurant
          </Text>
        </View>
        <View style={styles.starView}>
          <AirbnbRating
            count={5}
            defaultRating={3}
            size={14}
            isDisabled={true}
            showRating={false}
          />
        </View>
      </ImageBackground>
      <ScrollView style={{flex: 1, width: '100%'}}>
        <View style={styles.ratingPhotosView}>
          <View>
            <Image
              style={{height: 50, width: 50}}
              source={require('../assets/images/rating_icon.png')}
            />
            <Text style={styles.ratingText}> Rating</Text>
          </View>
          <View>
            <Image
              style={{height: 50, width: 50}}
              source={require('../assets/images/photos_icon.png')}
            />
            <Text style={styles.ratingText}>Photos</Text>
          </View>
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
        </View>
        <View style={styles.overView}>
          <Text style={styles.overViewText}>OverView</Text>
        </View>
        <View style={styles.textContainerView}>
          <ScrollView>
            <Text style={styles.containerText}>
              Internal state is not preserved when content scrolls out of the
              render window. Make sure all your data is captured in the item
              data or external stores like Flux, Redux, or Relay. This is a
              PureComponent which means that it will not re-render if props
              remain shallow-equal. Make sure that everything your renderItem
              function depends on is passed as a prop (e.g. extraData) that is
              not === after updates, otherwise your UI may not update on
              changes. This includes the data prop and parent component state.
              In order to constrain memory and enable smooth scrolling, content
              is rendered asynchronously offscreen. This means it's possible to
              scroll faster than the fill rate and momentarily see blank
              content. This is a tradeoff that can be adjusted to suit the needs
              of each application, and we are working on improving it behind the
              scenes. By default, the list looks for a key prop on each item and
              uses that for the React key. Alternatively, you can provide a
              custom keyExtractor prop.
            </Text>
          </ScrollView>
        </View>

        <View style={[styles.mapView, {width: mapwidth}]}>
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
    paddingBottom: 1,
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
    height: Platform.OS === 'ios' ? 180 : 196.4,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.9,
    elevation: 10,
    alignSelf: 'center',
  },

  btn: {
    width: '100%',

    height: 64,
    backgroundColor: '#351247',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
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
