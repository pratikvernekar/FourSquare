import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getReview, getReviewImage} from '../services/Places';
import {getVerifiedKeys} from '../Function';
import {useSelector} from 'react-redux';
import uuid from 'react-native-uuid';

const PhotosScreen = ({navigation, route}) => {
  const userData = useSelector(state => state.auth);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(route);
  useEffect(() => {
    setTimeout(async () => {
      setLoading(true);
      const response = await getReviewImage(route.params.id);
      console.log(response);
      setImages(response.reviewImage);
      setLoading(false);
    }, 500);
  }, []);
  return (
    <SafeAreaView styles={styles.main}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/images/Imgs/back_icon.png')}
            style={styles.imgMenu}
          />
        </TouchableOpacity>

        <Text style={styles.headerText}>{route.params.name}</Text>

        <TouchableOpacity onPress={() => navigation.navigate('AddReview')}>
          <Image
            source={require('../assets/images/Imgs/aad_photo_icon.png')}
            style={styles.imgSearch}
          />
        </TouchableOpacity>
      </View>
      {loading ? <ActivityIndicator size={20} /> : null}
      <View style={styles.imgContainer} key={uuid.v4()}>
        {images ? (
          //  <View style={styles.imgContainer} key={uuid.v4()}>
          images.map(e => {
            return (
              <View style={styles.imgContainer} key={uuid.v4()}>
                {e.image.map(ele => {
                  return (
                    <Pressable
                      key={uuid.v4()}
                      onPress={() =>
                        navigation.navigate(
                          'IndividualPhoto',
                          (obj = {
                            rName: e.reviewBy,
                            rDate: e.reviewDate,
                            rImage: e.reviewerImage,
                            image: ele,
                          }),
                        )
                      }>
                      <Image
                        key={uuid.v4()}
                        source={{uri: 'https' + ele.substring(4)}}
                        style={{
                          height: 120,
                          width: 120,
                          marginHorizontal: 2,
                          marginTop: 2,
                        }}
                      />
                    </Pressable>
                  );
                })}
              </View>
            );
          })
        ) : (
          <View>
            <Text
              style={{
                fontSize: 17,
                color: 'black',
                fontFamily: 'AvenirLTStd-Book',
              }}>
              No Images
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PhotosScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#000000',
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
    width: 28,
    height: 28,
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'AvenirLTStd-Book',
    fontWeight: '600',
  },
  imgContainer: {
    width: '98%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 1,
    alignSelf: 'center',
   
  },
});
