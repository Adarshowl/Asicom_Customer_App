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
import React, {useContext, useEffect, useState} from 'react';
import {icons, SIZES} from '../../constants';
import {FONTS} from '../../constants/Fonts';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import {showProgressBar} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
  getUserSavedAddress,
  removeUserAddress,
} from '../../redux/actions/CartApi';

const Address = ({navigation, route}) => {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const loginCount = useSelector(state => state?.state?.count);
  const userToken = useSelector(state => state?.state?.userToken);

  const [addressList, setAddressList] = useState([]);
  const [showAddressAddBtn, setShowAddressAddBtn] = useState(false);

  const BannerErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    // ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };
  const addressSuccessCallback = async data => {
    // ShowConsoleLogMessage(JSON.stringify(data?.response));
    dispatch(showProgressBar(false));
    setAddressList(data?.response);

    setShowAddressAddBtn(data?.response?.length == 0);
  };

  const addressErrorCallback = async data => {
    dispatch(showProgressBar(false));
    setAddressList([]);
    setShowAddressAddBtn(true);
    // setTimeout(() => {
    //   ShowToastMessage(data?.message || 'Something went wrong.');
    // }, 100);
  };

  const addressDeleteSuccessCallback = async data => {
    // ShowConsoleLogMessage(JSON.stringify(data?.response));
    dispatch(showProgressBar(false));
  };

  const addressDeleteErrorCallback = async data => {
    dispatch(showProgressBar(false));
    setTimeout(() => {
      ShowToastMessage(data?.message || 'Something went wrong.');
    }, 100);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (loginCount == 1) {
      if (isFocused) {
        dispatch(showProgressBar(true));
        dispatch(() => {
          getUserSavedAddress(
            dispatch,
            navigation,
            userToken,
            addressSuccessCallback,
            addressErrorCallback,
            BannerErrorCallback,
          );
        });
      }
    } else {
    }
  }, [isFocused]);

  const theme = useContext(themeContext);

  const onDeleteClick = (id, index) => {
    const updatedData = [...addressList];
    updatedData.splice(index, 1);
    setAddressList(updatedData);
    dispatch(showProgressBar(true));

    if (updatedData?.length == 0) {
      setShowAddressAddBtn(true);
    }

    dispatch(() => {
      removeUserAddress(
        dispatch,
        navigation,
        userToken,
        id,
        addressDeleteSuccessCallback,
        addressDeleteErrorCallback,
        BannerErrorCallback,
      );
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        // activeOpacity={0.8}
        style={[
          styles.wrapperOrder,
          {
            elevation: 2,
            backgroundColor: theme?.colors?.bg_color,
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
              styles.imagestyle,
              {
                backgroundColor: theme?.colors?.colorimageback,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-start',
              },
            ]}>
            <Image
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                alignSelf: 'center',
                tintColor: theme?.colors?.white,
              }}
              // source={{
              //   uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoB3mYtLafUiRQEUeY7dQVt-rX0w7NF1kRa7SsXA3Nm2cBixmQUYZWYjgAT-5wVg3A7sM&usqp=CAU',
              // }}
              source={icons.address}
            />
          </View>
          <View style={styles.innnerWrapperOrder}>
            <View
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  // flexGrow: 1,
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                }}>
                <Text
                  style={[
                    styles.textName,
                    {
                      alignSelf: 'flex-start',
                      color: theme?.colors?.white,
                    },
                  ]}>
                  {item?.name}
                </Text>

                {item?.defaultAddress == 1 ? (
                  <Text
                    style={[
                      styles.textName,
                      {
                        fontFamily: FONTS?.regular,
                        color: theme?.colors?.text,
                        backgroundColor: theme?.colors?.colorPrimary,
                        elevation: 10,
                        fontSize: 12,
                        marginStart: 10,
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                        borderRadius: 5,
                        alignSelf: 'flex-start',
                      },
                    ]}
                    numberOfLines={1}>
                    {item?.defaultAddress == 1 ? 'Default' : ''}
                  </Text>
                ) : null}
              </View>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                    fontSize: 13,
                  },
                ]}>
                Email: {item?.email}
              </Text>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                    fontSize: 13,
                  },
                ]}>
                Phone: {item?.phone}
              </Text>
              <Text
                ellipsizeMode="tail"
                style={[
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                    marginTop: 8,
                    fontFamily: FONTS?.regular,
                  },
                ]}>
                {item?.address}
              </Text>
            </View>
            <View>
              <ToolBarIcon
                title={MaterialIcons}
                iconName={'edit'}
                icSize={18}
                icColor={theme?.colors?.text}
                style={{
                  backgroundColor: theme?.colors?.colorPrimary,
                  marginEnd: 10,
                  marginBottom: 10,
                  borderRadius: 10,
                }}
                onPress={() => {
                  navigation.navigate('AddressAddUpdate', {item: item});
                  // ShowToastMessage('Coming soon');
                }}
              />
              <ToolBarIcon
                title={MaterialIcons}
                iconName={'delete'}
                icSize={18}
                icColor={theme?.colors?.text}
                style={{
                  backgroundColor: theme?.colors?.red,
                  marginEnd: 10,
                  borderRadius: 10,
                }}
                onPress={() => {
                  onDeleteClick(item?._id, index);
                }}
              />
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
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              marginStart: 10,
            },
          ]}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <VegUrbanCommonToolBar
          title="Address"
          // title={route?.params?.item?.name + ''}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
          }}
          textStyle={{
            color: theme.colors.textColor,
            fontFamily: FONTS?.bold,
            fontSize: 20,
          }}
        />
      </View>
      {showAddressAddBtn ? (
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
            No saved address found
          </Text>
          <VegUrbanCommonBtn
            height={40}
            width={'100%'}
            borderRadius={20}
            textSize={16}
            textColor={theme?.colors?.text}
            text={'Add New Address'}
            backgroundColor={theme?.colors?.colorPrimary}
            onPress={() => {
              // navigation.navigate('Home');
              navigation.navigate('AddNewAddress');
            }}
            textStyle={{
              fontFamily: FONTS?.bold,
            }}
          />
        </View>
      ) : (
        <>
          <FlatList
            style={{
              paddingStart: 5,
              paddingEnd: 5,
            }}
            ListHeaderComponent={() => {
              return <View style={{}} />;
            }}
            ListHeaderComponentStyle={{
              paddingTop: 5,
            }}
            showsVerticalScrollIndicator={false}
            data={addressList}
            renderItem={renderItem}
          />

          <View
            style={{
              marginHorizontal: 10,
              marginVertical: 10,
            }}>
            <VegUrbanCommonBtn
              height={45}
              width={'100%'}
              borderRadius={20}
              textSize={16}
              textColor={theme?.colors?.text}
              text={'Add New Address'}
              backgroundColor={theme?.colors?.colorPrimary}
              onPress={() => {
                navigation.navigate('AddNewAddress');
              }}
              textStyle={{
                fontFamily: FONTS?.bold,
                color: theme?.colors?.white,
              }}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Address;

const styles = StyleSheet.create({
  buttoninvite: {
    // flex:0.4,
    width: '28%',
    alignItems: 'center',
    borderRadius: 80,
    // paddingVertical:5,
    height: 28,
    justifyContent: 'center',
    // height:10,
    alignSelf: 'center',
  },
  wrapper: {
    padding: 15,
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    // marginVertical: 20,
    borderRadius: 12,
    // paddingBottom: 60

    // paddingVertical:5
  },
  amountwrapper: {
    padding: 15,
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    marginVertical: 20,
    borderRadius: 12,
    marginBottom: 30,
    // paddingBottom: 60

    paddingVertical: 5,
  },
  month: {
    fontSize: 22,
    // fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  monthTitle: {
    fontSize: 14,
    // fontFamily: FONTS.regular,
    color: COLORS.black,
    marginBottom: 2.5,
  },
  wrapperOrder: {
    // padding: 5,
    // margin: 2,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // paddingVertical:5
  },
  imagestyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 5,
  },
  itemImage: {
    width: '30%',
    height: 100,
    borderRadius: 20,
  },
  divLine: {
    height: 0.5,
    width: '95%',
    backgroundColor: COLORS.gray,
    alignSelf: 'center',
    marginVertical: 5,
    marginTop: 10,
  },
  textlable: {
    fontSize: 16,
    color: COLORS?.black,
  },
  amounttext: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS?.black,
  },
  modalBackground: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    width: SIZES.width,
    display: 'flex',
    flexDirection: 'column',
  },
  qtyText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
    flex: 0.3,
  },
  originalPrice: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.black,
    marginStart: 8,

    textDecorationColor: COLORS.black,
  },
  deleteSaveText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.red,
    textAlign: 'center',
    flex: 1,
    marginTop: 5,
  },
  image: {
    height: 90,
    width: '28%',
    // margin:6,
    marginTop: 5,
    resizeMode: 'stretch',
    borderRadius: 5,
  },
  innnerWrapper: {
    flex: 1,
    marginStart: 10,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innnerWrapperOrder: {
    flex: 1,
    marginStart: 10,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textName: {
    fontFamily: FONTS?.semi_old,
    fontSize: 18,
    color: COLORS.black,
  },
  discountPrice: {
    // fontFamily: 'OpenSans-SemiBold',
    fontFamily: FONTS?.regular,

    fontSize: 13,
    color: COLORS.black,
  },
  // qtyText: {
  //   fontFamily: 'OpenSans-Regular',
  //   fontSize: 13,
  //   color: COLORS.black,
  // },
  finalPriceText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 17,
    color: COLORS.colorPrimary,
    marginTop: 3,
  },
  createProfile: {
    fontSize: 16,
    // fontFamily: FONTS.regular,
    color: COLORS.grey,
    lineHeight: 24,
    alignSelf: 'center',
  },
  label: {
    fontSize: 20,
    marginTop: 16,
    color: COLORS.black,

    fontWeight: 'bold',
    fontFamily: FONTS.medium,
    // fontFamily: FONTS.semi_bold,
  },
});
