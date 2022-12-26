import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAboutUs} from '../services/UserAuth';

const AboutScreen = ({navigation}) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(async () => {
      setLoading(true);
      const response = await getAboutUs();
      setText(response[0].aboutUs);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="#351247" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '63%',
            alignItems: 'center',
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/images/back_icon.png')}
              style={styles.imgBack}
            />
          </Pressable>
          <Text style={styles.headerText}>About Us</Text>
        </View>
      </View>

      <View style={styles.textContainer}>
        <ScrollView>
          <Text style={styles.text}>{text}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    width: '100%',
    height: 70,
    backgroundColor: '#370f24',
    justifyContent: 'center',
    paddingHorizontal: 17,
  },
  imgBack: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },
  headerText: {
    fontSize: 21,
    color: 'white',
    fontFamily: 'AvenirLTStd-Book',
    fontWeight: '600',
  },
  textContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: '#7c7c7c',
    fontFamily: 'AvenirLTStd-Book',
  },
});
