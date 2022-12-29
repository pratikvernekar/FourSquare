import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Input1} from '../components/TextInputs/textInputs';
import {Buttons} from '../components/Buttons/Buttons';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {checkIn} from '../services/UserAuth';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {login} from '../redux/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email must have a number, special character, small and capital alphabets.',
    )
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});
const initialValues = {
  email: '',
  password: '',
};

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const forgotPassword = email => {
    if (email !== '') {
      navigation.navigate('OtpScreen', {email});
    } else {
      Toast.show('Enter the email');
    }
  };
  return (
    <SafeAreaView style={styles.main}>
      <StatusBar backgroundColor="#310D20" />
      <ImageBackground
        blurRadius={7}
        resizeMode="cover"
        style={{flex: 1}}
        source={require('../assets/images/background.png')}>
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Pressable onPress={() => navigation.navigate('SkipStack')}>
                <Text style={styles.skipText}>Skip {'>'}</Text>
              </Pressable>
            </View>
            <View style={styles.imgView}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.img}
              />
            </View>
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={initialValues}
              onSubmit={async (values, {resetForm}) => {
                const response = await checkIn(values);
                if (response === undefined) {
                  Toast.show('Login Unsuccessfull');
                } else {
                  dispatch(login(response));
                  await AsyncStorage.setItem('token', response.access_token);
                  Toast.show('Login Successfull');
                  resetForm({initialValues});
                }
              }}>
              {({values, handleSubmit, isValid, errors}) => (
                <>
                  <View style={styles.inputView}>
                    <Field
                      component={Input1}
                      name="email"
                      value={values.email}
                      label="Email"
                      keyboardType="email-address"
                    />
                  </View>
                  <View style={styles.inputView}>
                    <Field
                      component={Input1}
                      name="password"
                      label="Password"
                      keyboardType="default"
                      value={values.password}
                      secureTextEntry={true}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      if(values.email.includes('@','.')){
                        forgotPassword(values.email)
                      }else{
                        Toast.show('enter a valid email')
                      }
                    
                     
                 
                      
                    }}>
                    <View style={styles.forgetpassView}>
                      <Text style={styles.forhetText}>Forgot Password?</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.btn}>
                    <Buttons title="Login" onPress={handleSubmit} />
                  </View>
                </>
              )}
            </Formik>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <View style={styles.creatAccView}>
                <Text style={styles.createText}>Create Account</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.orView}>
              <Text style={styles.orText}>OR</Text>
            </View>
            <View style={styles.social}>
              <TouchableOpacity>
                <Image
                  source={require('../assets/images/facebook_btn.png')}
                  style={styles.bottomImg}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../assets/images/g+_btn.png')}
                  style={styles.bottomImg}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    width: '90%',
    marginTop: 15,
    alignItems: 'center',
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
