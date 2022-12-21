import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ReviewList} from '../components/Flatlists';
import {getReview} from '../services/Places';

const ReviewScreen = ({route, navigation}) => {
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  useEffect(() => {
    setTimeout(async () => {
      setLoadingScreen(true);
      const response = await getReview(route.params.id);

      setReviewData(response.reviewText);
      setLoadingScreen(false);
    }, 500);
  }, []);
  if (loadingScreen) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="#351247" size="large" />
      </SafeAreaView>
    );
  }
  //console.log(route);
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor="#310D20" />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/images/back_icon.png')}
            style={styles.imgBack}
          />
        </Pressable>

        <Text style={styles.headerText}>{route.params.placeName}</Text>
        <Pressable onPress={()=>navigation.navigate('AddReview',route.params.id)}>
          <Image
            source={require('../assets/images/Imgs/add_review3.png')}
            style={styles.imgReview}
          />
        </Pressable>
      </View>
      <ReviewList data={reviewData} />
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
    height: 22,
    width: 23,
    tintColor: 'white',
  },
});
