import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
} from 'react-native';
import React from 'react';
import TopNavigation from '../Navigations/TopNavigation';

const TopNavScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor="#310D20" />
      <View style={styles.header}>
        <Image
          source={require('../assets/images/menu_icon.png')}
          style={styles.imgMenu}
        />
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.img}
        />
        <View style={styles.seachFilterView}>
          <Image
            source={require('../assets/images/filter_icon.png')}
            style={styles.imgSearch}
          />
          <Image
            source={require('../assets/images/search_icon.png')}
            style={styles.imgSearch}
          />
        </View>
      </View>
      <TopNavigation />
    </SafeAreaView>
  );
};

export default TopNavScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 70,

    backgroundColor: '#370f24',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
  },
  img: {
    resizeMode: 'contain',
    width: 130,
    height: 80,
    marginLeft: 40,
  },
  imgMenu: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },
  imgSearch: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },
  seachFilterView: {
    flexDirection: 'row',
    //borderWidth: 1,
    width: '17%',
    justifyContent: 'space-between',
  },
});