import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect} from 'react';
import {addFavourite} from '../services/Places';
import {useDispatch, useSelector} from 'react-redux';
import {getVerifiedKeys} from '../Function';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {setSkip} from '../redux/AuthSlice';

const Flatlists1 = ({navigation, data, horizontal}) => {
  const userData = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  const width1 =
    width > height
      ? Platform.OS === 'ios'
        ? '82%'
        : '82%'
      : Platform.OS === 'ios'
      ? '66%'
      : '66%';
  //console.log(data);
  const addTofav = async id => {
    try {
      const key = await getVerifiedKeys(userData.userToken);

      const response = await addFavourite(id, key);
      dispatch(setSkip(userData.skip));
      Toast.show(response.message);
    } catch (error) {
      console.log('e');
    }
  };
  const renderItem = ({item}) => (
    <Pressable
      onPress={() =>
        navigation.navigate(
          'IndividualRestaurant',
          (obj = {
            id: item._id,
            distance: (item.distance.calculated / 1609).toFixed(2),
          }),
        )
      }>
      <View style={styles.main}>
        <View style={{width: 130, height: '100%'}}>
          <Image
            style={{height: '100%', width: 130}}
            source={{uri: 'https' + item.placeImage.substring(4)}}
          />
        </View>

        <View style={{flexDirection: 'column', width: width1}}>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>{item.placeName}</Text>
            {userData.userToken !== null ? (
              userData?.favourite?.favouritePlaces?.length > 0 ? (
                userData?.favourite?.favouritePlaces?.filter(
                  e => e.placeId === item._id,
                ).length > 0 ? (
                  <TouchableOpacity onPress={() => addTofav(item._id)}>
                    <Image
                      style={{height: 20, width: 20}}
                      source={require('../assets/images/favourite_icon_selected.png')}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => addTofav(item._id)}>
                    <Image
                      style={{height: 20, width: 20}}
                      source={require('../assets/images/favourite_iconcopy.png')}
                    />
                  </TouchableOpacity>
                )
              ) : (
                <TouchableOpacity onPress={() => addTofav(item._id)}>
                  <Image
                    style={{height: 20, width: 20}}
                    source={require('../assets/images/favourite_iconcopy.png')}
                  />
                </TouchableOpacity>
              )
            ) : (
              <TouchableOpacity onPress={() => Toast.show('LoginIn First')}>
                <Image
                  style={{height: 20, width: 20}}
                  source={require('../assets/images/favourite_iconcopy.png')}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.batch}>
            <Text style={{color: 'white'}}>{item.rating.toFixed(1) * 2}</Text>
          </View>
          <Text style={styles.text2}>
            Indian •{' '}
            {item.priceRange === 4
              ? '₹₹₹₹'
              : item.priceRange === 3
              ? '₹₹₹'
              : item.priceRange === 2
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
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal={horizontal}
    />
  );
};
const FavouriteList = ({navigation, data,}) => {
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  const h1 =
    width > height
      ? Platform.OS === 'ios'
        ? '80%'
        : '78%'
      : Platform.OS === 'ios'
      ? '100%'
      : '100%';
  const width1 =
    width > height
      ? Platform.OS === 'ios'
        ? '82%'
        : '82%'
      : Platform.OS === 'ios'
      ? '66%'
      : '66%';
  const userData = useSelector(state => state.auth);

  const renderItem = ({item}) => (
    <Pressable
      onPress={() =>
        navigation.navigate(
          'IndividualRestaurant',
          (obj = {
            id: item._id,
            distance: (item.distance.calculated / 1609).toFixed(2),
          }),
        )
      }>
      <View style={styles.main}>
        <View style={{width: 130, height: '100%'}}>
          <Image
            style={{height: '100%', width: 130}}
            source={{uri: 'https' + item.placeImage.substring(4)}}
          />
        </View>

        <View style={{flexDirection: 'column', width: width1}}>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>{item.placeName}</Text>
            <TouchableOpacity
              onPress={async () => {
                const key = await getVerifiedKeys(userData.userToken);
                const response = await addFavourite(item.placeId, key);
                dispatch(setSkip(userData.skip));
              }}>
              <Image
                style={{height: 16, width: 16}}
                source={require('../assets/images/close_icon_grey_xxxhdpi.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.batch}>
            <Text style={{color: 'white'}}>
              {item?.placeRating?.toFixed(1) * 2}
            </Text>
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
              {item.placeAddress.length > 25
                ? item.placeAddress.substring(0, 35) + '...'
                : item.placeAddress}
              ,{item.city}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
  return (
    <View style={{height: h1}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const ReviewList = ({data}) => {
  const userData = useSelector(state => state.auth);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => console.log('d')}>
      <View style={styles.mainReview}>
        <Image
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            marginTop: 15,
            marginLeft: 18,
          }}
          source={{uri: 'https' + item.reviewerImage.substring(4)}}
        />
        <View
          style={{
            borderWidth: 0,
            width: '86%',
            height: 80,
            alignSelf: 'center',
            paddingHorizontal: 10,
          }}>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>
              {item.reviewBy === userData.userData
                ? 'You'
                : item.reviewBy.length > 16
                ? item.reviewBy.substring(0, 13) + '...'
                : item.reviewBy}
            </Text>
            <Text style={styles.text2}>
              {moment(new Date(item.reviewDate.toString()))
                .format('MMMM DD,YYYY')
                .toString()}
            </Text>
          </View>

          <Text style={styles.text3}>{item.review}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.reviewerId}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

const NearByPlaces = ({data}) => {
  return (
    <View>
      {data.length > 0
        ? data.map(item => {
            return (
              <ScrollView key={item._id}>
                <TouchableOpacity onPress={() => console.log('d')}>
                  <View style={styles.mainReview}>
                    <Image
                      style={{
                        height: 60,
                        width: 60,

                        marginTop: 15,
                        marginLeft: 18,
                      }}
                      source={{uri: 'https' + item.image.substring(4)}}
                    />

                    <View style={styles.textContainer}>
                      <Text style={styles.text4}>{item.city}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            );
          })
        : null}
    </View>
  );
};

export {Flatlists1, ReviewList, NearByPlaces, FavouriteList};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    marginTop: 7,
    height: 130,
    flexDirection: 'row',
    width: '98%',
    alignSelf: 'center',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowRadius: 10,
    shadowOpacity: 0.9,
    elevation: 10,
  },
  textContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  text1: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'AvenirLTStd-Book',
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
  text4: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'AvenirLTStd-Book',
    paddingLeft: 10,
    width: '100%',
    marginTop: 25,

    height: 30,
  },
  mainReview: {
    backgroundColor: 'white',
    height: 90,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: '#d4d4d4',
  },
});
