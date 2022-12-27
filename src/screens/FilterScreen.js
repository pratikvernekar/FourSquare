import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {SearchInput} from '../components/TextInputs/textInputs';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {searchPlaceWithFilter} from '../services/Places';
import {Flatlists1} from '../components/Flatlists';
const FilterScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.auth);
  const [popular, setPopular] = useState(false);
  const [distance, setDistance] = useState(false);
  const [rating, setRating] = useState(false);
  const [r1, setR1] = useState(false);
  const [r2, setR2] = useState(false);
  const [r3, setR3] = useState(false);
  const [r4, setR4] = useState(false);
  const [acceptCredit, setAcceptCredit] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [dog, setDog] = useState(false);
  const [family, setfamily] = useState(false);
  const [walkingDis, setWalkingDis] = useState(false);
  const [outdoor, setOutdoor] = useState(false);
  const [parking, setParking] = useState(false);
  const [wifi, setwifi] = useState(false);
  const [text, setText] = useState('');
  const [radius, setRadius] = useState('');
  const [sort, setSort] = useState('');
  const [filterData, setFilterData] = useState('');
  const [showList, setShowList] = useState(false);
  const [showFilter, setShowFilter] = useState(true);
  const [nearMe, setNearMe] = useState(false);

  const filter = async () => {
    setLoading(true);
    const obj = {
      latitude: userData.latitude,
      longitude: userData.longitude,
      text: text,
    };
    if (popular === true) obj['sortBy'] = 'popularityCount';
    if (rating === true) obj['sortBy'] = 'rating';
    if (distance === true) obj['sortBy'] = 'distance';
    if (acceptCredit === true) obj['acceptedCredit'] = true;
    if (delivery === true) obj['delivery'] = true;
    if (dog === true) obj['dogFriendly'] = true;
    if (family === true) obj['familyFriendly'] = true;
    if (walkingDis === true) obj['inWalkingDistance'] = true;
    if (outdoor === true) obj['outdoorDining'] = true;
    if (parking === true) obj['parking'] = true;
    if (wifi === true) obj['wifi'] = true;
    if (r1 === true) obj['price'] = 1;
    if (r2 === true) obj['price'] = 2;
    if (r3 === true) obj['price'] = 3;
    if (r4 === true) obj['price'] = 4;
    if (radius !== '') obj['radius'] = parseInt(radius);
    const response = await searchPlaceWithFilter(obj, userData.userToken);

    setLoading(false);

    if (response !== undefined) {
      setFilterData(response);
      setShowFilter(false);
      setNearMe(false);
      setShowList(true);
    }
  };
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/images/back_icon.png')}
              style={styles.imgBack}
            />
          </Pressable>

          <View style={{width: '70%', alignItems: 'center'}}>
            <SearchInput
              //value={text}
              placeholder="Search"
              placeholderTextColor="grey"
              source={require('../assets/images/serch_xxxhdpi.png')}
              onChangeText={async txt => {
                setText(txt);
                if (txt.length === 0) {
                  setShowList(false);
                }
              }}
              onFocus={txt => {
                setShowFilter(true);
                setNearMe(false);
                setShowList(false);
                // if (txt.length === 0) {
                //   setSearchedPlacesVisible(false);
                // }
              }}
            />
            <SearchInput
              placeholder="Near me"
              placeholderTextColor="grey"
              source={require('../assets/images/near_me_xxxhdpi.png')}
              onChangeText={text => {}}
              onFocus={() => {
                setShowFilter(false);
                setNearMe(true);
                setShowList(false);
              }}
            />
          </View>
          <TouchableOpacity onPress={filter}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading ? <ActivityIndicator size={40} color="#370f24" /> : null}
      {showFilter ? (
        <ScrollView>
          <Text style={styles.nearYouText}>Sort by</Text>
          <View style={styles.sortView}>
            {!popular ? (
              <Pressable
                style={styles.popularViewInactive}
                onPress={() => {
                  setPopular(!popular);
                  setRating(false);
                  setDistance(false);
                }}>
                <Text style={styles.popularTextInactive}>Popular</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.popularViewactive}
                onPress={() => {
                  setPopular(!popular);
                }}>
                <Text style={styles.popularTextActive}>Popular</Text>
              </Pressable>
            )}
            {!distance ? (
              <Pressable
                style={styles.popularViewInactive}
                onPress={() => {
                  setDistance(!distance);
                  setPopular(false);
                  setRating(false);
                }}>
                <Text style={styles.popularTextInactive}>Distance</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.popularViewactive}
                onPress={() => setDistance(!distance)}>
                <Text style={styles.popularTextActive}>Distance</Text>
              </Pressable>
            )}
            {!rating ? (
              <Pressable
                style={styles.popularViewInactive}
                onPress={() => {
                  setRating(!rating);
                  setPopular(false);
                  setDistance(false);
                }}>
                <Text style={styles.popularTextInactive}>Rating</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.popularViewactive}
                onPress={() => setRating(!rating)}>
                <Text style={styles.popularTextActive}>Rating</Text>
              </Pressable>
            )}
          </View>
          <Text style={styles.nearYouText}>Filter by</Text>
          <View style={styles.setRadius}>
            <Text style={styles.setRadiusText}>Set Radius</Text>
            <View style={{width: '90%', alignSelf: 'center'}}>
              <TextInput
                onChangeText={text => setRadius(text)}
                keyboardType="numeric"
                placeholder="Radius in KM"
                placeholderTextColor="#a3a3a3"
                style={{
                  height: 40,
                  borderBottomWidth: 1,
                  borderColor: '#a3a3a3',
                  color: 'black',
                }}
              />
            </View>
          </View>
          <View style={styles.sortView}>
            {!r1 ? (
              <Pressable
                style={styles.rupeeViewInactive}
                onPress={() => setR1(!r1)}>
                <Text style={styles.popularTextInactive}>₹</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.rupeeViewActive}
                onPress={() => setR1(!r1)}>
                <Text style={styles.popularTextActive}>₹</Text>
              </Pressable>
            )}
            {!r2 ? (
              <Pressable
                style={styles.rupeeViewInactive}
                onPress={() => setR2(!r2)}>
                <Text style={styles.popularTextInactive}>₹₹</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.rupeeViewActive}
                onPress={() => setR2(!r2)}>
                <Text style={styles.popularTextActive}>₹₹</Text>
              </Pressable>
            )}
            {!r3 ? (
              <Pressable
                style={styles.rupeeViewInactive}
                onPress={() => setR3(!r3)}>
                <Text style={styles.popularTextInactive}>₹₹₹</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.rupeeViewActive}
                onPress={() => setR3(!r3)}>
                <Text style={styles.popularTextActive}>₹₹₹</Text>
              </Pressable>
            )}
            {!r4 ? (
              <Pressable
                style={styles.rupeeViewInactive}
                onPress={() => setR4(!r4)}>
                <Text style={styles.popularTextInactive}>₹₹₹₹</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.rupeeViewActive}
                onPress={() => setR4(!r4)}>
                <Text style={styles.popularTextActive}>₹₹₹₹</Text>
              </Pressable>
            )}
          </View>
          <Text style={styles.nearYouText}>Features</Text>
          <View style={styles.featuresView}>
            {acceptCredit ? (
              <>
                <Text style={styles.featuresTextInactive}>
                  Accept credit cards
                </Text>
                <Pressable onPress={() => setAcceptCredit(!acceptCredit)}>
                  <Image
                    source={require('../assets/images/filter_selected.png')}
                    style={{height: 20, width: 20}}
                  />
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.featuresTextActive}>
                  Accept credit cards
                </Text>

                <Pressable onPress={() => setAcceptCredit(!acceptCredit)}>
                  <Icon name="plus" size={25} color="#8a7695" />
                </Pressable>
              </>
            )}
          </View>
          <View style={styles.featuresView}>
            {delivery ? (
              <>
                <Text style={styles.featuresTextInactive}>Delivery</Text>
                <Pressable onPress={() => setDelivery(!delivery)}>
                  <Image
                    source={require('../assets/images/filter_selected.png')}
                    style={{height: 20, width: 20}}
                  />
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.featuresTextActive}>Delivery</Text>

                <Pressable onPress={() => setDelivery(!delivery)}>
                  <Icon name="plus" size={25} color="#8a7695" />
                </Pressable>
              </>
            )}
          </View>
          <View style={styles.featuresView}>
            {dog ? (
              <>
                <Text style={styles.featuresTextInactive}>Dog Friendly</Text>
                <Pressable onPress={() => setDog(!dog)}>
                  <Image
                    source={require('../assets/images/filter_selected.png')}
                    style={{height: 20, width: 20}}
                  />
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.featuresTextActive}>Dog Friendly</Text>

                <Pressable onPress={() => setDog(!dog)}>
                  <Icon name="plus" size={25} color="#8a7695" />
                </Pressable>
              </>
            )}
          </View>
          <View style={styles.featuresView}>
            {family ? (
              <>
                <Text style={styles.featuresTextInactive}>
                  Family-friendly places
                </Text>
                <Pressable onPress={() => setfamily(!family)}>
                  <Image
                    source={require('../assets/images/filter_selected.png')}
                    style={{height: 20, width: 20}}
                  />
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.featuresTextActive}>
                  Family-friendly places
                </Text>

                <Pressable onPress={() => setfamily(!family)}>
                  <Icon name="plus" size={25} color="#8a7695" />
                </Pressable>
              </>
            )}
          </View>
          <View style={styles.featuresView}>
            {walkingDis ? (
              <>
                <Text style={styles.featuresTextInactive}>
                  In walking distance
                </Text>
                <Pressable onPress={() => setWalkingDis(!walkingDis)}>
                  <Image
                    source={require('../assets/images/filter_selected.png')}
                    style={{height: 20, width: 20}}
                  />
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.featuresTextActive}>
                  In walking distance
                </Text>

                <Pressable onPress={() => setWalkingDis(!walkingDis)}>
                  <Icon name="plus" size={25} color="#8a7695" />
                </Pressable>
              </>
            )}
          </View>
          <View style={styles.featuresView}>
            {outdoor ? (
              <>
                <Text style={styles.featuresTextInactive}>Outdoor seating</Text>
                <Pressable onPress={() => setOutdoor(!outdoor)}>
                  <Image
                    source={require('../assets/images/filter_selected.png')}
                    style={{height: 20, width: 20}}
                  />
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.featuresTextActive}>Outdoor seating</Text>

                <Pressable onPress={() => setOutdoor(!outdoor)}>
                  <Icon name="plus" size={25} color="#8a7695" />
                </Pressable>
              </>
            )}
          </View>
          <View style={styles.featuresView}>
            {parking ? (
              <>
                <Text style={styles.featuresTextInactive}>Parking</Text>
                <Pressable onPress={() => setParking(!parking)}>
                  <Image
                    source={require('../assets/images/filter_selected.png')}
                    style={{height: 20, width: 20}}
                  />
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.featuresTextActive}>Parking</Text>

                <Pressable onPress={() => setParking(!parking)}>
                  <Icon name="plus" size={25} color="#8a7695" />
                </Pressable>
              </>
            )}
          </View>
          <View style={styles.featuresView}>
            {wifi ? (
              <>
                <Text style={styles.featuresTextInactive}>Wi-Fi</Text>
                <Pressable onPress={() => setwifi(!wifi)}>
                  <Image
                    source={require('../assets/images/filter_selected.png')}
                    style={{height: 20, width: 20}}
                  />
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.featuresTextActive}>Wi-Fi</Text>

                <Pressable onPress={() => setwifi(!wifi)}>
                  <Icon name="plus" size={25} color="#8a7695" />
                </Pressable>
              </>
            )}
          </View>
        </ScrollView>
      ) : null}
      {nearMe ? (
        <>
          <ScrollView>
            <View style={styles.nearMeView}>
              <Image
                source={require('../assets/images/location_icon.png')}
                style={styles.imgFilter}
              />
              <Text style={styles.nearMeText}>Use my current location</Text>
            </View>
            <View style={styles.nearMeView}>
              <Image
                source={require('../assets/images/map_icon.png')}
                style={styles.imgFilter}
              />
              <Text style={styles.nearMeText}>Select Search area from map</Text>
            </View>
          </ScrollView>
        </>
      ) : null}

      {showList ? (
        filterData.length > 0 ? (
          <Flatlists1 data={filterData} navigation={navigation} />
        ) : (
          <View style={{alignSelf: 'center'}}>
            <Text
              style={{
                fontSize: 21,
                color: '#8a7695',
                fontFamily: 'AvenirLTStd-Book',
              }}>
              No Results Found
            </Text>
          </View>
        )
      ) : null}
    </SafeAreaView>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  header: {
    width: '100%',
    height: 110,
    backgroundColor: '#370f24',
    paddingHorizontal: 17,
    justifyContent: 'center',
  },
  imgBack: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
    marginTop: 3,
  },
  headerText: {
    fontSize: 21,
    color: 'white',
    fontFamily: 'AvenirLTStd-Book',
    fontWeight: '600',
  },
  imgFilter: {
    resizeMode: 'contain',
    width: 28,
    height: 28,
    marginTop: 3,
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  nearYouText: {
    color: '#858585',
    fontFamily: 'AvenirLTStd-Book',
    fontSize: 18,
    alignSelf: 'center',
    width: '90%',
    marginVertical: 15,
  },
  doneText: {
    color: 'white',
    fontFamily: 'AvenirLTStd-Book',
    fontSize: 18,
    marginTop: 5,
  },
  sortView: {
    height: 60,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#351347',
    width: '100%',
    flexDirection: 'row',
  },
  popularViewInactive: {
    borderRightWidth: 1,
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#351347',
    backgroundColor: 'white',
  },
  popularViewactive: {
    borderRightWidth: 1,
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: '#351347',
  },
  popularTextInactive: {
    color: '#351347',
    fontFamily: 'AvenirLTStd-Book',
    fontSize: 18,
  },
  popularTextActive: {
    color: 'white',
    fontFamily: 'AvenirLTStd-Book',
    fontSize: 18,
  },
  setRadius: {
    width: '100%',
    height: 110,
    backgroundColor: 'white',
  },
  setRadiusText: {
    color: '#A3A3A3',
    fontFamily: 'AvenirLTStd-Book',
    fontSize: 14,
    alignSelf: 'center',
    width: '90%',
    marginTop: 20,
  },
  rupeeViewInactive: {
    borderRightWidth: 1,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#351347',
    backgroundColor: 'white',
  },
  rupeeViewActive: {
    borderRightWidth: 1,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: '#351347',
  },
  featuresView: {
    borderBottomWidth: 1,
    height: 60,
    borderColor: '#a3a3a3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  featuresTextInactive: {
    color: '#351347',
    fontFamily: 'AvenirLTStd-Book',
    fontSize: 17,
    justifyContent: 'center',
    lineHeight: 22,
  },
  featuresTextActive: {
    color: '#a3a3a3',
    fontFamily: 'AvenirLTStd-Book',
    fontSize: 17,
    justifyContent: 'center',
    lineHeight: 22,
  },
  nearMeView: {
    color: '#000000',
    fontFamily: 'AvenirLTStd-Book',
    fontSize: 18,
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 87,
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderBottomColor: '#d4d4d4',
  },
  nearMeText: {
    width: '60%',
    textAlign: 'left',
    lineHeight: 26,
    color: 'black',
    fontSize: 18,
    fontFamily: 'AvenirLTStd-Book',
    marginLeft: 30,
  },
});
