import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextField} from 'rn-material-ui-textfield';

export const Input1 = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;
//c//onsole.log('---',props.inputProps);
  const hasError = errors[name] && touched[name];
  return (
    <View style={{width: '100%'}}>
      <View style={[hasError && styles.errorInput]}>
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
          fontSize={18}
          labelFontSize={18}
          activeLineWidth={1}
          onChangeText={text => onChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
           {...inputProps}
        />
      </View>
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

export const Input2 = props => {
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
      fontSize={18}
      labelFontSize={18}
      activeLineWidth={1}
      disabledLineWidth={1}
      label={props.label}
      keyboardType={props.keyboardType}
      maxLength={props.maxLength}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 12,
    fontFamily: 'AvenirLTStd-Book',
    

    position: 'absolute',
    bottom: -21,
    textAlign:'center'
  },
});
