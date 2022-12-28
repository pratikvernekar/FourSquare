import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {addReviewImage, getReview, getReviewImage} from '../services/Places';
import {getVerifiedKeys} from '../Function';
import {useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-crop-picker';

const PhotosScreen = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const h1 =
    width > height
      ? Platform.OS === 'ios'
        ? '90%'
        : '80%'
      : Platform.OS === 'ios'
      ? '90%'
      : '91%';
  const userData = useSelector(state => state.auth);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(false);
  console.log(route);
  useEffect(() => {
    setTimeout(async () => {
      setLoading(true);
      const response = await getReviewImage(route.params.id);
      console.log(response);
      setImages(response.reviewImage);
      setLoading(false);
    }, 500);
  }, [img]);

  const selectImg = async () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    })
      .then(async image => {
        const payload = new FormData();
        payload.append('_id', route.params.id);
        payload.append('image', {
          uri: image.path,
          type: image.mime,
          name: `${image.filename}.${image.mime.substring(
            image.mime.indexOf('/') + 1,
          )}`,
        });
        let cred = await getVerifiedKeys(userData.userToken);
       const res= await addReviewImage(payload, cred);
       console.log(res);
      setImg(!img);
      })
      .catch(er => console.log('User cancelled selection'));
  };
  console.log('dd',route);
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

        <TouchableOpacity
          onPress={() => {
            if (userData.userToken !== null) {
              selectImg()
            } else {
              Toast.show('Please Login');
            }
          }}>
          <Image
            source={require('../assets/images/Imgs/aad_photo_icon.png')}
            style={styles.imgSearch}
          />
        </TouchableOpacity>
      </View>
      {loading ? <ActivityIndicator size={40} color="#370f24" /> : null}

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={[{height: h1}]}>
        <View style={styles.imgContainer} key={uuid.v4()}>
          {images.length > 0 ? (
            images.map(e => {
              return e.image.map(ele => {
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
              });
            })
          ) : (
            <View
              style={{
                alignItems: 'center',
                width: '100%',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontFamily: 'AvenirLTStd-Book',
                }}>
                No Images
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhotosScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'red',
    borderWidth: 4,
    height: 600,
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
    // backgroundColor: 'red',
  },
});
