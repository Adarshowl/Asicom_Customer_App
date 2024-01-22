import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  I18nManager,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import themeContext from '../constants/themeContext';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../constants/Colors';
import { SIZES, STRING } from '../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { ShowToastMessage } from '../utils/Utility';
import Octicons from 'react-native-vector-icons/Octicons';
import { Switch } from 'react-native-elements';
import { languageRestart } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VegUrbanCommonBtn from '../utils/VegUrbanCommonBtn';
import { EventRegister } from 'react-native-event-listeners';
import RNRestart from 'react-native-restart';
import { useTranslation } from 'react-i18next';

const DrawerContent = ({ navigation }) => {
  const theme = useContext(themeContext);
  const [lightMode, setLightMode] = useState(false);

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem(STRING.app_theme, (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            if (value == 'true') {
              setLightMode(true);
            } else {
              setLightMode(false);
            }
          } else {
          }
        }
      });
      await AsyncStorage.getItem(STRING.app_lang, (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            STRING.APP_LANGUAGE = value;
            let a = favData.map((item, index) => {
              let temp = Object.assign({}, item);
              console.log(temp?.code == value);
              setLanguage(value);
              if (temp?.code == value) {
                temp.selected = !temp.selected;
              }
              return temp;
            });

            setFavData(a);
          } else {
            STRING.APP_LANGUAGE = 'en';
          }
        }
      });
      await AsyncStorage.getItem(STRING.app_cur, (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            STRING.APP_CURRENCY = value;
            let a = currencyData.map((item, index) => {
              let temp = Object.assign({}, item);
              console.log(temp?.code == value);
              if (temp?.symbol == value) {
                temp.selected = !temp.selected;
              }
              return temp;
            });

            setCurrencyData(a);
          } else {
            STRING.APP_CURRENCY = '$';
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };
  useEffect(() => {
    getUserFromStorage();
  }, []);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);
  const [favData, setFavData] = useState([
    {
      name: 'English',
      code: 'en',
      selected: false,
      flag: 'https://i.pinimg.com/originals/1a/69/6e/1a696e4c567bba99d4330b1de6498985.jpg',
    },
    {
      name: 'हिंदी',
      code: 'hi',
      selected: false,
      flag: 'data:image/png;base64,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',
    },
    // {name: 'Chinese', code: 'zh', selected: false, flag: ''},
    // {name: 'Japanese', code: 'ja', selected: false, flag: ''},
    // {name: 'German', code: 'de', selected: false, flag: ''},
    // {name: 'French', code: 'fr', selected: false, flag: ''},
    {
      name: 'Russian',
      code: 'ru',
      selected: false,
      flag: 'data:image/jpeg;base64,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',
    },
    {
      name: 'Arabic',
      code: 'ar',
      selected: false,
      flag: 'data:image/png;base64,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',
    },
  ]);

  const [currencyData, setCurrencyData] = useState([
    { code: 'USD', symbol: '$', selected: false },
    { code: 'EUR', symbol: '€', selected: false },
    { code: 'JPY', symbol: '¥', selected: false },
    { code: 'GBP', symbol: '£', selected: false },
  ]);
  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState('en');

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };
  const onLangItemClick = idx => {
    let a = favData.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        if (temp?.name == 'English') {
          changeLanguage(temp?.code);
          AsyncStorage.setItem(STRING.app_lang, temp?.code + '');
          temp.selected = !temp.selected;
          ShowToastMessage(`App language changed to ${temp?.name}`);
          RNRestart.restart();
        } else if (temp?.name == 'हिंदी') {
          changeLanguage(temp?.code);
          AsyncStorage.setItem(STRING.app_lang, temp?.code + '');
          temp.selected = !temp.selected;
          ShowToastMessage(`App language changed to ${temp?.name}`);
          RNRestart.restart();
        } else {
          ShowToastMessage(`Language not supported NOW!!!!`);
          ShowToastMessage(`Please select English / हिंदी for now`);
          changeLanguage(currentLanguage);
        }
      } else {
        temp.selected = false;
      }
      return temp;
    });

    setFavData(a);
  };

  useEffect(() => {
    getUserFromStorage();
  }, []);
  const renderLanguageItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          {
            paddingVertical: 5,
            // backgroundColor: COLORS.red,
            marginHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 5,
            flex: 1,
          },
        ]}
        onPress={() => {
          onLangItemClick(index);
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/*<MaterialCommunityIcons*/}
          {/*  name={item?.selected ? 'circle-slice-8' : 'circle-outline'}*/}
          {/*  size={22}*/}
          {/*  color={COLORS.colorPrimary}*/}
          {/*/>*/}
          <Image
            source={{
              uri: item?.flag,
            }}
            style={{
              height: 30,
              width: 30,
            }}
          />
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              fontSize: 16,
              color: theme?.colors?.textColor,
              flex: 1,
              marginStart: 15,
              textAlign: 'left',
            }}>
            {item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const onCurrencyItemClick = idx => {
    let a = currencyData.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        temp.selected = !temp.selected;
        STRING.APP_CURRENCY = temp?.symbol;
        ShowToastMessage(`App curreny changed to ${temp?.code}`);
        AsyncStorage.setItem(STRING.app_cur, temp?.symbol + '');
        RNRestart.restart();
      } else {
        temp.selected = false;
      }
      return temp;
    });

    setCurrencyData(a);
  };

  const renderCurrencyItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          {
            paddingVertical: 5,
            // backgroundColor: COLORS.red,
            marginHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 5,
            flex: 1,
          },
        ]}
        onPress={() => {
          onCurrencyItemClick(index);
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name={item?.selected ? 'circle-slice-8' : 'circle-outline'}
            size={22}
            color={COLORS.colorPrimary}
          />

          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              fontSize: 16,
              color: theme?.colors?.textColor,
              flex: 1,
              marginStart: 15,
              textAlign: 'left',
            }}>
            {item?.code}
          </Text>
          <Text
            style={{
              fontFamily: 'OpenSans-Bold',
              fontSize: 18,
              color: theme?.colors?.textColor,
              textAlign: 'left',
              marginStart: 15,
            }}>
            {item?.symbol}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const closeConfirmModal = () => {
    setShowConfirm(!showConfirm);
  };

  const closeCurrencyModal = () => {
    setShowCurrency(!showCurrency);
  };

  const renderChangeLanguageModal = () => {
    return (
      <Modal
        transparent={true}
        animationType={'slide'}
        visible={showConfirm}
        onRequestClose={() => {
          closeConfirmModal();
        }}>
        <View style={styles.modalBackground}>
          <View
            style={[
              styles.activityIndicatorWrapper,
              {
                backgroundColor: theme.colors.bg_color_onBoard,
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  {
                    color: theme.colors.textColor,
                    fontSize: 18,
                    fontFamily: 'OpenSans-Regular',
                    marginTop: 15,
                    marginHorizontal: 10,
                    marginBottom: 10,
                    textAlign: 'left',
                    flex: 1,
                  },
                ]}>
                Language
              </Text>
              <Ionicons
                name="close"
                color={theme.colors.colorPrimary}
                size={25}
                style={[
                  styles.backIcon,
                  {
                    alignSelf: 'flex-end',
                    marginBottom: 5,
                    marginEnd: 8,
                  },
                ]}
                onPress={() => {
                  closeConfirmModal();
                }}
              />
            </View>

            <FlatList
              style={{
                paddingStart: 5,
                paddingEnd: 5,
              }}
              ListHeaderComponent={() => {
                return <View style={{}} />;
              }}
              ListHeaderComponentStyle={{
                paddingTop: 8,
              }}
              showsVerticalScrollIndicator={false}
              data={favData}
              renderItem={renderLanguageItem}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const renderChangeCurrencyModal = () => {
    return (
      <Modal
        transparent={true}
        animationType={'slide'}
        visible={showCurrency}
        onRequestClose={() => {
          closeCurrencyModal();
        }}>
        <View style={styles.modalBackground}>
          <View
            style={[
              styles.activityIndicatorWrapper,
              {
                backgroundColor: theme.colors.bg_color_onBoard,
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  {
                    color: theme.colors.textColor,
                    fontSize: 18,
                    fontFamily: 'OpenSans-Regular',
                    marginTop: 15,
                    marginHorizontal: 10,
                    marginBottom: 10,
                    textAlign: 'left',
                    flex: 1,
                  },
                ]}>
                Currency
              </Text>
              <Ionicons
                name="close"
                color={theme.colors.colorPrimary}
                size={25}
                style={[
                  styles.backIcon,
                  {
                    alignSelf: 'flex-end',
                    marginBottom: 5,
                    marginEnd: 8,
                  },
                ]}
                onPress={() => {
                  closeCurrencyModal();
                }}
              />
            </View>

            <FlatList
              style={{
                paddingStart: 5,
                paddingEnd: 5,
              }}
              ListHeaderComponent={() => {
                return <View style={{}} />;
              }}
              ListHeaderComponentStyle={{
                paddingTop: 8,
              }}
              showsVerticalScrollIndicator={false}
              data={currencyData}
              renderItem={renderCurrencyItem}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme?.colors.bg_color_onBoard,
        flex: 1,
      }}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: theme?.colors.bg_color_onBoard,

          flexGrow: 1,
        }}>
        <View
          style={{
            paddingVertical: 35,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
            }}
            style={{
              height: 60,
              width: 60,
              borderRadius: 60,
              marginHorizontal: 15,
            }}
          />
          <View style={{}}>
            <Text
              style={{
                color: theme.colors.white,
                fontSize: 17,
                fontFamily: 'OpenSans-SemiBold',
                alignSelf: 'flex-start',
              }}>
              Hi, Angela Jones
            </Text>
            <Text
              style={{
                color: theme.colors.textColor,
                fontSize: 14,
                fontFamily: 'OpenSans-Regular',
                alignSelf: 'flex-start',
              }}>
              angela@gmail.com
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 1,
            backgroundColor: COLORS.light_gray,
            marginBottom: 10,
            marginHorizontal: 8
          }}
        />
        <ItemView
          onPress={() => {
            navigation.replace('MainContainer');
          }}
          title={STRING.home}


          icon={<Ionicons name={'home'} size={20} color={theme?.colors?.grey} />}
        />
        <ItemView
          title={STRING.cart}
          onPress={() => {
            navigation.navigate('Carts');
          }}
          icon={
            <MaterialCommunityIcons
              name={'cart'}
              size={20}
              color={COLORS.grey}
            />
          }
        />
        <ItemView
          title={STRING.your_orders}
          onPress={() => {
            navigation.navigate('TrackOrder');
          }}
          icon={
            <AntDesign
              name={'shoppingcart'} size={20} color={theme?.colors?.grey} />
          }
        />
        <ItemView
          title={STRING.scan_and_pay}
          onPress={() => {
            navigation.navigate('ScanPay');
          }}
          icon={<FontAwesome name={'qrcode'} size={20} color={theme?.colors?.grey} />}
        />
        <ItemView
          title={STRING.customer_reviews}
          onPress={() => {
            navigation.navigate('Review');
          }}
          icon={<Entypo name={'star-outlined'} size={20} color={theme?.colors?.grey} />}
        />

        <ItemView
          onPress={() => {
            navigation.navigate('About');
          }}
          title={STRING.about}
          icon={<Feather name={'info'} size={20} color={theme?.colors?.grey} />}
        />
        <ItemView
          title={STRING.rate}
          onPress={() => {
            ShowToastMessage('Coming Soon!');
          }}
          icon={<Entypo name={'star-outlined'} size={20}
            color={theme?.colors?.grey}
          />}
        />
        <ItemView
          title={STRING.currency}
          onPress={() => {
            closeCurrencyModal();
          }}
          icon={
            <MaterialCommunityIcons
              name={'currency-usd'}
              size={20}
              color={theme?.colors?.grey}
            />
          }
        />
        <ItemView
          title={STRING.language}
          onPress={() => {
            closeConfirmModal();
          }}
          icon={<FontAwesome name={'language'} size={20}
            color={theme?.colors?.grey}
          />}
        />

        <TouchableOpacity activeOpacity={0.8} style={styles.itemWrapper}>
          <View
            style={[
              styles.itemIcon,
              {
                marginEnd: 10,
              },
            ]}>
            <Octicons name={'arrow-switch'} size={20}
              color={theme?.colors?.grey}
            />
          </View>
          <Text
            // style={[styles.itemText,

            // ]}>
            style={[
              styles.itemText,
              {
                color: theme?.colors?.textColor
              },
            ]}>
            RTL Feature</Text>
          <View
            style={{
              flex: 1,
            }}
          />
          <Switch
            style={{
              // transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              marginHorizontal: 10,
              alignSelf: 'center',
              color: theme?.colors?.textColor
            }}
            value={I18nManager.isRTL}
            onValueChange={value => {
              languageRestart();
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.itemWrapper}>
          <View
            style={[
              styles.itemIcon,
              {
                marginEnd: 10,
              },
            ]}>
            <MaterialCommunityIcons
              name={'theme-light-dark'}
              size={20}
              color={theme?.colors?.grey}
            />
          </View>
          <Text
            style={[
              styles.itemText,
              {
                color: theme?.colors?.textColor
              },
            ]}> 
            Dark Mode</Text>
          <View
            style={{
              flex: 1,
            }}
          />
          <Switch
            style={{
              alignSelf: 'center',
              // transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              marginHorizontal: 10,
            }}
            value={lightMode}
            onValueChange={value => {
              setLightMode(prev => !prev);
              EventRegister.emit(STRING.app_theme, lightMode ? false : true);
              AsyncStorage.setItem(
                STRING.app_theme,
                lightMode ? false + '' : true + '',
              );
            }}
          />

          {/*<CustomSwitch*/}
          {/*  selectionMode={1}*/}
          {/*  roundCorner={true}*/}
          {/*  option1={I18nManager.isRTL ? '🌙' : '⚪'}*/}
          {/*  option2={I18nManager.isRTL ? '⚪' : '🌙'}*/}
          {/*  onSelectSwitch={onSelectSwitch => {*/}
          {/*    setLightMode(prev => !prev);*/}
          {/*    EventRegister.emit(STRING.app_theme, lightMode ? false : true);*/}
          {/*    AsyncStorage.setItem(*/}
          {/*      STRING.app_theme,*/}
          {/*      lightMode ? false + '' : true + '',*/}
          {/*    );*/}
          {/*  }}*/}
          {/*  bgColor={theme.colors.bg_color_onBoard}*/}
          {/*  icon1={*/}
          {/*    I18nManager.isRTL ? (*/}
          {/*      <Entypo name={'moon'} size={20} color={COLORS.colorPrimary} />*/}
          {/*    ) : (*/}
          {/*      <FontAwesome*/}
          {/*        name={'circle'}*/}
          {/*        size={20}*/}
          {/*        color={COLORS.colorPrimary}*/}
          {/*      />*/}
          {/*    )*/}
          {/*  }*/}
          {/*  icon2={*/}
          {/*    I18nManager.isRTL ? (*/}
          {/*      <FontAwesome*/}
          {/*        name={'circle'}*/}
          {/*        size={20}*/}
          {/*        color={COLORS.colorPrimary}*/}
          {/*      />*/}
          {/*    ) : (*/}
          {/*      <Entypo name={'moon'} size={20} color={COLORS.colorPrimary} />*/}
          {/*    )*/}
          {/*  }*/}
          {/*/>*/}

          {/*<CustomSwitch*/}
          {/*  switchLeftText={I18nManager.isRTL ? '🌙' : '☀️'}*/}
          {/*  switchRightText={I18nManager.isRTL ? '☀️' : '🌙'}*/}
          {/*  style={{*/}
          {/*    marginHorizontal: 10,*/}
          {/*  }}*/}
          {/*  animationSpeed={300}*/}
          {/*  onSwitch={() => ShowConsoleLogMessage('switch mode')}*/}
          {/*/>*/}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Logout',
              'Are you sure want to logout',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    navigation.replace('Auth');
                  },
                },
              ],
              { cancelable: false },
            );
          }}
          activeOpacity={0.8}
          style={[
            styles.itemWrapper,
            {
              backgroundColor: theme.colors.bg_color,

              paddingHorizontal: 15,
              paddingVertical: 15,
              borderRadius: 15,
              marginHorizontal: 15,
              marginVertical: 5,
            },
          ]}>
          <View
            style={[
              styles.itemIcon,
              {
                marginEnd: 10,
              },
            ]}>
            <Feather name={'log-out'} size={20} color={theme.colors.grey} />
          </View>
          <Text
            style={[
              [
                styles.itemText,
                {
                  color: theme.colors.white,
                },
              ],
            ]}>
            Logout
          </Text>
          <View
            style={{
              flex: 1,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.itemWrapper,
            {
              backgroundColor: theme.colors.bg_color,
              paddingHorizontal: 15,
              paddingVertical: 15,
              borderRadius: 15,
              marginHorizontal: 15,
              marginVertical: 25,
              flexDirection: 'column',
              alignItems: 'flex-start',
            },
          ]}>
          <Text
            style={[
              [
                styles.itemText,
                {
                  color: theme.colors.white,
                  fontSize: 16,
                  fontFamily: 'OpenSans-SemiBold',
                },
              ],
            ]}>
            {STRING.contact_support}
          </Text>
          <Text
            style={[
              [
                styles.itemText,
                {
                  color: theme.colors.textColor,
                  fontSize: 14,
                  fontFamily: 'OpenSans-Regular',
                },
              ],
            ]}>
            If you have any problem, queries or questions feel free to reach out
          </Text>
          <VegUrbanCommonBtn
            height={45}
            width={120}
            borderRadius={5}
            marginTop={10}
            textSize={14}
            textColor={theme?.colors?.btnTextColor}
            text={STRING.contact}
            backgroundColor={theme?.colors?.colorPrimary}
            onPress={() => {
              navigation.navigate('Contact');
            }}
            textStyle={{
              fontFamily: 'OpenSans-Medium',
              textTransform: 'uppercase',
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            marginBottom: 25,
          }}
        />
      </ScrollView>
      {renderChangeLanguageModal()}
      {renderChangeCurrencyModal()}
    </SafeAreaView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    // alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    width: SIZES.width,
    paddingHorizontal: 10,
    // alignSelf: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 75,
  },
  wrapper: {
    padding: 10,
    marginTop: 10,
    backgroundColor: COLORS.colorPrimaryLight,
    // backgroundColor: COLORS.red,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    flex: 1,
  },
  profileImage: {
    height: 75,
    width: 75,
    borderRadius: 5,
  },
  divLine: {
    borderWidth: 0.2,
    backgroundColor: COLORS.light_gray,
    marginBottom: 10,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 30,
    marginBottom: 10,
    paddingVertical: 5,
  },
  itemIcon: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    color: COLORS.black,
    // flex: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    alignItems: 'flex-start',
  },
});

const ItemView = ({ icon, title, onPress, show }) => {
  const theme = useContext(themeContext);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.itemWrapper}>
      <View
        style={[
          styles.itemIcon,
          {
            marginEnd: 10,
          },
        ]}>
        {icon}
      </View>
      <Text
        //  style={[styles.itemText,    ]}>
        style={[
          {
            color: theme.colors.textColor,
            fontSize: 18,
            fontFamily: 'OpenSans-Regular',
            // marginTop: 15,
            // marginHorizontal: 10,
            // marginBottom: 10,

          },
        ]}>
        {title || 'Home'}</Text>
      <View
        style={{
          flex: 1,
        }}
      />
      {show ? null : (
        <View
          style={[
            styles.itemIcon,
            {
              marginStart: 10,
            },
          ]}>
          <Ionicons
            name={'chevron-forward'}
            size={18}
            color={theme?.colors?.grey}
            style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
