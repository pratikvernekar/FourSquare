import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';

const Flatlists1 = ({navigation, data}) => {
  const {height, width} = useWindowDimensions();
  const width1 =
    width > height
      ? Platform.OS === 'ios'
        ? '82%'
        : '82%'
      : Platform.OS === 'ios'
      ? '66%'
      : '66%';
  const renderItem = ({item}) => (
    <TouchableOpacity
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
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

const ReviewList = ({data}) => {
  console.log(data);
  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => console.log('d')}>
      <View style={styles.mainReview} >
        <Image
          style={{
            height: 40,
            width: 40,
            borderRadius: 50,
            marginTop: 15,
            marginLeft: 18,
          }}
          source={{uri: item.reviewerImage}}
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
            <Text style={styles.text1}>{item.reviewBy}</Text>
            <Text style={styles.text2}>{item.reviewDate.substring(0, 10)}</Text>
          </View>

          <Text style={styles.text3}>{item.review}</Text>
          {/* <Text style={styles.text3}>{item.reviewBy}</Text> */}
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

export {Flatlists1, ReviewList};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    marginTop: 7,
    height: 130,
    flexDirection: 'row',
    width: '98%',
    alignSelf: 'center',
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
  mainReview: {
    backgroundColor: 'white',
    height: 90,
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: '#B8B8B8',
  },
});
