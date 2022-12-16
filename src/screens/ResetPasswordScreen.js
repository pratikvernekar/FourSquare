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
import {Input1} from '../components/TextInputs/textInputs';
import Buttons from '../components/Buttons/Buttons';
import {Formik, Field} from 'formik';
import * as yup from 'yup';

const passwordValidationSchema = yup.object().shape({
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

const ResetPassword = ({navigation}) => {
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

              <Formik
                validationSchema={passwordValidationSchema}
                initialValues={{
                  password: '',
                  confirmPassword: '',
                }}
                onSubmit={async values => {
                  console.log(values);
                  navigation.navigate('ResetPassword');
                }}>
                {({values, handleSubmit, isValid, errors}) => (
                  <>
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
                      <Buttons title="Submit" onPress={handleSubmit} />
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
