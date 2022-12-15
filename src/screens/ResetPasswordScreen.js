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

const ResetPassword = () => {
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
              <View style={styles.imgView}>
                <Image
                  source={require('../assets/images/logo.png')}
                  style={styles.img}
                />
              </View>

              <View style={styles.inputView}>
                <Input1 label="Enter Password" keyboardType="phone-pad" />
              </View>
              <View style={styles.inputView}>
                <Input1 label="Confirm Password" keyboardType="phone-pad" />
              </View>

              <View style={styles.btn}>
                <Buttons title="Submit" />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ResetPassword;

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

  imgView: {
    width: '100%',
    alignItems: 'center',
    marginTop: 70,
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

  btn: {
    width: 350,
    alignSelf: 'center',
    marginVertical: 100,
  },
});
