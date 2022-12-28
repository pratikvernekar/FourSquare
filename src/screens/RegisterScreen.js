import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {Input1} from '../components/TextInputs/textInputs';
import {Buttons} from '../components/Buttons/Buttons';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {register} from '../services/UserAuth';
import Toast from 'react-native-simple-toast';

const registerValidationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email must have a number, special character, small and capital alphabets.',
    )
    .required('Email is required'),
  mobile: yup
    .string()
    .matches(
      /^(\+\d{1,3}[- ]?)?\d{10}$/,
      'Mobile number must be at least 10 digit',
    )
    .required('Mobile number is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required(' Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password do not match')
    .required('Confirm Password is required'),
});
const initialValues = {
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
};

const Register = ({navigation}) => {
  return (
    <SafeAreaView style={styles.main}>
      <ImageBackground
        blurRadius={7}
        resizeMode="cover"
        style={{
          flex: 1,
        }}
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
              <Formik
                validationSchema={registerValidationSchema}
                initialValues={initialValues}
                onSubmit={async (values, {resetForm}) => {
                  const response = await register(values);

                  if (response === undefined) {
                    Toast.show('User already exist..');
                    navigation.navigate('LoginScreen');
                    resetForm({initialValues});
                  } else {
                    Toast.show('Registration Successfull');
                  }
                }}>
                {({values, handleSubmit, isValid, errors}) => (
                  <>
                    <View style={styles.inputView}>
                      <Field
                        component={Input1}
                        name="email"
                        label="Email"
                        keyboardType="email-address"
                        value={values.email}
                      />
                    </View>
                    <View style={styles.inputView}>
                      <Field
                        component={Input1}
                        name="mobile"
                        label="Mobile Number"
                        keyboardType="phone-pad"
                        value={values.mobile}
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
                    <View style={styles.inputView}>
                      <Field
                        component={Input1}
                        name="confirmPassword"
                        label="Confirm Password"
                        keyboardType="default"
                        value={values.confirmPassword}
                        secureTextEntry={true}
                      />
                    </View>
                    <View style={styles.btn}>
                      <Buttons title="Login" onPress={handleSubmit} />
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Register;

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
    width: '90%',
    marginVertical: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  btn: {
    width: 350,
    alignSelf: 'center',
    marginVertical: 60,
  },
});
