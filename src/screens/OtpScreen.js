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
import React, {useEffect, useState} from 'react';
import {Input2} from '../components/TextInputs/textInputs';
import Buttons from '../components/Buttons/Buttons';
import {useRoute} from '@react-navigation/native';
import {sendOtp, verifyOtp} from '../services/UserAuth';
import Toast from 'react-native-simple-toast';

const OtpScreen = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const route = useRoute();

  useEffect(() => {
    setTimeout(async () => {
     const response = await sendOtp(route.params.email);
     console.log(response);

    }, 500);
  }, []);
  console.log('000', route.params.email);
  const verify = async () => {
    const response = await verifyOtp(otp);
    console.log(response);
    if (response.message == true) {
      setEmail(route.params.email);
      //console.log(email);
      const obj={email:route.params.email}
      navigation.navigate('ResetPassword', obj);
    } else {
      Toast.show('Enter the correct OTP');
    }
  };
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
              <View style={styles.textView}>
                <Text style={styles.text}>We have sent you an OTP.</Text>
                <Text style={styles.text}>Please enter it below.</Text>
              </View>

              <View style={styles.inputView}>
                <Input2
                  label="Enter OTP"
                  keyboardType="phone-pad"
                  onChangeText={val => {
                    if (val.length === 6) {
                      setOtp(val);
                    }
                  }}
                  maxLength={6}
                />
              </View>
              <View style={styles.forgetpassView}>
                <Text style={styles.forhetText}>Resend OTP</Text>
              </View>
              <View style={styles.btn}>
                <Buttons title="Get in !" onPress={verify} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default OtpScreen;

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
  text: {
    color: '#FFFFFF',
    fontSize: 25,
    fontFamily: 'AvenirLTStd-Book',
    marginVertical: 5,
  },
  textView: {
    width: '90%',

    alignItems: 'center',
    marginTop: 20,
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
    width: '90%',
    marginTop: 15,
    alignItems: 'center',
    alignSelf: 'center',
  },
  forgetpassView: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 40,
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
    marginVertical: 10,
  },
});
