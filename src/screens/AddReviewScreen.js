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
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

const AddReviewScreen = () => {
  const [image, setImage] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const selectImg = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImageUri(image.path);
        setImage(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor="#310D20" />
      <View style={styles.header}>
        <Image
          source={require('../assets/images/back_icon.png')}
          style={styles.imgBack}
        />
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
          {image ? (
            <View style={styles.imgView}>
              <Image source={{uri: imageUri}} style={styles.imgImage} />
            </View>
          ) : null}

          <Pressable onPress={selectImg}>
            <View style={styles.addPickView}>
              <Image
                source={require('../assets/images/addPick1.png')}
                style={styles.imgPick}
              />
            </View>
          </Pressable>
        </View>
      </ScrollView>
      <View style={styles.btn}>
        <Pressable>
          <Text style={styles.btnText}>Submit</Text>
        </Pressable>
      </View>
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
    width: 20,
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
    backgroundColor: '#c7c7c7',

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
    height: 50,
    width: 50,
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
