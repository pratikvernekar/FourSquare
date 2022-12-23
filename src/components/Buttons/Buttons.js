import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const Buttons = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.btn}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const Button1 = props => {
  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.btn1}>
        <Text style={styles.btnText}>{props.title}</Text>
      </View>
    </Pressable>
  );
};

export {Button1, Buttons};

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'AvenirLTStd-Book',
  },
  btn1: {
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
