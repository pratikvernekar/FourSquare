import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
} from 'react-native';
import React from 'react';
import {ReviewList} from '../components/Flatlists';

const ReviewScreen = () => {
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor="#310D20" />
      <View style={styles.header}>
        <Image
          source={require('../assets/images/back_icon.png')}
          style={styles.imgBack}
        />
        <Text style={styles.headerText}>Attil</Text>
        <Image
          source={require('../assets/images/review.png')}
          style={styles.imgReview}
        />
      </View>
      <ReviewList />
    </SafeAreaView>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
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
  headerText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'AvenirLTStd-Book',
  },
  imgBack: {
    resizeMode: 'contain',
    height: 25,
    width: 20,
  },
  imgReview: {
    resizeMode: 'contain',
    height: 30,
    width: 23,
    tintColor: 'white',
  },
});
