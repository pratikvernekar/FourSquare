import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Pressable,
  ActivityIndicator,RefreshControl
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ReviewList} from '../components/Flatlists';
import {getReview} from '../services/Places';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';

const ReviewScreen = ({route, navigation}) => {
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const userData = useSelector(state => state.auth);
  useEffect(() => {
    setTimeout(async () => {
      setLoadingScreen(true);
      const response = await getReview(route.params.id);
      setReviewData(response.reviewText);
      setLoadingScreen(false);
    }, 500);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    const response = await getReview(route.params.id);
    setReviewData(response.reviewText);
    setRefreshing(false);
  };
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
        <Pressable
          onPress={() => {
            if (userData.userToken !== null) {
              navigation.navigate('AddReview', route.params.id);
            } else {
              Toast.show('Please Login');
            }
          }}>
          <Image
            source={require('../assets/images/Imgs/add_review3.png')}
            style={styles.imgReview}
          />
        </Pressable>
      </View>
      {loadingScreen ? (
        <ActivityIndicator color="#351247" size="large" />
      ) : null}
      {reviewData.length > 0 ? (
        <ReviewList
          data={reviewData}
          refreshControl={
            <RefreshControl colors={['#4285F4','#DB4437','#F4B400','#0F9D58']}  refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View style={{width: '100%'}}>
          <Text
            style={{
              color: '#351247',
              fontSize: 22,
              fontFamily: 'AvenirLTStd-Book',
              alignSelf: 'center',
            }}>
            No Reviews
          </Text>
        </View>
      )}
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
    width: 25,
  },
  imgReview: {
    resizeMode: 'contain',
    height: 22,
    width: 23,
    tintColor: 'white',
  },
});
