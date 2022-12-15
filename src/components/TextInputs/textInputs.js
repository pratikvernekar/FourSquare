import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TextField} from 'rn-material-ui-textfield';

const Input1 = props => {
  
  return (
    <TextField
      textColor="white"
      style={{
        color: 'white',
        fontFamily: 'AvenirLTStd-Book',
        textAlign: 'center',
      }}
      containerStyle={{width: '100%', alignSelf: 'center'}}
      baseColor="#b5abab"
      tintColor="#b5abab"
      labelTextStyle={{
        alignSelf: 'center',
        fontFamily: 'AvenirLTStd-Book',

        width: '100%',
        textAlign: 'center',
      }}
      label={props.label}
      keyboardType={props.keyboardType}
      fontSize={18}
      labelFontSize={18}
      activeLineWidth={1}
      disabledLineWidth={1}
    />
  );
};

export default Input1;

const styles = StyleSheet.create({});
