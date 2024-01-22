import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  I18nManager,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import {FONTS} from '../../constants/Fonts';

import {icons, STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {getUserTransactionHistory} from '../../redux/actions/CartApi';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import {showProgressBar} from '../../redux/actions';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

const Wallet = ({navigation}) => {
  const theme = useContext(themeContext);
  const loginCount = useSelector(state => state?.state?.count);
  const userToken = useSelector(state => state?.state?.userToken);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [showCartEmpty, setShowCartEmpty] = useState(false);
  const {t, i18n} = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (loginCount == 1) {
      if (isFocused) {
        dispatch(showProgressBar(true));
        dispatch(() => {
          getUserTransactionHistory(
            dispatch,
            navigation,
            userToken,
            successCallback,
            errorCallback,
            BannerErrorCallback,
          );
        });
      }
    }
  }, [isFocused]);

  const BannerErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    // ShowToastMessage(error);
    setShowCartEmpty(true);

    ShowConsoleLogMessage(error);
  };

  const errorCallback = async data => {
    setPaymentHistory([]);
    setShowCartEmpty(true);
    dispatch(showProgressBar(false));
  };
  const successCallback = async data => {
    // ShowConsoleLogMessage(JSON.stringify(data));
    setPaymentHistory(data?.data);

    setShowCartEmpty(data?.data?.length <= 0);

    dispatch(showProgressBar(false));
  };

  const renderItem = ({item, index}) => {
    // console.log(item);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ERecipt', {item: item});
        }}
        // activeOpacity={0.8}
        style={[
          styles.wrapperOrder,
          {
            backgroundColor: theme?.colors?.bg_color_onBoard,
          },
        ]}>
        <View
          style={[
            GlobalStyle.flexRowAlignCenter,
            {
              paddingVertical: 5,
              alignItems: 'center',
            },
          ]}>
          <View
            style={[
              styles.itemImage,
              {
                backgroundColor: theme?.colors?.colorimageback,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Image
              style={{
                width: 30,
                height: 30,
                tintColor: theme?.colors?.white,
                alignSelf: 'center',
                // borderRadius: 50,
              }}
              source={icons.transfer}
            />
          </View>
          <View style={styles.innnerWrapperOrder}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                    fontSize: 14,
                  },
                ]}
                numberOfLines={1}>
                {item?.transectionid}
              </Text>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.colorPrimary,
                    // marginTop: 8
                    marginEnd: 8,
                    // fontSize:16
                  },
                ]}>
                {STRING.APP_CURRENCY}
                {item?.amount}
              </Text>
            </View>
            <View
              style={[
                {
                  flexWrap: 'wrap',
                  marginTop: 5,
                  justifyContent: 'space-between',
                  alinItem: 'center',
                },
                GlobalStyle.flexRowAlignCenter,
              ]}>
              <Text
                style={[
                  styles.discountPrice,
                  {
                    color: theme?.colors?.white,
                    // color: theme?.colors?.,
                    // marginRight: 5
                    // fontFamily: FONTS?.bold,
                  },
                ]}>
                {/*{moment(item?.createdAt).format('llll')}*/}
                {moment(item?.createdAt).format('LLL')}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  // paddingHorizontal: 15,
                  // padding: 5,
                  // marginTop: 5,
                  alinItem: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    // margin: 2,
                    fontFamily: FONTS?.bold,
                    color: theme?.colors?.white,
                    // color: item?.order === "order" ? 'pink' : item?.order === 'Top Up' ? 'blue' : 'black',
                  }}>
                  {' '}
                  {/*{item?.order}{' '}*/}
                  Order{' '}
                </Text>
                {item?.order !== 'Orders' ? (
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: '#FD606A',
                      borderRadius: 5,
                      alinItem: 'center',
                      marginTop: 3,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Ionicons
                      name="arrow-up"
                      size={14}
                      color={COLORS?.white}
                      style={{}}
                    />
                  </View>
                ) : item?.order === 'Top Up' ? (
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: '#606CFD',
                      borderRadius: 5,
                      alinItem: 'center',
                      marginTop: 3,
                    }}>
                    <Ionicons
                      name="arrow-down"
                      size={14}
                      color={COLORS?.white}
                    />
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
            alignItems: 'center',
          },
        ]}>
        <Ionicons
          name="ios-arrow-back"
          color={theme.colors.white}
          size={25}
          style={[
            styles.backIcon,
            {
              opacity: !show ? 1 : 0.0,
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              marginStart: 10,
              marginTop: 10,
            },
          ]}
          onPress={() => {
            navigation.goBack();
            // ShowToastMessage('Coming Soon!');
          }}
        />
        <VegUrbanCommonToolBar
          // title="Wallet"
          title="Transaction History"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
          }}
          textStyle={{
            color: theme.colors.white,
            fontSize: 20,
          }}
        />
        {loginCount == 1
          ? // <AntDesign
            //   name={'search1'}
            //   size={26}
            //   color={theme.colors.white}
            //   style={{
            //     marginEnd: 10,
            //   }}
            //   onPress={() => {
            //     navigation.navigate('Search');
            //     // ShowToastMessage('Coming Soon!');
            //   }}
            // />

            null
          : null}
      </View>

      {loginCount == 1 ? (
        <View
          style={[
            GlobalStyle.loginModalBg,
            {
              backgroundColor: theme.colors?.bg_color_onBoard,
              // justifyContent: 'center',
              // alignItems: 'center',
            },
          ]}>
          {showCartEmpty ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
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
                Transaction history is empty
              </Text>
              <VegUrbanCommonBtn
                height={40}
                width={'100%'}
                borderRadius={20}
                textSize={16}
                textColor={theme?.colors?.text}
                text={'Shop Now'}
                backgroundColor={theme?.colors?.colorPrimary}
                onPress={() => {
                  // navigation.navigate('Home');
                  navigation.goBack();
                }}
                textStyle={{
                  fontFamily: FONTS?.bold,
                }}
              />
            </View>
          ) : (
            <FlatList
              style={{
                paddingHorizontal: 5,
              }}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => {
                return <View style={styles.divLine} />;
              }}
              ListHeaderComponent={() => {
                return (
                  // <View
                  //   style={{
                  //     flex: 1,
                  //   }}>
                  //   <View style={{}}>
                  //     <View
                  //       style={{
                  //         flexDirection: 'row',
                  //         justifyContent: 'space-between',
                  //         alinItem: 'center',
                  //       }}>
                  //       <Text
                  //         style={[
                  //           GlobalStyle.locationText,
                  //           {
                  //             color: theme.colors.white,
                  //             fontSize: 18,
                  //             fontFamily: FONTS.semi_old,
                  //             opacity: 0.0,
                  //           },
                  //         ]}>
                  //         {t('Transaction History')}
                  //       </Text>
                  //       <View
                  //         style={{
                  //           flex: 1,
                  //         }}
                  //       />
                  //       <Text
                  //         onPress={() => {
                  //           // navigation.navigate('WalletList');
                  //         }}
                  //         style={[
                  //           GlobalStyle.locationText,
                  //           {
                  //             color: theme.colors.white,
                  //             fontSize: 16,
                  //             fontFamily: FONTS?.medium,
                  //             opacity: 0.0,
                  //           },
                  //         ]}>
                  //         {t('See All')}
                  //       </Text>
                  //     </View>
                  //   </View>
                  // </View>
                  null
                );
              }}
              ListHeaderComponentStyle={{}}
              data={paymentHistory}
              renderItem={renderItem}
            />
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
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
            textColor={theme.colors?.text}
            text={'Sign In'}
            backgroundColor={theme?.colors?.colorPrimary}
            onPress={() => {
              navigation.navigate('Auth', {screen: 'Login'});
            }}
            textStyle={{
              fontFamily: FONTS?.bold,
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  wrapperOrder: {
    padding: 5,
    borderRadius: 3,
    // margin: 2,
    backgroundColor: COLORS.white,
    // marginHorizontal: 10,
    // marginVertical: 10,
    // borderRadius: 12,
    paddingHorizontal: 0,
    // paddingVertical:5
  },
  backIcon: {
    // marginTop: 18,
    marginStart: 15,
    paddingVertical: 5,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  app_logo: {
    height: 180,
    resizeMode: 'stretch',
    alignSelf: 'center',
    width: '100%',
    marginTop: 0,
    marginBottom: 20,
  },
  discountPrice: {
    // fontFamily: 'OpenSans-SemiBold',
    // fontFamily: 'OpenSans-Regular',

    fontSize: 14,
    color: COLORS.black,
  },
  wrapper: {
    padding: 15,
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    // marginVertical: 20,
    borderRadius: 12,
  },
  innnerWrapperOrder: {
    flex: 1,
    marginStart: 10,
    marginTop: 0,
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  textName: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: COLORS.black,
    // fontWeight: 'bold',
  },
  divLine: {
    height: 0.5,
    width: '100%',
    backgroundColor: COLORS.gray,
    alignSelf: 'center',
    marginVertical: 5,
    // marginTop: 10,
  },
});
