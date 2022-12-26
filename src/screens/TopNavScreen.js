import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import TopNavigation from '../Navigations/TopNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {getFavouriteId} from '../services/Places';
import {getVerifiedKeys} from '../Function';
import {setFavourite} from '../redux/AuthSlice';

const TopNavScreen = ({navigation}) => {
  const userData = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(async () => {
      const key = await getVerifiedKeys(userData.userToken);
      const response = await getFavouriteId(key);
      dispatch(setFavourite(response));
    }, 500);
  }, [userData.skip]);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor="#310D20" />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../assets/images/menu_icon.png')}
            style={styles.imgMenu}
          />
        </Pressable>

        <Image
          source={require('../assets/images/logo.png')}
          style={styles.img}
        />
        <View style={styles.seachFilterView}>
          <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
            <Image
              source={require('../assets/images/filter_icon.png')}
              style={styles.imgSearch}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image
              source={require('../assets/images/search_icon.png')}
              style={styles.imgSearch}
            />
          </TouchableOpacity>
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
