import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {addReview, addReviewImage} from '../services/Places';
import Toast from 'react-native-simple-toast';
import uuid from 'react-native-uuid';
import {getVerifiedKeys} from '../Function';
import {useSelector} from 'react-redux';

const AddReviewScreen = ({navigation, route}) => {
  const userData = useSelector(state => state.auth);
  const [image, setImage] = useState(false);
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState([]);
  const ref = useRef();

  const revAdd = async () => {
    if (text !== '') {
      try {
        var key = await getVerifiedKeys(userData.userToken);
        const response = await addReview(route.params, text, key);
        console.log(response);
        ref.current.clear();
        setImageUri([])
        Toast.show(response.message);
      } catch (error) {
        console.log(error);
      }
    } else {
      Toast.show('Write Review');
    }

    if (imageUri.length > 0) {
      const payload = new FormData();
      payload.append('_id', route.params);
      for (let i = 0; i < imageUri.length; i++) {
        payload.append(imageUri[i].name, {
          uri: imageUri[i].path,
          type: imageUri[i].mime,
          name: `${imageUri[i].filename}.${imageUri[i].mime.substring(
            imageUri[i].mime.indexOf('/') + 1,
          )}`,
        });
      }
   const resp=await addReviewImage(payload,key)
   console.log(resp);
    }
  };
  console.log(route);

  const selectImg = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      // multiple: true
    })
      .then(image => {
        const obj = {
          id: uuid.v4(),
          name: 'image',
          path: image.path,
          fileName: image.filename,
          mime: image.mime,
        };

        // console.log(image);
        setImageUri(preVal => [...preVal, obj]);

        setImage(true);
      })
      .catch(e => {
        console.log(e);
      });
  };
  console.log(route.params);
  console.log('33', imageUri);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/images/back_icon.png')}
            style={styles.imgBack}
          />
        </Pressable>

        <Text style={styles.headerText}>Add Review</Text>
      </View>
      <ScrollView>
        <View style={styles.overView}>
          <Text style={styles.overViewText}>Write Review</Text>
        </View>
        <View style={styles.textContainerView}>
          <ScrollView>
            <TextInput
              style={styles.containerText}
              multiline={true}
              numberOfLines={7}
              textAlignVertical="top"
              onChangeText={text => setText(text)}
              ref={ref}
            />
          </ScrollView>
        </View>
        <View style={styles.overView}>
          <Text style={styles.overViewText}>Add photos to your review</Text>
        </View>
        <View
          style={{
            width: '90%',
            marginTop: 10,
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          {imageUri.length > 0
            ? imageUri.map(e => {
                return (
                  <View style={styles.imgView}>
                    <Image source={{uri: e.path}} style={styles.imgImage} />
                  </View>
                );
              })
            : null}

          <Pressable onPress={selectImg}>
            <View style={styles.addPickView}>
              <Image
                source={require('../assets/images/Imgs/aad_photo_icon_big.png')}
                style={styles.imgPick}
              />
            </View>
          </Pressable>
        </View>
      </ScrollView>
      <Pressable onPress={revAdd}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Submit</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default AddReviewScreen;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 70,

    backgroundColor: '#370f24',
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 17,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'AvenirLTStd-Book',

    marginLeft: 100,
  },
  imgBack: {
    resizeMode: 'contain',
    height: 25,
    width: 25,
  },
  overView: {
    width: '90%',

    alignSelf: 'center',
    marginTop: 17,
  },
  overViewText: {
    color: '#351247',
    fontSize: 18,
    fontFamily: 'AvenirLTStd-Book',
    lineHeight: 18,
  },

  containerText: {
    color: '#8d8d8d',
    fontSize: 16,
    fontFamily: 'AvenirLTStd-Book',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    height: 160,
    width: '90%',
    alignSelf: 'center',
    marginTop: 17,
    borderRadius: 10,
    padding: 10,
  },
  addPickView: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 10,
  },
  imgView: {
    height: 60,
    width: 60,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 8,
    margin: 10,
  },
  imgImage: {
    width: 60,
    height: 60,

    borderRadius: 8,
  },

  imgPick: {
    resizeMode: 'contain',
    height: 60,
    width: 60,
  },
  btn: {
    width: '100%',

    height: 64,
    backgroundColor: '#351247',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'AvenirLTStd-Book',
  },
});
