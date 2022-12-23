import React from 'react';
import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import {TextField} from 'rn-material-ui-textfield';

export const Input1 = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;
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

export const SearchInput = props => {
  return (
    <View style={styles.searchView}>
      <Image source={props.source} style={styles.imgSearch} />
      <TextInput
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        style={{
          color: '#CACACA',
          width: '85%',
          height: 40,
          fontFamily: 'AvenirLTStd-Book',
          fontSize: 17,
          marginTop: 6,
        }}
        onFocus={props.onFocus}
        onChangeText={props.onChangeText}
      />
    </View>
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
    textAlign: 'center',
  },
  searchView: {
    borderWidth: 1,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'white',
    height: 44,
  },
  imgSearch: {
    resizeMode: 'contain',
    width: 20,
    height: Platform.OS === 'ios' ? 50 : 30,
    marginHorizontal: 10,
  },
});
