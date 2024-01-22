import {
  Alert,
  I18nManager,
  Image,
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Switch} from 'react-native-elements';
import {FONTS} from '../../constants/Fonts';
import LogoutConfirmationModal from './LogoutConfirmationModal'; // Import your custom modal
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {useContext, useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import {icons, SIZES, STRING} from '../../constants';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import VegUrbanFloatEditText from '../../utils/EditText/VegUrbanFloatEditText';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';
import {EventRegister} from 'react-native-event-listeners';
import {
  loginUserSuccess,
  updateLoginCount,
  userTokenSuccess,
} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import {useIsFocused} from '@react-navigation/native';
import {clearRealm, getSavedImage} from '../../utils/RealmUtility';
import {updateCartDataLength} from '../../redux/actions/HomeApi';

const Profile = ({navigation, route}) => {
  const theme = useContext(themeContext);

  const dispatch = useDispatch();
  const loginCount = useSelector(state => state?.state?.count);
  const userData = useSelector(state => state?.state?.userData);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    // Simulate a 2-second delay
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const {t} = useTranslation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [mobile, setMobile] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [show, setShow] = useState(false);

  const [conPass, setConPass] = useState('');

  const [oldPassShow, setOldPassShow] = useState(true);
  const [newPassShow, setNewPassShow] = useState(true);
  const [conPassShow, setConPassShow] = useState(true);

  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  // const [selectedLanguage, setSelectedLanguage] = useState('');

  const {selectedLanguage} = route.params || {selectedLanguage: 'English(US)'};

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const hideLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  const handleLogoutConfirm = () => {
    // Handle logout logic here
    // For example, navigate to the login screen
    dispatch(loginUserSuccess({}));
    dispatch(userTokenSuccess(''));
    dispatch(updateLoginCount(0));
    dispatch(updateCartDataLength(0));
    EventRegister.emit(STRING.app_theme, false);
    AsyncStorage.setItem(STRING.app_theme, false + '');
    clearRealm();
    AsyncStorage.clear();
    navigation.replace('Auth');
  };

  const [favData, setFavData] = useState('');
  const [image, setImage] = useState('');

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
    } catch (err) {
      // console.log('ERROR IN GETTING USER FROM STORAGE', err);
    }
    getSavedImage()
      .then(res => {
        // ShowToastMessage('called');
        // ShowConsoleLogMessage(res[0]?.image);
        setImage(res[0]?.image);
      })
      .catch(error => {
        ShowConsoleLogMessage(error);
      })
      .finally(() => {});
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    getUserFromStorage();
  }, [isFocused]);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Veg urban | A UI KIT framework for building apps',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const closeConfirmModal = () => {
    setShowConfirm(!showConfirm);
  };

  const renderChangePasswordModal = () => {
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
            <Ionicons
              name="close"
              color={theme.colors.colorPrimary}
              size={25}
              style={[
                styles.backIcon,
                {
                  alignSelf: 'flex-end',
                  marginTop: 20,
                  marginBottom: 5,
                  marginEnd: 15,
                },
              ]}
              onPress={() => {
                closeConfirmModal();
              }}
            />
            <Text
              style={[
                {
                  color: theme.colors.textColor,

                  fontSize: 18,
                  fontFamily: 'OpenSans-Regular',
                  textAlign: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                },
              ]}>
              {STRING.change_password}
            </Text>

            <VegUrbanFloatEditText
              label={STRING.old_pass}
              style={{
                marginTop: 5,
              }}
              value={oldPass}
              secureTextEntry={oldPassShow}
              keyBoardType="default"
              onChangeText={value => {
                setOldPass(value);
              }}
              error={''}
              icon={
                <FontAwesome
                  name={oldPassShow ? 'eye-slash' : 'eye'}
                  size={18}
                  style={{
                    marginEnd: 5,
                  }}
                  color={COLORS.grey}
                  onPress={() => setOldPassShow(!oldPassShow)}
                />
              }
              iconPosition={'right'}
            />

            <VegUrbanFloatEditText
              label={STRING.new_pass}
              style={{
                marginTop: 5,
              }}
              value={newPass}
              keyBoardType="default"
              onChangeText={value => {
                setNewPass(value);
              }}
              secureTextEntry={newPassShow}
              error={''}
              icon={
                <FontAwesome
                  name={newPassShow ? 'eye-slash' : 'eye'}
                  size={18}
                  style={{
                    marginEnd: 5,
                  }}
                  color={COLORS.grey}
                  onPress={() => setNewPassShow(!newPassShow)}
                />
              }
              iconPosition={'right'}
            />
            <VegUrbanFloatEditText
              label={STRING.confirm_new_pass}
              style={{
                marginTop: 5,
              }}
              value={conPass}
              keyBoardType="default"
              onChangeText={value => {
                setConPass(value);
              }}
              secureTextEntry={conPassShow}
              error={''}
              icon={
                <FontAwesome
                  name={conPassShow ? 'eye-slash' : 'eye'}
                  size={18}
                  style={{
                    marginEnd: 5,
                  }}
                  color={COLORS.grey}
                  onPress={() => setConPassShow(!conPassShow)}
                />
              }
              iconPosition={'right'}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 10,
              }}>
              <VegUrbanCommonBtn
                height={55}
                width={'100%'}
                borderRadius={2}
                textSize={17}
                marginTop={17}
                textColor={theme?.colors?.text}
                text={STRING.change_password}
                backgroundColor={theme.colors.colorPrimary}
                onPress={() => {
                  closeConfirmModal();
                }}
                textStyle={{
                  fontFamily: 'OpenSans-Medium',
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const shareContent = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this awesome app!',
        url: 'https://www.example.com',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared via activity type
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Share sheet dismissed
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme.colors.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
          },
        ]}>
        <Ionicons
          name="ios-arrow-back"
          // color={COLORS.black}
          color={theme.colors.textColor}
          size={25}
          style={[
            styles.backIcon,
            {
              opacity: !show ? 1 : 0.0,
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              marginStart: 10,
            },
          ]}
          onPress={() => {
            navigation.goBack();
            // ShowToastMessage('Coming Soon!');
          }}
        />
        {/* <ToolBarIcon
          title={Ionicons}
          iconName={'chevron-back'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            marginEnd: 10,
            backgroundColor: theme?.colors?.toolbar_icon_bg,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        /> */}
        <VegUrbanCommonToolBar
          title={STRING.profile}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
            marginStart: 15,
            fontFamily: FONTS?.bold,
            fontSize: 20,
          }}
        />
        {/*<MaterialCommunityIcons*/}
        {/*  name={'dots-horizontal-circle-outline'}*/}
        {/*  size={26}*/}
        {/*  // color={COLORS.colorPrimary}*/}
        {/*  style={{*/}
        {/*    marginEnd: 10,*/}
        {/*  }}*/}
        {/*  color={theme?.colors?.textColor}*/}
        {/*/>*/}
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.colorPrimary, COLORS.colorPrimary]}
          />
        }>
        <View style={[styles.wrapper, {}]}>
          {loginCount == 1 ? (
            <View
              style={[
                {
                  marginEnd: 0,
                  flex: 1,
                  alignItems: 'center',
                },
              ]}>
              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                  width: 120,
                }}>
                <Image
                  source={{
                    uri: image
                      ? image
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHL03nqSptOCTMXb8ym6QffVTfjk2C14HS-w&usqp=CAU',
                  }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 100,
                    alignSelf: 'center',
                  }}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 8,

                    padding: -6,
                    borderRadius: 5,
                    width: 25,
                    height: 25,
                    alignItems: 'center',
                    backgroundColor: theme?.colors?.colorPrimary,
                  }}
                  onPress={() => {
                    navigation.navigate('SignupNew');
                    // ShowToastMessage('Coming soon');
                  }}>
                  <MaterialIcons
                    name="edit"
                    size={16}
                    color={theme?.colors?.text}
                    style={{
                      marginTop: 4,
                      marginStart: 2,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={[
                  GlobalStyle.flexRowAlignCenter,
                  {
                    marginTop: 10,
                  },
                ]}>
                <Text
                  style={[
                    GlobalStyle.bothSideMediumText,
                    {
                      color: theme?.colors?.white,
                      fontSize: 25,
                      fontFamily: FONTS?.bold,
                    },
                  ]}>
                  {/*Andrew Ainsley*/}
                  {userData?.name}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  // alignSelf: 'flex-start',
                }}>
                <Text
                  style={[
                    GlobalStyle.bothSideText,
                    {
                      color: theme?.colors?.white,
                      fontSize: 18,
                      fontFamily: FONTS?.medium,
                    },
                  ]}>
                  {/*testing_demo@gmail.com*/}
                  {userData?.email}
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <Text
                style={[
                  GlobalStyle.bothSideText,
                  {
                    color: theme?.colors?.white,
                    fontSize: 18,
                    fontFamily: FONTS?.medium,
                    textAlign: 'center',
                    marginBottom: 20,
                  },
                ]}>
                Sign to get better experience
              </Text>
              <VegUrbanCommonBtn
                height={40}
                width={'100%'}
                borderRadius={20}
                textSize={16}
                textColor={theme?.colors?.text}
                text={'Sign In'}
                backgroundColor={theme?.colors?.colorPrimary}
                onPress={() => {
                  // navigation.navigate('Login');
                  navigation.navigate('Auth', {screen: 'Login'});
                }}
                textStyle={{
                  fontFamily: FONTS?.bold,
                }}
              />
            </View>
          )}
        </View>
        <View
          style={[
            GlobalStyle.bgWrapper,
            {
              backgroundColor: theme?.colors?.bg_color_onBoard,
            },
          ]}>
          {loginCount == 1 ? (
            <ItemView
              title="Manage Account"
              // title={STRING.notifications}
              onPress={() => {
                navigation.navigate('SignupNew');
              }}
              icon={
                // <FontAwesome
                //   name={'user-o'}
                //   size={25}
                //   color={theme?.colors?.white}
                // />
                <Image
                  source={icons.manage_account}
                  style={{
                    height: 30,
                    tintColor: theme?.colors?.white,
                    width: 30,
                  }}
                />
              }
            />
          ) : null}
          {loginCount == 1 ? (
            <ItemView
              title="Address"
              // title={STRING.notifications}
              onPress={() => {
                navigation.navigate('Address');
              }}
              icon={
                // <Ionicons
                //   name={'location-outline'}
                //   size={25}
                //   color={theme?.colors?.white}
                // />
                <Image
                  source={icons.address}
                  style={{
                    height: 30,
                    tintColor: theme?.colors?.white,
                    width: 30,
                  }}
                />
              }
            />
          ) : null}

          <ItemView
            title={STRING.notifications}
            onPress={() => {
              // ShowToastMessage('Coming soon!');

              navigation.navigate('Notification');
            }}
            icon={
              // <FontAwesome
              //   name={'bell-o'}
              //   size={22}
              //   color={theme?.colors?.white}
              // />

              <Image
                source={icons.notification}
                style={{
                  height: 25,
                  tintColor: theme?.colors?.white,
                  width: 25,
                }}
              />
            }
          />
          {loginCount == 1 ? (
            <ItemView
              title={'Refund'}
              onPress={() => {
                navigation.navigate('Refund');
              }}
              icon={
                // <FontAwesome
                //   name={'bell-o'}
                //   size={22}
                //   color={theme?.colors?.white}
                // />

                <Image
                  source={icons.refund}
                  style={{
                    height: 25,
                    tintColor: theme?.colors?.white,
                    width: 25,
                  }}
                />
              }
            />
          ) : null}
          {loginCount == 1 ? (
            <ItemView
              title={'Return Order'}
              onPress={() => {
                navigation.navigate('ReturnOrder');
              }}
              icon={
                // <FontAwesome
                //   name={'bell-o'}
                //   size={22}
                //   color={theme?.colors?.white}
                // />

                <Image
                  source={icons.return_order}
                  style={{
                    height: 25,
                    tintColor: theme?.colors?.white,
                    width: 25,
                  }}
                />
              }
            />
          ) : null}

          {/* <ItemView
            title={STRING.currency}
            onPress={() => {
              navigation.navigate('Currency');
              // ShowToastMessage('Coming soon!');
            }}
            icon={
              <MaterialCommunityIcons
                name={'currency-usd'}
                size={25}
                color={theme?.colors?.gray}
              />
            }
          /> */}

          {/* <ItemView
            title={STRING.language}
            onPress={() => {
              navigation.navigate('Language');
              // ShowToastMessage('Coming soon!');
            }}

            icon={

              <FontAwesome name={'language'} size={20} color={theme?.colors?.grey} />


            }
          /> */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('Language');
              // ShowToastMessage('Coming soon!');
            }}
            style={[
              styles.itemWrapper,
              {
                // flexDirection:'row',
                justifyContent: 'space-between',
              },
            ]}>
            <View
              style={[
                // styles.itemIcon,
                {
                  marginEnd: 10,
                  // width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',

                  // justifyContent:'space-between'
                  flexDirection: 'row',
                },
              ]}>
              {/*<FontAwesome*/}
              {/*  name={'language'}*/}
              {/*  size={20}*/}
              {/*  color={theme?.colors?.white}*/}
              {/*  style={{*/}
              {/*    marginStart: 12,*/}
              {/*  }}*/}
              {/*/>*/}

              <Image
                source={icons.language}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: theme?.colors?.white,
                  marginStart: 5,
                }}
              />
              <Text
                style={[
                  styles.itemText,
                  {
                    color: theme?.colors?.white,
                    marginStart: 15,
                  },
                ]}>
                {STRING.language}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginEnd: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.itemText,
                  {
                    color: theme?.colors?.white,
                    marginEnd: 12,
                  },
                ]}>
                {selectedLanguage}
              </Text>

              <Ionicons
                name={'chevron-forward'}
                size={18}
                color={theme?.colors?.white}
                style={{
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                  marginTop: 5,
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.itemWrapper}>
            <View
              style={[
                styles.itemIcon,
                {
                  marginEnd: 10,
                },
              ]}>
              {/*<MaterialCommunityIcons*/}
              {/*  name={'theme-light-dark'}*/}
              {/*  size={20}*/}
              {/*  color={theme?.colors?.white}*/}
              {/*/>*/}
              <Image
                source={icons.dark_mode}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: theme?.colors?.white,
                }}
              />
            </View>
            <Text
              style={[
                styles.itemText,
                {
                  color: theme?.colors?.white,
                },
              ]}>
              Dark Mode
            </Text>
            <View
              style={{
                flex: 1,
              }}
            />
            <Switch
              style={{
                alignSelf: 'center',
                // transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                marginHorizontal: 5,
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
              trackColor={{
                true: theme?.colors?.colorPrimary, // Set the color for true (dark mode)
                false: theme?.colors?.grey, // Set the color for false (normal mode)
              }}
              thumbColor={
                lightMode
                  ? theme?.colors?.colorPrimary
                  : theme?.colors?.bg_color
              } // Set thumb (switch handle) color based on lightMode
            />
          </TouchableOpacity>
          <ItemView
            onPress={() => {
              navigation.navigate('PrivacyPolicy');
            }}
            title={STRING.privacy_policy}
            icon={
              // <Ionicons
              //   name={'lock-closed-outline'}
              //   size={25}
              //   color={theme?.colors?.white}
              // />
              <Image
                source={icons.privacy_policy}
                style={{
                  height: 30,
                  tintColor: theme?.colors?.white,
                  width: 30,
                }}
              />
            }
          />
          <ItemView
            title="Help Center"
            onPress={() => {
              // ShowToastMessage('HelpCenter');

              // navigation.navigate('HelpCenter');
              ShowToastMessage('Coming soon!');
            }}
            icon={
              // <Feather
              //   name={'alert-circle'}
              //   size={25}
              //   color={theme?.colors?.white}
              // />
              <Image
                source={icons.help}
                style={{
                  height: 30,
                  tintColor: theme?.colors?.white,
                  width: 30,
                }}
              />
            }
          />
          <ItemView
            title="Invite Friends"
            onPress={() => {
              shareContent();
            }}
            icon={
              // <Feather name={'users'} size={25} color={theme?.colors?.white} />
              <Image
                source={icons.invite_friend}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: theme?.colors?.white,
                }}
              />
            }
          />
          {/* <ItemView
            onPress={showLogoutModal}


            title={STRING.logout}
            show={true}
            icon={<Feather name={'log-out'} size={20} color={theme?.colors?.grey} />}
          /> */}
          {loginCount == 1 ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.itemWrapper}
              onPress={showLogoutModal}>
              <View
                style={[
                  styles.itemIcon,
                  {
                    marginEnd: 10,
                  },
                ]}>
                <Feather name={'log-out'} size={20} color={'#E35D5E'} />
              </View>
              <Text
                style={[
                  styles.itemText,
                  {
                    color: '#E35D5E',
                    fontFamily: FONTS?.medium,
                  },
                ]}>
                {STRING.logout}
              </Text>
              <View
                style={{
                  flex: 1,
                }}
              />
            </TouchableOpacity>
          ) : null}
          {/* <TouchableOpacity
            onPress={showLogoutModal}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              backgroundColor: theme?.colors?.bg,
            }}
          >
            <Feather name={'log-out'} size={20} color={theme?.colors?.grey} />
            <Text style={{ marginLeft: 10 }}>{STRING.logout}</Text>
          </TouchableOpacity> */}

          {/* Render the logout confirmation modal */}
          <View style={{flex: 1}}>
            <LogoutConfirmationModal
              visible={isLogoutModalVisible}
              onCancel={hideLogoutModal}
              onConfirm={handleLogoutConfirm}
            />
          </View>
        </View>
      </ScrollView>
      {renderChangePasswordModal()}
    </SafeAreaView>
  );
};

export default Profile;

const ItemView = ({icon, title, onPress, show}) => {
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
        style={[
          styles.itemText,
          {
            color: theme?.colors?.white,
          },
        ]}>
        {title || 'Home'}
      </Text>

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
            color={theme?.colors?.white}
            style={{transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: SIZES.width,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 75,
  },
  wrapper: {
    padding: 10,
    marginTop: 10,
    // backgroundColor: COLORS.colorPrimaryLight,
    // backgroundColor: COLORS.red,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    textAlign: 'center',

    flex: 1,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 100,
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
    fontFamily: FONTS?.regular,
    fontSize: 20,
    color: COLORS.black,
    // flex: 1,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    alignItems: 'flex-start',
  },
});
