import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';

const Buttons = props => {
  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.btn}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </Pressable>
  );
};

export default Buttons;

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
});
