import {
  FlatList,
  I18nManager,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import {icons, SIZES, STRING} from '../../constants';
import {FONTS} from '../../constants/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import themeContext from '../../constants/themeContext';
import VegUrbanEditText from '../../utils/EditText/VegUrbanEditText';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {
  ShowConsoleLogMessage,
  ShowToastMessage,
  validateFieldNotEmpty,
} from '../../utils/Utility';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {showProgressBar} from '../../redux/actions';
import {
  getUserCartProduct,
  getUserSavedAddress,
} from '../../redux/actions/CartApi';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import {IMAGE_BASE_URL} from '../../network/ApiEndPoints';

const Checkout = ({navigation, route}) => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const loginCount = useSelector(state => state?.state?.count);
  const userToken = useSelector(state => state?.state?.userToken);
  const couponItem = useSelector(state => state?.cartReducer?.couponItem);
  // ShowConsoleLogMessage(couponItem);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(null);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [promoPrice, setPromoPrice] = useState(0);
  const [showCartEmpty, setShowCartEmpty] = useState(false);

  useEffect(() => {
    if (couponItem?.discount_by == 'percentage') {
    } else {
      setPromoPrice(couponItem?.amount || 0);
      // let sum = 0;
      // cartData?.forEach(item => {
      //   sum += item?.amount;
      // });
      // setAmount(sum);
      // let fA =
      //   parseInt(sum) + parseInt(shippingCharge) - parseInt(couponItem?.amount);
      // setFinalAmount(fA);
    }
  }, [couponItem]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (loginCount == 1) {
      if (isFocused) {
        dispatch(showProgressBar(true));
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
      dispatch(showProgressBar(true));
      // getFromLocal();
    }
  }, [isFocused, loading]);

  const addressSuccessCallback = async data => {
    // ShowConsoleLogMessage(JSON.stringify(data?.response));
    dispatch(showProgressBar(false));
    let a = data?.response?.map(item => {
      // ShowConsoleLogMessage(item);
      if (item?.defaultAddress == 1) {
        setSelectedAddressId(item?._id);
      }
      return {
        ...item,
        selected: item?.defaultAddress == 1 ? true : false,
      };
    });

    setAddressList(a);
    setShowAddressAddBtn(data?.response?.length == 0);
    setLoading(false);
  };

  const addressErrorCallback = async data => {
    setAddressList([]);
    setLoading(false);
    dispatch(showProgressBar(false));
    setShowAddressAddBtn(true);
    setSelectedAddressId('');
    setTimeout(() => {
      ShowToastMessage(data?.message || 'Something went wrong.');
    }, 100);
  };
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const onShippingAddressClick = id => {
    let a = addressList.map(item => {
      let temp = Object.assign({}, item);
      if (temp._id == id) {
        temp.selected = true;
        setSelectedAddressId(temp?._id);
      } else {
        temp.selected = false;
      }
      return temp;
    });
    setAddressList(a);
  };

  const successCallback = async data => {
    // ShowConsoleLogMessage('successCallback called after');
    dispatch(showProgressBar(false));
    setCartData(data?.response);
    let sum = 0;
    let shippinCost = 0;
    // data?.response?.forEach(item => {
    //   //console.log(item);
    //   sum += item?.amount;
    //   if (item?.product_id?.shippingcharges != undefined) {
    //     shippinCost += item?.product_id?.shippingcharges;
    //   } else {
    //     shippinCost += 0;
    //   }
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

      if (item?.product_id?.shippingcharges != undefined) {
        shippinCost += item?.product_id?.shippingcharges;
      } else {
        shippinCost += 0;
      }
    });
    setAmount(parseInt(sum));

    // ShowConsoleLogMessage(shippinCost + ' type of -- ' + typeof shippinCost);
    // ShowConsoleLogMessage(couponItem != {});
    if (Object.keys(couponItem).length != 0) {
      if (couponItem?.discount_by == 'amount') {
        let fA =
          parseInt(sum) + parseInt(shippinCost) - parseInt(couponItem?.amount);
        setFinalAmount(fA);
      } else {
        let fA = parseInt(sum) + parseInt(shippinCost);
        setFinalAmount(fA);

        if (fA > 0 && couponItem?.percentage > 0) {
          const discount = (fA * couponItem?.percentage) / 100;
          const discounted = fA - discount;
          setFinalAmount(discounted);
        }
      }
    } else {
      let fA = parseInt(sum) + parseInt(shippinCost) - parseInt(promoPrice);
      setFinalAmount(fA);
    }
    setLoading(false);
  };

  const errorCallback = async data => {
    setCartData([]);
    dispatch(showProgressBar(false));
    setLoading(false);

    setTimeout(() => {
      ShowToastMessage(data?.message || 'Something went wrong.');
    }, 100);
  };

  const BannerErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    // ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };

  const [finalAmount, setFinalAmount] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const theme = useContext(themeContext);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({
    amount: 1000,
  });

  const renderCouponItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onCouponItemClick(item?.id)}
        style={[
          GlobalStyle.flexRowAlignCenter,
          {
            margin: 10,
            marginTop: item?.popular ? 20 : 10,
            paddingHorizontal: 10,
            paddingVertical: 10,
            paddingBottom: 15,
            borderRadius: 8,
            elevation: 3,
            backgroundColor: theme?.colors?.bg_color_onBoard,
            // justifyContent: 'space-between',
          },
        ]}>
        <View
          style={{
            padding: 15,
            borderRadius: 50,
            // backgroundColor: COLORS.primary,
          }}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOZNiYud9BNDG1nD3l3BjlwQeVMPyX_-Txkg&usqp=CAU',
            }}
            // source={icons.coupon}
            style={{
              height: 35,
              width: 35,
              // tintColor: COLORS.white,
            }}
          />
        </View>
        <View
          style={{
            marginStart: 15,
            flex: 1,
          }}>
          <Text
            style={[
              styles.month,
              {
                color: theme?.colors?.textColor,
              },
            ]}>
            {item?.name}
          </Text>
          <Text
            style={[
              styles.monthTitle,
              {
                color: theme?.colors?.textColor,
              },
            ]}>
            {item?.detail}
          </Text>
        </View>
        <View>
          <MaterialCommunityIcons
            name={item?.selected ? 'circle-slice-8' : 'circle-outline'}
            size={22}
            color={theme?.colors?.textColor}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const onCouponItemClick = id => {
    let a = couponData.map(item => {
      let temp = Object.assign({}, item);
      if (temp.id == id) {
        temp.selected = true;
        setSelectedPromo(temp?.name + '');
      } else {
        temp.selected = false;
      }
      return temp;
    });
    setCouponData(a);
  };

  const [applySuccess, setApplySuccess] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState('');
  const [selectedPromo1, setSelectedPromo1] = useState('');
  const [couponId, setCouponId] = useState('');

  const [couponData, setCouponData] = useState([
    // {
    //   name: 'Special 25% Off',
    //   detail: 'Special promo only today!',
    //   id: 1,
    //   // selected: true,
    // },
    // {
    //   name: 'Discount 30% Off',
    //   detail: 'New user special promo',
    //   id: 2,
    //
    //   // selected: true,
    // },
    // {
    //   name: 'Special 30% Off',
    //   detail: 'Special promo only today!',
    //   id: 3,
    //   color: '#273746',
    //   // selected: true,
    // },
  ]);
  // const [shippingList, setShippingList] = useState([
  //     {
  //         name: 'Office',
  //         add: '345, Second Street ,New York USA',
  //         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxsFJQG3Gt9OQRiG13s5x9gVq-Ci-ZJMwWmw&usqp=CAU'
  //     },
  //
  // ])

  const [addressList, setAddressList] = useState([]);
  const [showAddressAddBtn, setShowAddressAddBtn] = useState(false);

  const [cartData, setCartData] = useState([]);

  const renderShipping = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.wrapper,
          {
            // elevation: 5,
            backgroundColor: theme?.colors?.bg,
          },
        ]}
        onPress={() => onShippingAddressClick(item?._id)}>
        <View
          style={[
            GlobalStyle.flexRowAlignCenter,
            {
              paddingVertical: 10,
              alignItems: 'center',
              // paddingEnd: 15,
              marginLeft: 10,
              marginEnd: 10,
            },
          ]}>
          <Image
            style={{
              width: 35,
              height: 35,
              borderRadius: 50,
              alignSelf: 'flex-start',
              tintColor: theme?.colors?.white,
            }}
            // source={{
            //   uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoB3mYtLafUiRQEUeY7dQVt-rX0w7NF1kRa7SsXA3Nm2cBixmQUYZWYjgAT-5wVg3A7sM&usqp=CAU',
            // }}
            source={icons.address}
          />
          <View style={styles.innnerWrapper}>
            <View
              style={{
                // alignItems: 'center',
                // flex: 1,
                width: '75%',
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
                    marginTop: 5,
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
                style={{
                  fontSize: 14,
                  color: theme?.colors?.white,
                  marginTop: 5,
                  fontFamily: FONTS?.regular,
                  alignSelf: 'flex-start',
                }}>
                {item?.address}
              </Text>
            </View>
          </View>
          <View style={{alignSelf: 'center'}}>
            <MaterialCommunityIcons
              name={item?.selected ? 'circle-slice-8' : 'circle-outline'}
              size={22}
              color={theme?.colors?.colorPrimary}
            />
            {/*<ToolBarIcon*/}
            {/*  title={MaterialIcons}*/}
            {/*  iconName={'edit'}*/}
            {/*  icSize={20}*/}
            {/*  icColor={theme?.colors?.bg}*/}
            {/*  style={{*/}
            {/*    backgroundColor: theme.colors.colorPrimary,*/}
            {/*    height: 25,*/}
            {/*    width: 25,*/}
            {/*  }}*/}
            {/*  onPress={() => {*/}
            {/*    navigation.navigate('ShippingAddress');*/}
            {/*  }}*/}
            {/*/>*/}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCouponModal = () => {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <View style={[styles.modalBackground]}>
          <View
            style={[
              styles.activityIndicatorWrapper,
              {
                maxHeight: SIZES.height * 0.75,
                minHeight: SIZES.height * 0.3,
                backgroundColor: theme?.colors?.bg,
              },
            ]}>
            <View
              style={[
                GlobalStyle.flexRowAlignCenter,
                GlobalStyle.paddingVertical10,
                GlobalStyle.paddingHorizontal15,
              ]}>
              <Text
                style={[
                  styles.label,
                  {
                    marginTop: 0,
                    flex: 1,
                    color: theme?.colors?.textColor,
                  },
                ]}>
                Promo Codes
              </Text>
              <Ionicons
                name={'close'}
                color={COLORS.black}
                size={25}
                onPress={() => setShowModal(false)}
              />
            </View>
            <View
              style={{
                height: 0.5,
                width: '100%',
                // backgroundColor: theme?.colors?.bg_color_onBoard,
              }}
            />

            <FlatList data={couponData} renderItem={renderCouponItem} />

            <VegUrbanCommonBtn
              height={50}
              borderRadius={8}
              marginHorizontal={15}
              marginTop={15}
              text={'Apply code'}
              textColor={theme?.colors?.text}
              backgroundColor={theme?.colors?.colorPrimary}
              textStyle={{
                fontFamily: FONTS?.bold,
              }}
              onPress={() => {
                if (selectedPlan == null) {
                  ShowToastMessage('Please select plan first');
                } else {
                  setLoading(true);
                  let a = couponData?.filter(
                    item => item?.name == selectedPromo,
                  );

                  // setFinalAmount(selectedPlan?.amount - a[0]?.amount);
                  setTimeout(() => {
                    setLoading(false);
                    setApplySuccess(true);
                    setSelectedPromo1(selectedPromo);
                    setShowModal(false);
                  }, 2000);
                }
              }}
              // textColor={COLORS.white}
              textSize={20}
            />
            <View
              style={{
                paddingBottom: 10,
              }}
            />
          </View>
        </View>
      </Modal>
    );
  };
  const renderItem = ({item}) => {
    const fa =
      ((parseInt(item?.product_id?.amount) *
        parseInt(item?.product_id?.flash_offer_percentage)) /
        100) *
      parseInt(item?.quantity);

    return (
      <View
        // activeOpacity={0.8}
        style={[
          styles.wrapperOrder,
          {
            // backgroundColor: '#F2F3F4',
            elevation: 2,
            backgroundColor: theme?.colors?.bg,
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
          <ImageBackground
            style={[
              styles.itemImage,
              {
                // backgroundColor:"#F2F4F4",
                backgroundColor: theme?.colors?.colorimageback,
                alignItems: 'center',
                // alignSelf: 'center',
                justifyContent: 'center',
              },
            ]}>
            <VegUrbanImageLoader
              source={
                item?.product_id?.thumbnail_image
                  ? IMAGE_BASE_URL + item?.product_id?.thumbnail_image
                  : IMAGE_BASE_URL + item?.thumbnail_image
              }
              styles={[
                {
                  width: 90,
                  height: 90,
                  alignSelf: 'center',
                  margin: 8,
                  // resizeMode:'contain',
                  borderRadius: 5,
                  // marginTop: 30
                },
              ]}
            />
          </ImageBackground>
          {/* </ImageBackground> */}
          <View style={styles.innnerWrapperOrder}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                  },
                ]}
                numberOfLines={1}>
                {item?.product_id?.product_name || item?.product_name}
              </Text>
            </View>
            <View
              style={[
                {
                  flexWrap: 'wrap',
                  marginTop: 10,
                },
                GlobalStyle.flexRowAlignCenter,
              ]}>
              <View
                style={{
                  borderRadius: 20,
                  width: 15,
                  height: 15,
                  backgroundColor: item?.color || theme?.colors?.gray,

                  marginEnd: 10,
                  marginTop: 8,
                  marginBottom: 8,
                }}
              />
              <Text
                style={[
                  styles.discountPrice,
                  {
                    color: theme?.colors?.white,

                    // color: COLORS?.black,
                    // color: theme?.colors?.,
                    marginRight: 5,
                  },
                ]}>
                Color
              </Text>
              <View
                style={{
                  // width: 0,
                  // height: 13,
                  paddingVertical: 6,
                  borderWidth: 0.8,
                  borderColor: theme?.colors?.white,
                  marginStart: 7,
                  marginEnd: 10,
                }}
              />
              <Text
                style={[
                  styles.discountPrice,
                  {
                    color: theme?.colors?.white,
                  },
                ]}>
                Size = {item?.size}
              </Text>
              <View
                style={{
                  // width: 0,
                  // height: 13,
                  paddingVertical: 6,
                  borderWidth: 0.8,
                  borderColor: theme?.colors?.white,
                  marginStart: 7,
                  marginEnd: 10,
                }}
              />
              <Text
                style={[
                  styles.discountPrice,
                  {
                    color: theme?.colors?.white,
                  },
                ]}>
                Qty = {item?.quantity}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {item?.product_id?.is_flash_deal == 'Active' ? (
                <Text
                  style={[
                    styles.finalPriceText,
                    {
                      alignSelf: 'flex-start',
                      color: theme?.colors?.colorPrimary,
                      marginTop: 5,
                    },
                  ]}>
                  {STRING.APP_CURRENCY}{' '}
                  {/*{parseInt(item?.product_id?.amount) -*/}
                  {/*  ((parseInt(item?.product_id?.amount) **/}
                  {/*    parseInt(item?.product_id?.flash_offer_percentage)) /*/}
                  {/*    100) **/}
                  {/*    parseInt(item?.quantity)}*/}
                  {parseInt(
                    parseInt(item?.product_id?.amount) *
                      parseInt(item?.quantity) -
                      fa,
                  )}
                </Text>
              ) : (
                <Text
                  style={[
                    styles.finalPriceText,
                    {
                      alignSelf: 'flex-start',
                      color: theme?.colors?.colorPrimary,
                      marginTop: 5,
                    },
                  ]}>
                  {STRING.APP_CURRENCY} {item?.amount}
                </Text>
              )}
              <View
                style={{
                  backgroundColor: theme?.colors?.colorimageback,
                  // paddingHorizontal: 15,
                  borderRadius: 25,
                  // padding: 5,
                  // marginTop: 5,
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: FONTS?.bold,

                    color: theme?.colors?.textColor,
                  }}>
                  {' '}
                  {item?.quantity}{' '}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
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
          title="Check Out"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
          }}
          textStyle={{
            color: theme.colors.white,
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
        {/*  color={theme?.colors?.white}*/}
        {/*/>*/}
      </View>

      <ScrollView>
        <View
          style={[
            GlobalStyle.flexRowAlignCenter,
            {
              marginEnd: 10,
              marginTop: 10,
            },
          ]}>
          <Text
            style={[
              styles.textName,
              {
                alignSelf: 'flex-start',
                color: theme?.colors?.white,
                fontSize: 18,
                marginStart: 16,
                marginTop: 10,
                flex: 1,
              },
            ]}
            numberOfLines={1}>
            Shipping Address
          </Text>

          {/*{showAddressAddBtn ? (*/}
          <VegUrbanCommonBtn
            height={40}
            width={'35%'}
            borderRadius={20}
            textSize={16}
            iconPosition={'right'}
            text={'Add address'}
            textColor={theme.colors?.text}
            backgroundColor={theme.colors?.colorPrimary}
            onPress={() => {
              navigation.navigate('AddNewAddress');
            }}
            textStyle={{
              fontFamily: FONTS?.bold,
              color: theme.colors?.white,
            }}
          />
          {/*) : null}*/}
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
            paddingTop: 5,
          }}
          showsVerticalScrollIndicator={false}
          data={addressList}
          extraData={addressList}
          renderItem={renderShipping}
          ListEmptyComponent={() => {
            return showAddressAddBtn ? (
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'center',
                    color: theme?.colors?.white,
                    fontSize: 14,
                    marginStart: 16,
                    marginTop: 10,
                    flex: 1,
                  },
                ]}
                numberOfLines={1}>
                No saved address found
              </Text>
            ) : null;
          }}
        />
        <View
          style={[
            styles.divLine,
            {
              width: '90%',
            },
          ]}
        />

        <Text
          style={[
            styles.textName,
            {
              alignSelf: 'flex-start',
              color: theme?.colors?.white,
              fontSize: 18,
              marginStart: 16,
              marginTop: 10,
            },
          ]}
          numberOfLines={1}>
          Order List
        </Text>
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
          renderItem={renderItem}
        />

        <View
          style={[
            styles.divLine,
            {
              width: '90%',
            },
          ]}
        />

        {/*<Text*/}
        {/*  style={[*/}
        {/*    styles.textName,*/}
        {/*    {*/}
        {/*      alignSelf: 'flex-start',*/}
        {/*      color: theme?.colors?.white,*/}
        {/*      fontSize: 18,*/}
        {/*      marginStart: 16,*/}
        {/*      marginTop: 10,*/}
        {/*      marginBottom: 10,*/}
        {/*    },*/}
        {/*  ]}*/}
        {/*  numberOfLines={1}>*/}
        {/*  Choose Shipping*/}
        {/*</Text>*/}
        {/*<TouchableOpacity*/}
        {/*  onPress={() => {*/}
        {/*    navigation.navigate('ChooseShipping');*/}
        {/*  }}*/}
        {/*  style={{*/}
        {/*    flexDirection: 'row',*/}
        {/*    justifyContent: 'space-between',*/}
        {/*    marginHorizontal: 10,*/}
        {/*    paddingHorizontal: 20,*/}
        {/*    borderRadius: 12,*/}
        {/*    paddingVertical: 12,*/}
        {/*    alignItems: 'center',*/}
        {/*    backgroundColor: theme?.colors?.bg,*/}
        {/*    marginTop: 10,*/}
        {/*  }}>*/}
        {/*  <View*/}
        {/*    style={{*/}
        {/*      flexDirection: 'row',*/}
        {/*      alignItems: 'center',*/}
        {/*    }}>*/}
        {/*    <FontAwesome5*/}
        {/*      name="truck-moving"*/}
        {/*      size={26}*/}
        {/*      color={theme?.colors?.colorPrimary}*/}
        {/*    />*/}
        {/*    <Text*/}
        {/*      style={[*/}
        {/*        styles.textName,*/}
        {/*        {*/}
        {/*          color: theme?.colors?.white,*/}
        {/*          fontSize: 16,*/}
        {/*          marginStart: 18,*/}
        {/*          // marginTop: 10*/}
        {/*        },*/}
        {/*      ]}*/}
        {/*      numberOfLines={1}>*/}
        {/*      Choose Shipping Type*/}
        {/*    </Text>*/}
        {/*  </View>*/}
        {/*  <MaterialIcons*/}
        {/*    name="keyboard-arrow-right"*/}
        {/*    size={25}*/}
        {/*    color={theme?.colors?.textColor}*/}
        {/*  />*/}
        {/*</TouchableOpacity>*/}
        {/*<View*/}
        {/*  style={[*/}
        {/*    styles.divLine,*/}
        {/*    {*/}
        {/*      width: '90%',*/}
        {/*    },*/}
        {/*  ]}*/}
        {/*/>*/}

        <Text
          style={[
            styles.textName,
            {
              alignSelf: 'flex-start',
              color: theme?.colors?.white,
              fontSize: 20,
              marginStart: 16,
              marginTop: 10,
              marginBottom: 10,
            },
          ]}
          numberOfLines={1}>
          Promo Code
        </Text>
        <View
          style={[
            GlobalStyle.flexRowAlignCenter,
            {
              marginHorizontal: 10,
              // backgroundColor:theme?.colors?.bg
              // marginTop: 20,
            },
          ]}>
          <View
            style={{
              flex: 1,
              marginEnd: 10,
              marginStart: 3,
            }}>
            <VegUrbanEditText
              placeholder={'Enter Promo code'}
              // label={'Promo Code'}
              editable={false}
              fontSize={15.5}
              // color={theme?.colors?.textColor}
              value={couponItem?.coupon_code}
              iconPosition={'right'}
              backgroundColor={theme?.colors?.bg}
              color={theme?.colors?.textColor}
              icon={
                selectedPromo1 ? (
                  <AntDesign
                    onPress={() => {
                      ShowToastMessage('Coupon code removed');
                      setApplySuccess(false);
                      setSelectedPromo1('');
                      setCouponId('');
                      let a = couponData?.map(item => {
                        return {
                          ...item,
                          selected: false,
                        };
                      });
                      setCouponData(a);
                    }}
                    name={'closecircle'}
                    size={20}
                    color={COLORS.red}
                    style={{
                      marginEnd: 5,
                    }}
                  />
                ) : null
              }
              keyBoardType={'email-address'}
              onChangeText={v => setSelectedPromo1(v)}
            />
          </View>
          <TouchableOpacity
            style={[
              ,
              // GlobalStyle.paddingVertical10
              {
                backgroundColor: theme?.colors?.colorPrimary,
                borderRadius: 50,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginEnd: 8,
              },
            ]}
            onPress={() => {
              navigation.navigate('PromoCode');
              // setShowModal(!showModal);
            }}>
            <AntDesign
              name="plus"
              size={25}
              color={theme?.colors?.btnTextColor}
            />
          </TouchableOpacity>
        </View>
        <View
          // activeOpacity={0.8}
          style={[
            styles.amountwrapper,
            {
              backgroundColor: theme?.colors?.bg,
              elevation: 5,
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 5,
              marginVertical: 8,
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles?.textlable,
                {
                  color: theme?.colors?.textColor,
                },
              ]}>
              Amount
            </Text>
            <Text
              style={[
                styles?.amounttext,
                {
                  color: theme?.colors?.textColor,
                },
              ]}>
              {STRING.APP_CURRENCY}
              {amount}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 5,
              marginVertical: 8,
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles?.textlable,
                {
                  color: theme?.colors?.textColor,
                },
              ]}>
              Shipping
            </Text>
            <Text
              style={[
                styles?.amounttext,
                {
                  color: theme?.colors?.textColor,
                },
              ]}>
              {STRING.APP_CURRENCY}
              {shippingCharge}
            </Text>
          </View>
          {Object.keys(couponItem).length == 0 ? null : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 5,
                marginVertical: 8,
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles?.textlable,
                  {
                    color: theme?.colors?.textColor,
                  },
                ]}>
                Promo code
              </Text>
              <Text
                style={[
                  styles?.amounttext,
                  {
                    color: theme?.colors?.textColor,
                  },
                ]}>
                {/*-${promoPrice + ''}*/}
                {couponItem?.discount_by == 'percentage'
                  ? couponItem?.percentage + '%'
                  : couponItem?.amount + ' ' + couponItem?.currency}
              </Text>
            </View>
          )}
          <View
            style={[
              styles.divLine,
              {
                marginTop: 5,
              },
            ]}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 5,
              marginVertical: 8,
            }}>
            <Text
              style={[
                styles?.textlable,
                {
                  color: theme?.colors?.textColor,
                },
              ]}>
              Final Amount
            </Text>
            <Text
              style={[
                styles?.amounttext,
                {
                  color: theme?.colors?.textColor,
                },
              ]}>
              {STRING.APP_CURRENCY}
              {finalAmount}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          alignItems: 'center',
          marginTop: 15,
          marginBottom: 5,
        }}>
        <VegUrbanCommonBtn
          height={40}
          width={'90%'}
          borderRadius={20}
          textSize={16}
          fontWeight={'bold'}
          iconPosition={'right'}
          text={'Continue to Payment'}
          icon={
            <Octicons
              name={'arrow-right'}
              size={20}
              color={theme?.colors?.text}
              // color={theme?.colors?.white}
              style={{
                // marginHorizontal: 20,
                marginStart: 15,
              }}
            />
          }
          textColor={theme.colors?.text}
          backgroundColor={theme.colors?.colorPrimary}
          onPress={() => {
            // closeSignUpModal();
            if (validateFieldNotEmpty(selectedAddressId)) {
              ShowToastMessage('Please select address to proceed');
            } else {
              navigation.navigate('Payment', {
                item: {
                  // cartData: cartData?.map(item => {
                  //   return {
                  //     product_id: item?.product_id?._id,
                  //     variant_id: '',
                  //     amount: item?.amount,
                  //     qty: item?.quantity,
                  //   };
                  // }),

                  cartData: cartData?.map(item => {
                    return item?._id;
                  }),
                  addressId: selectedAddressId,
                  finalAmount: finalAmount,
                },
              });
            }
          }}
          textStyle={{
            fontFamily: FONTS?.bold,
            color: theme.colors?.white,
          }}
        />
      </View>
      {renderCouponModal()}
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    // paddingHorizontal:20,
    // marginVertical: 20,
    borderRadius: 15,
    marginTop: 6,
    elevation: 2,
    marginBottom: 5,
    // paddingBottom: 60

    // paddingVertical:5
  },
  amountwrapper: {
    padding: 15,
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    // marginVertical: 20,
    borderRadius: 12,
    marginBottom: 30,
    // paddingBottom: 60

    // paddingVertical:5
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
    padding: 10,
    borderRadius: 3,
    // margin: 2,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 12,
    // paddingVertical:5
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,

    resizeMode: 'center',
    // alignItems: 'center',
    // resizeMode: 'stretch',
    // marginBottom: 10
  },
  divLine: {
    height: 0.5,
    width: '100%',
    backgroundColor: COLORS.gray,
    alignSelf: 'center',
    marginVertical: 5,
    marginTop: 20,
  },
  textlable: {
    fontSize: 15,
    color: COLORS?.black,
    fontFamily: FONTS?.regular,
  },
  amounttext: {
    fontSize: 16.5,
    color: COLORS?.black,
    fontFamily: FONTS?.bold,
  },
  modalBackground: {
    flex: 1,
    // alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    // borderRadius: 15,
    width: SIZES.width,

    display: 'flex',
    flexDirection: 'column',
    // paddingVertical: 8,
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
    // paddingTop:10
    // resizeMode:'contain',
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
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  textName: {
    fontFamily: FONTS?.medium,
    fontSize: 16,
  },
  discountPrice: {
    // fontFamily: 'OpenSans-SemiBold',
    fontFamily: FONTS?.medium,

    fontSize: 13,
    color: COLORS.black,
  },
  // qtyText: {
  //   fontFamily: 'OpenSans-Regular',
  //   fontSize: 13,
  //   color: COLORS.black,
  // },
  finalPriceText: {
    fontFamily: FONTS?.bold,
    fontSize: 17,
    color: COLORS.colorPrimary,
    marginTop: 3,
  },
  createProfile: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.grey,
    lineHeight: 24,
    alignSelf: 'center',
  },
  label: {
    fontSize: 20,
    marginTop: 16,
    color: COLORS.black,
    fontFamily: FONTS?.bold,

    // fontFamily: FONTS.semi_bold,
  },
});
