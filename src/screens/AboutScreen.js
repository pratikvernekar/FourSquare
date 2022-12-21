import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';

const AboutScreen = ({navigation}) => {
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
        <ScrollView >
          <Text style={styles.text}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum
          </Text>
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
    flex:1
  },
  text: {
    fontSize: 16,
    color: '#7c7c7c',
    fontFamily: 'AvenirLTStd-Book',
    textAlign: 'center',
  },
});
