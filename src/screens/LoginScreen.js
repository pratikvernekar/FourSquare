import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Input1 from '../components/TextInputs/textInputs';
import Buttons from '../components/Buttons/Buttons';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.main}>
      <ImageBackground
        blurRadius={7}
        resizeMode="cover"
        style={{flex: 1}}
        source={require('../assets/images/background.png')}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <ScrollView
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.skipText}>Skip {'>'}</Text>
              </View>
              <View style={styles.imgView}>
                <Image
                  source={require('../assets/images/logo.png')}
                  style={styles.img}
                />
              </View>
              <View style={styles.inputView}>
                <Input1 label="Email" keyboardType="default" />
              </View>
              <View style={styles.inputView}>
                <Input1 label="Password" keyboardType="phone-pad" />
              </View>
              <View style={styles.forgetpassView}>
                <Text style={styles.forhetText}>Forgot Password?</Text>
              </View>
              <View style={styles.btn}>
                <Buttons title="Login" />
              </View>
              <View style={styles.creatAccView}>
                <Text style={styles.createText}>Create Account</Text>
              </View>
              <View style={styles.orView}>
                <Text style={styles.orText}>OR</Text>
              </View>
              <View style={styles.social}>
                <Image
                  source={require('../assets/images/facebook_btn.png')}
                  style={styles.bottomImg}
                />
                <Image
                  source={require('../assets/images/g+_btn.png')}
                  style={styles.bottomImg}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 25,
    marginTop: 30,
    width: '100%',
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'AvenirLTStd-Book',
  },
  imgView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  img: {
    resizeMode: 'contain',
    width: 200,
    height: 100,
  },
  inputView: {
    width: 350,
    marginTop: 15,
    alignItems: 'center',
    alignSelf: 'center',
  },
  forgetpassView: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 45,
  },
  forhetText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'AvenirLTStd-Book',
    opacity: 0.7,
  },
  btn: {
    width: 350,
    alignSelf: 'center',
  },
  creatAccView: {
    alignSelf: 'center',
    marginVertical: 30,
  },
  createText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'AvenirLTStd-Book',
  },
  orView: {
    backgroundColor: '#3b3c57',
    opacity: 0.8,
    height: 30,
    width: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'AvenirLTStd-Book',
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 385,
    paddingHorizontal: 10,
    marginVertical: 30,
   
  },
  bottomImg: {
    width: 170,
    height: 50,
    borderRadius: 7,
  },
});
