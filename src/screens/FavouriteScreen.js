import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import React from 'react';

const FavouriteScreen = ({navigation}) => {
  return (
    <SafeAreaView styles={styles.main}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/images/back_icon.png')}
              style={styles.imgBack}
            />
          </Pressable>

          <Text style={styles.headerText}>Favourites</Text>
          <Image
            source={require('../assets/images/filter_icon.png')}
            style={styles.imgBack}
          />
        </View>
        <View style={styles.searchView}>
          <Image
            source={require('../assets/images/serch_xxxhdpi.png')}
            style={styles.imgSearch}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor={'black'}
            style={{color: 'black'}}
          />
        </View>
      </View>
      <View
        style={{
          height: '100%',
          borderWidth: 1,
          backgroundColor: 'white',
        }}></View>
    </SafeAreaView>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 110,
    backgroundColor: '#370f24',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
  },
  imgBack: {
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
  searchView: {
    borderWidth: 1,
    width: '80%',
    flexDirection: 'row',
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'white',
  },
  imgSearch: {
    resizeMode: 'contain',
    width: 20,
    height: Platform.OS === 'ios' ? 50 : 30,
    marginHorizontal: 10,
  },
});
