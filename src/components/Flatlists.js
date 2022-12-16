import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e9d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d7',
    title: '4 Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-14557129d72',
    title: '5 Item',
  },
];
const Flatlists = ({navigation}) => {
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
      onPress={() => navigation.navigate('IndividualRestaurant')}>
      <View style={styles.main}>
        <View style={{width: 130, height: 129}}>
          <Image
            style={{height: 129, width: 130}}
            source={require('../assets/images/background.png')}
          />
        </View>

        <View style={{flexDirection: 'column', width: width1}}>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>{item.title}</Text>
            <Image
              style={{height: 20, width: 20}}
              source={require('../assets/images/favourite_iconcopy.png')}
            />
          </View>
          <View style={styles.batch}>
            <Text style={{color: 'white'}}>2.2</Text>
          </View>
          <Text style={styles.text2}>{item.title}</Text>
          <Text style={styles.text3}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Flatlists;

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

    marginTop: 20,
    borderRadius: 6,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text2: {
    color: '#87787f',
    fontSize: 16,
    fontFamily: 'AvenirLTStd-Book',
    marginTop: 6,
    marginLeft: 10,
  },
  text3: {
    color: '#87787f',
    fontSize: 16,
    fontFamily: 'AvenirLTStd-Book',
    marginLeft: 10,
  },
});
