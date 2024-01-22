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
import GlobalStyle from '../../styles/GlobalStyle';
import {icons, STRING} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartItem from './CartItem';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';
import {FONTS} from '../../constants/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {
  couponItem,
  decreaseProductQtyCart,
  getUserCartProduct,
  increaseProductQtyCart,
  removeProductFromCart,
} from '../../redux/actions/CartApi';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import {useIsFocused} from '@react-navigation/native';
import {showProgressBar} from '../../redux/actions';
import {
  doSaveProductCart,
  getSavedCartProduct,
  removeFromCartRealm,
} from '../../utils/RealmUtility';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText';
import {updateCartDataLength} from '../../redux/actions/HomeApi';

const Cart = ({navigation}) => {
  const theme = useContext(themeContext);
  const dispatch = useDispatch();
  const loginCount = useSelector(state => state?.state?.count);
  const userToken = useSelector(state => state?.state?.userToken);
  // ShowConsoleLogMessage(userToken);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const [text, setText] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    // ShowConsoleLogMessage(userToken);
    if (loginCount == 1) {
      if (isFocused) {
        setShowSearch(false);
        setText('');
        dispatch(showProgressBar(true));
        dispatch(couponItem({}));
        dispatch(() => {
          getUserCartProduct(
            dispatch,
            navigation,
            userToken,
            successCallback,
            errorCallback,
            BannerErrorCallback,
          );
        });
      }
    } else {
      setShowSearch(false);
      setText('');
      dispatch(showProgressBar(true));
      getFromLocal();
    }
  }, [isFocused, loading]);

  const getFromLocal = () => {
    getSavedCartProduct()
      .then(res => {
        if (res?.length > 0) {
          setCartData(res);
          setMasterCartData(res);
          let sum = 0;
          res?.forEach(item => {
            if (item?.product_id?.is_flash_deal == 'Active') {
              // console.log(
              //   '              sum += parseInt(item?.amount); if part\n',
              // );
              sum +=
                parseInt(item?.product_id?.amount) -
                ((parseInt(item?.product_id?.amount) *
                  parseInt(item?.product_id?.flash_offer_percentage)) /
                  100) *
                  parseInt(item?.quantity);
            } else {
              sum += parseInt(item?.amount);
            }
          });
          setAmount(parseInt(sum));
          dispatch(showProgressBar(false));
          dispatch(updateCartDataLength(res?.length));
        } else {
          dispatch(updateCartDataLength(0));
          dispatch(showProgressBar(false));
          setShowCartEmpty(true);
          setCartData([]);
          setMasterCartData([]);
        }
      })
      .catch(() => {
        setCartData([]);
        setMasterCartData([]);
        setShowCartEmpty(true);
        dispatch(updateCartDataLength(0));
        dispatch(showProgressBar(false));
      })
      .finally(() => {
        dispatch(showProgressBar(false));
      });
  };

  const successCallback = async data => {
    // ShowConsoleLogMessage('successCallback called after');
    dispatch(showProgressBar(false));
    setCartData(data?.response);
    setMasterCartData(data?.response);

    let sum = 0;
    // data?.response?.forEach(item => {
    //   sum += item?.amount;
    // });

    data?.response?.forEach(item => {
      if (item?.product_id?.is_flash_deal == 'Active') {
        // console.log('              sum += parseInt(item?.amount); if part\n');
        const fa =
          ((parseInt(item?.product_id?.amount) *
            parseInt(item?.product_id?.flash_offer_percentage)) /
            100) *
          parseInt(item?.quantity);

        // sum +=
        //   parseInt(item?.product_id?.amount) -
        //   ((parseInt(item?.product_id?.amount) *
        //     parseInt(item?.product_id?.flash_offer_percentage)) /
        //     100) *
        //     parseInt(item?.quantity);
        sum +=
          parseInt(item?.product_id?.amount) * parseInt(item?.quantity) - fa;
      } else {
        sum += parseInt(item?.amount);
      }
    });

    setAmount(parseInt(sum));

    setLoading(false);
    dispatch(updateCartDataLength(data?.response?.length));

    setShowCartEmpty(data?.response?.length <= 0);
  };

  const errorCallback = async data => {
    setShowCartEmpty(true);
    setCartData([]);
    setMasterCartData([]);
    dispatch(showProgressBar(false));
    setLoading(false);
    dispatch(updateCartDataLength(0));

    // setTimeout(() => {
    //   ShowToastMessage(data?.message || 'Something went wrong.');
    // }, 100);
  };

  const BannerErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    // ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };

  const {t} = useTranslation();
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);

  const [amount, setAmount] = useState(null);

  const [cartData, setCartData] = useState([]);
  const [masterCartData, setMasterCartData] = useState([]);
  const [showCartEmpty, setShowCartEmpty] = useState(false);
  const [saveLaterData, setSaveLaterData] = useState([]);

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      const newData = masterCartData.filter(function (item) {
        // console.log('<<<<<< ', JSON.stringify(item));
        const itemData =
          item?.product_id?.product_name || item?.product_name
            ? item?.product_id?.product_name?.toUpperCase() ||
              item.product_name.toUpperCase()
            : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setCartData(newData);
      setText(text);
    } else {
      setCartData(masterCartData);
      setText(text);
    }
  };

  const onAddClick = item => {
    if (loginCount == 1) {
      if (
        item?.quantity !=
        item?.product_id?.quantity - item?.product_id?.sold
      ) {
        setLoading(true);
        dispatch(() => {
          increaseProductQtyCart(
            dispatch,
            navigation,
            userToken,
            item?.product_id?._id + '',
            item?._id + '',
            parseInt(item?.quantity) + 1 + '',
            parseInt(item?.product_id?.amount) * (parseInt(item?.quantity) + 1),
            item?.color,
            item?.size,
            () => {
              setLoading(false);
            },
            () => {
              setLoading(false);
            },
            BannerErrorCallback,
          );
        });
      } else {
        ShowToastMessage('Max quantity reached');
      }
      // dispatch(() => {
      //   getUserCartProduct(
      //     dispatch,
      //     userToken,
      //     successCallback,
      //     errorCallback,
      //     BannerErrorCallback,
      //   );
      // });
    } else {
      if (
        item?.quantity !=
        parseInt(item?.original_quantity) - parseInt(item?.sold)
      ) {
        doSaveProductCart(
          item?.listID + '',
          item?.original_amount,
          item?.original_quantity,
          parseInt(item?.original_amount) * (parseInt(item?.quantity) + 1) + '',
          parseInt(item?.quantity) + 1 + '',
          item?.color,
          item?.size,
          item?.sold,
          '',
          '',
        );
        getFromLocal();
      } else {
        ShowToastMessage('Max quantity reached');
      }
    }
  };
  const onMinusClick = item => {
    if (loginCount == 1) {
      setLoading(true);
      if (item?.quantity > 1) {
        // ShowConsoleLogMessage('if part');
        dispatch(() => {
          decreaseProductQtyCart(
            dispatch,
            navigation,
            userToken,
            item?.product_id?._id + '',
            item?._id + '',
            parseInt(item?.quantity) - 1 + '',
            parseInt(item?.product_id?.amount) * (parseInt(item?.quantity) - 1),
            item?.color,
            item?.size,
            () => {
              setLoading(false);
            },
            () => {
              setLoading(false);
            },
            BannerErrorCallback,
          );
        });

        // dispatch(() => {
        //   getUserCartProduct(
        //     dispatch,
        //     userToken,
        //     successCallback,
        //     errorCallback,
        //     BannerErrorCallback,
        //   );
        // });
      } else {
        // ShowConsoleLogMessage('else part');

        dispatch(() => {
          removeProductFromCart(
            dispatch,
            navigation,
            userToken,
            item?._id + '',
            () => {
              setLoading(false);
            },
            () => {
              setLoading(false);
            },
            BannerErrorCallback,
          );
        });

        // dispatch(() => {
        //   getUserCartProduct(
        //     dispatch,
        //     userToken,
        //     successCallback,
        //     errorCallback,
        //     BannerErrorCallback,
        //   );
        // });
      }
    } else {
      // ShowConsoleLogMessage(item?.listID);
      if (item?.quantity > 1) {
        doSaveProductCart(
          item?.listID + '',
          item?.original_amount,
          item?.original_quantity,
          parseInt(item?.original_amount) * (parseInt(item?.quantity) - 1) + '',
          parseInt(item?.quantity) - 1 + '',
          item?.color,
          item?.size,
          item?.sold,

          '',
          '',
        );
        getFromLocal();
      } else {
        removeFromCartRealm(item?.listID);
        dispatch(showProgressBar(true));
        getFromLocal();
      }
    }
  };

  const onDeleteClick = item => {
    // let a = cartData.filter((item, index) => item?.name != idx);
    // setCartData(a);

    if (loginCount == 1) {
      dispatch(() => {
        removeProductFromCart(
          dispatch,
          navigation,
          userToken,
          item?._id + '',
          () => {
            dispatch(() => {
              getUserCartProduct(
                dispatch,
                navigation,
                userToken,
                successCallback,
                errorCallback,
                BannerErrorCallback,
              );
            });
          },
          () => {
            dispatch(() => {
              getUserCartProduct(
                dispatch,
                navigation,
                userToken,
                successCallback,
                errorCallback,
                BannerErrorCallback,
              );
            });
          },
          BannerErrorCallback,
        );
      });
    } else {
      removeFromCartRealm(item?.listID);
      dispatch(showProgressBar(true));
      getFromLocal();
    }
  };
  const onSaveLaterClick = idx => {
    let a = cartData.filter((item, index) => item?.name == idx);
    setSaveLaterData([...saveLaterData, ...a]);
    let b = cartData.filter((item, index) => item?.name != idx);
    setCartData(b);
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
          color={theme.colors.white}
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
          }}
        />
        <VegUrbanCommonToolBar
          title="Cart"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
            fontFamily: FONTS?.bold,
          }}
          textStyle={{
            color: theme.colors.white,
            fontFamily: FONTS?.bold,
            fontSize: 20,
          }}
        />
        {/*{loginCount == 1 ? (*/}
        {showCartEmpty ? null : (
          // <AntDesign
          //   name={'search1'}
          //   size={26}
          //   style={{
          //     marginEnd: 15,
          //   }}
          //   color={theme?.colors?.white}
          //   onPress={() => {
          //     // navigation.navigate('Search');
          //     if (cartData?.length != 0) {
          //       setShowSearch(!showSearch);
          //       setText('');
          //     }
          //   }}
          // />
          <TouchableOpacity
            style={{
              marginEnd: 15,
            }}
            onPress={() => {
              if (cartData?.length != 0) {
                setShowSearch(!showSearch);
                setText('');
              }
            }}>
            <Image
              source={icons.search}
              style={{
                height: 22,
                width: 22,
                tintColor: theme?.colors?.white,
              }}
            />
          </TouchableOpacity>
        )}
        {/*) : null}*/}
      </View>
      {/*{loginCount == 1 ? (*/}
      <View
        style={{
          flex: 1,
        }}>
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
              Cart is empty
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
          <View
            style={{
              flex: 1,
            }}>
            {showSearch ? (
              <View
                style={{
                  paddingHorizontal: 10,
                }}>
                <VegUrbanEditText
                  placeholder={'Search by name'}
                  // label={STRING.email}
                  iconPosition={'right'}
                  value={text}
                  style={{
                    color: theme?.colors?.textColor,
                  }}
                  icon={
                    <AntDesign
                      name={'close'}
                      size={20}
                      onPress={() => {
                        setShowSearch(false);
                        setText('');
                        setCartData(masterCartData);
                      }}
                      color={theme?.colors?.grey}
                      style={{}}
                    />
                  }
                  keyBoardType={'default'}
                  onChangeText={v => {
                    searchFilterFunction(v);
                  }}
                />
              </View>
            ) : null}
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
              data={cartData}
              extraData={cartData}
              renderItem={({item, index}) => (
                <CartItem
                  fromSave={true}
                  item={item}
                  onAdd={() => {
                    onAddClick(item);
                  }}
                  onMinus={() => {
                    onMinusClick(item);
                  }}
                  onDelete={() => {
                    // ShowConsoleLogMessage('called');
                    onDeleteClick(item);
                  }}
                  onSaveLater={() => {
                    // onSaveLaterClick(item?.name);
                  }}
                />
              )}
              ListEmptyComponent={() => {
                return text ? (
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
                    No results found
                  </Text>
                ) : null;
              }}
            />
          </View>
        )}
        {cartData?.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
              borderRadius: 5,
              paddingHorizontal: 5,
              marginVertical: 0,
              marginHorizontal: 0,
              marginTop: 10,
              // paddingVertical:10,
              backgroundColor: theme?.colors?.bg,
              paddingRight: 20,
            }}>
            <View
              style={{
                paddingStart: 5,
              }}>
              <Text
                style={{
                  fontFamily: FONTS?.medium,
                  fontSize: 14,
                  // fontWeight:'bold',
                  color: theme?.colors?.textColor,
                  marginLeft: 20,
                }}>
                Total Price
              </Text>
              <Text
                style={{
                  fontFamily: FONTS?.bold,

                  fontSize: 20,
                  color: theme?.colors?.colorPrimary,
                  marginLeft: 20,
                }}>
                {STRING.APP_CURRENCY}
                {amount}
              </Text>
            </View>
            <View
              style={{
                // marginRight: 50,
                flex: 1,
              }}
            />
            <VegUrbanCommonBtn
              height={40}
              width={'55%'}
              borderRadius={20}
              textSize={16}
              iconPosition={'right'}
              icon={
                <Octicons
                  name={'arrow-right'}
                  size={20}
                  color={theme?.colors?.text}
                  style={{
                    // marginHorizontal: 20,
                    marginStart: 15,
                  }}
                />
              }
              textColor={theme.colors?.text}
              text={t('Check Out')}
              backgroundColor={theme?.colors?.colorPrimary}
              onPress={() => {
                // ShowConsoleLogMessage('Coming soon');
                if (loginCount == 1) {
                  navigation.navigate('Checkout');
                } else {
                  navigation.navigate('Auth', {screen: 'Login'});
                }
              }}
              textStyle={{
                fontFamily: FONTS?.bold,
              }}
            />
          </View>
        ) : null}
      </View>
      {/*) : (*/}
      {/*  <View*/}
      {/*    style={{*/}
      {/*      flex: 1,*/}
      {/*      alignItems: 'center',*/}
      {/*      justifyContent: 'center',*/}
      {/*      padding: 20,*/}
      {/*    }}>*/}
      {/*    <Text*/}
      {/*      style={[*/}
      {/*        GlobalStyle.bothSideText,*/}
      {/*        {*/}
      {/*          color: theme?.colors?.white,*/}
      {/*          fontSize: 18,*/}
      {/*          fontFamily: FONTS?.medium,*/}
      {/*          textAlign: 'center',*/}
      {/*          marginBottom: 20,*/}
      {/*        },*/}
      {/*      ]}>*/}
      {/*      Sign to get better experience*/}
      {/*    </Text>*/}
      {/*    <VegUrbanCommonBtn*/}
      {/*      height={40}*/}
      {/*      width={'100%'}*/}
      {/*      borderRadius={20}*/}
      {/*      textSize={16}*/}
      {/*      textColor={theme.colors?.btnTextColor}*/}
      {/*      text={'Sign In'}*/}
      {/*      backgroundColor={theme?.colors?.colorPrimary}*/}
      {/*      onPress={() => {*/}
      {/*        navigation.navigate('Auth', {screen: 'Login'});*/}
      {/*      }}*/}
      {/*      textStyle={{*/}
      {/*        fontFamily: FONTS?.bold,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </View>*/}
      {/*)}*/}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
