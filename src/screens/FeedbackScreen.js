import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {getVerifiedKeys} from '../Function';
import {addFeedBack} from '../services/UserAuth';
import Toast from 'react-native-simple-toast';

const FeedbackScreen = ({navigation}) => {
  const authData = useSelector(state => state.auth);
  const [text, setText] = useState('');
  const ref = useRef();
  const addFeed = async () => {
    const key = await getVerifiedKeys(authData.userToken);
    const response = await addFeedBack(text, key);
    console.log(response);
    ref.current.clear();
    Toast.show('Feedback Added');
  };
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '63%',
            alignItems: 'center',
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/images/back_icon.png')}
              style={styles.imgBack}
            />
          </Pressable>
          <Text style={styles.headerText}>Feedback</Text>
        </View>
      </View>
      {/* <View style={styles.textContainer}> */}
      <ScrollView>
        <Text
          style={{
            fontSize: 18,
            color: '#000000',
            fontFamily: 'AvenirLTStd-Book',

            width: '90%',
            alignSelf: 'center',
            marginTop: 20,
          }}>
          Write your feedback
        </Text>
        <TextInput
          style={styles.textContainer}
          placeholder="Feedback"
          placeholderTextColor={'grey'}
          multiline={true}
          numberOfLines={10}
          textAlignVertical="top"
          onChangeText={text => setText(text)}
          ref={ref}
        />
      </ScrollView>
      {/* </View> */}
      <View style={styles.btn}>
        <Pressable onPress={addFeed}>
          <Text style={styles.btnText}>Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 70,
    backgroundColor: '#370f24',
    justifyContent: 'center',
    paddingHorizontal: 17,
  },
  imgBack: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },
  headerText: {
    fontSize: 21,
    color: 'white',
    fontFamily: 'AvenirLTStd-Book',
    fontWeight: '600',
  },
  textContainer: {
    borderWidth: 1,
    height: 200,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#7c7c7c',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
    color: '#7c7c7c',
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: '#7c7c7c',
    fontFamily: 'AvenirLTStd-Book',
    textAlign: 'center',
  },
  btn: {
    width: '100%',

    height: 63,
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
