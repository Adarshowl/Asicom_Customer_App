import React, {memo, useContext, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  I18nManager,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS} from '../../constants/Colors';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import {icons, STRING} from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';
import PaymentItem from './PaymentItem';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {useTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../../constants/Fonts';

import {
  ShowConsoleLogMessage,
  ShowToastMessage,
  validateFieldNotEmpty,
} from '../../utils/Utility';
import themeContext from '../../constants/themeContext';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  createUserOrder,
  emptyCartInOneShot,
  getAvailablePaymentMethods,
  getSecretForStripe,
} from '../../redux/actions/CartApi';
import {showProgressBar} from '../../redux/actions';
import {confirmPayment, usePaymentSheet} from '@stripe/stripe-react-native';
import {updateCartDataLength} from '../../redux/actions/HomeApi';

const Payment = ({route}) => {
  const {initPaymentSheet, presentPaymentSheet, loading} = usePaymentSheet();

  const dispatch = useDispatch();
  // const isFocused = useIsFocused();
  const loginCount = useSelector(state => state?.state?.count);
  const userToken = useSelector(state => state?.state?.userToken);
  const userData = useSelector(state => state?.state?.userData);
  const [orderId, setOrderId] = useState('');
  const [payData, setPayData] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [currencyData, setCurrencyData] = useState(null);

  const navigation = useNavigation();
  const [show, setShow] = useState(false);

  const theme = useContext(themeContext);
  const {t, i18n} = useTranslation();

  const [receivedItem, setReceivedItem] = useState(null);

  useEffect(() => {
    let {item} = route?.params;

    setReceivedItem(item);
    // ShowConsoleLogMessage(JSON.stringify(item));
    dispatch(showProgressBar(true));
    dispatch(() => {
      getAvailablePaymentMethods(
        dispatch,
        navigation,
        paymentSuccessCallback,
        paymentFailureCallback,
        paymentErrorCallback,
      );
    });
  }, []);

  const paymentSuccessCallback = data => {
    // ShowConsoleLogMessage(JSON.stringify(data?.response));
    dispatch(showProgressBar(false));
    // let a = data?.response?.map(item => {
    //   return {
    //     ...item,
    //     selected: false,
    //   };
    // });

    let a = data?.paymentData?.map(item => {
      return {
        ...item,
        selected: false,
      };
    });
    setSelectedPaymentId(null);
    setCurrencyData(data?.currencyData);
    setPayData(a);
  };
  const paymentFailureCallback = data => {
    dispatch(showProgressBar(false));
    setSelectedPaymentId(null);
    setPayData([]);
    setTimeout(() => {
      ShowToastMessage(data?.message || 'Something went wrong.');
    }, 100);
  };
  const orderSuccessCallback = data => {
    // ShowConsoleLogMessage(JSON.stringify(data?.response));
    dispatch(showProgressBar(false));
    setIsModalVisible(!isModalVisible);
    // setOrderId(data?.orderIds[0] + '');
    clearCart();
  };

  const stripeSuccessCallback = data => {
    initializePaymentSheet(
      data?.data?.ephemeralKey,
      data?.data?.paymentIntent,
      data?.data?.customer,
    );
    dispatch(showProgressBar(false));
  };
  const stripeErrorCallback = data => {
    ShowConsoleLogMessage(JSON.stringify(data));
    ShowToastMessage(JSON.stringify(data?.message));
    dispatch(showProgressBar(false));
  };

  const initializePaymentSheet = async (
    ephemeralKey,
    paymentIntent,
    customer,
  ) => {
    // ShowConsoleLogMessage(
    //   ephemeralKey + ' ==== ' + paymentIntent + ' ==== ' + customer,
    // );

    const {error} = await initPaymentSheet({
      customerId: customer,

      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: 'Multi Vendor',
      allowsDelayedPaymentMethods: true,

      googlePay: true,
      applePay: true,
      merchantCountryCode: 'US',
      testEnv: true,
      // returnURL: 'com.multi_vendor://stripe-redirect',
    });
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error?.message);
    } else {
      // await new Promise(resolve => setTimeout(resolve, 2500));
      await presentSheet(paymentIntent);
    }
  };

  const presentSheet = async paymentIntent => {
    ShowConsoleLogMessage('presentSheet   ');
    const {error} = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error?.message);
    } else {
      // Alert.alert('Success', 'Payment done successfully');
      confirmPaymentSheet1(paymentIntent);
      // handleConfirmPayment();
    }
  };

  const confirmPaymentSheet1 = async clientSecret => {
    try {
      confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
      })
        .then(confirmPayments => {
          console.log(confirmPayments, ' -> confirmPayments');
        })
        .catch(error => {
          console.log(error, ' -> error ');
        });
    } catch (error) {
      console.error(error);
    }
  };

  const clearCart = () => {
    // ShowConsoleLogMessage('clear cart');
    dispatch(updateCartDataLength(0));
    dispatch(() => {
      emptyCartInOneShot(
        dispatch,
        navigation,
        userToken,
        () => {},
        () => {},
        paymentErrorCallback,
      );
    });
  };

  const orderFailureCallback = data => {
    dispatch(showProgressBar(false));
    // setOrderId('');

    setTimeout(() => {
      ShowToastMessage(data?.message || 'Something went wrong.');
    }, 100);
  };

  const paymentErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    // ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };

  const renderModal = () => {
    return (
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          // setIsModalVisible(!isModalVisible);
        }}
        // onBackdropPress={closeModal}
        animationIn="slideInUp" // Specify the desired animation
        animationOut="slideOutDown"
        backdropOpacity={0.5} // Adjust the backdrop opacity
        style={styles.modal}>
        <View
          style={[
            styles.modalBackground,
            {
              // backgroundColor: theme.colors.transparent,
            },
          ]}>
          <View
            style={[
              styles.activityIndicatorWrapper,
              {
                // backgroundColor:'#1F222B',
                backgroundColor: theme.colors.orderplace,
              },
            ]}>
            <Image
              style={{
                width: 120,
                height: 120,
                alignItems: 'center',
                // alignSelf: 'center',
                // resizeMode: 'center',
                borderRadius: 10,
                marginTop: 30,
                tintColor: theme?.colors?.white,
              }}
              // style={styles.itemImage}
              // source={{
              //     uri:'blob:https://web.whatsapp.com/56ca0fa5-b9ad-4739-8383-3db809a55475'
              // }}
              // source={icons.order_successful}
              source={icons.order}
            />

            <Text
              style={[
                styles.order_placed,
                {
                  color: theme?.colors?.textColor,
                  marginTop: 20,
                  fontFamily: FONTS?.bold,
                },
              ]}>
              {STRING.order_placed1}
            </Text>
            <Text
              style={[
                styles.success_order,
                {
                  color: theme?.colors?.textColor,
                  marginBottom: 5,
                  marginTop: 20,
                },
              ]}>
              {STRING.success_order}
            </Text>

            <VegUrbanCommonBtn
              height={40}
              width={'80%'}
              borderRadius={30}
              textSize={16}
              marginTop={20}
              text={'View all orders'}
              textColor={theme?.colors?.text}
              backgroundColor={theme?.colors?.colorPrimary}
              onPress={() => {
                dispatch(updateCartDataLength(0));
                // navigation.navigate('Order');
                navigation.navigate('MainContainer', {
                  screen: 'Order',
                });
              }}
              textStyle={{
                fontFamily: FONTS?.bold,
              }}
            />
            {/*<VegUrbanCommonBtn*/}
            {/*  height={40}*/}
            {/*  width={'80%'}*/}
            {/*  borderRadius={30}*/}
            {/*  textSize={16}*/}
            {/*  text={'Track order'}*/}
            {/*  textColor={theme?.colors?.textColor}*/}
            {/*  backgroundColor={theme?.colors?.addtocart}*/}
            {/*  marginTop={20}*/}
            {/*  onPress={() => {*/}
            {/*    //   navigation.replace('ERecipt', {*/}
            {/*    // intentFrom:""*/}
            {/*    //   });*/}
            {/*    navigation.replace('TrackList', {*/}
            {/*      item: {_id: orderId, intentFromPayment: true},*/}
            {/*    });*/}
            {/*    // ShowToastMessage('Coming soon');*/}
            {/*  }}*/}
            {/*  textStyle={{*/}
            {/*    fontFamily: FONTS?.bold,*/}
            {/*  }}*/}
            {/*/>*/}
          </View>
        </View>
      </Modal>
    );
  };

  const handleConfirmPayment = () => {
    dispatch(showProgressBar(true));

    dispatch(() => {
      createUserOrder(
        dispatch,
        navigation,
        userToken,
        receivedItem?.cartData?.toString(),
        // receivedItem?.finalAmount + '',
        // selectedPaymentId,
        selectedPaymentId?.payment_method_name,
        receivedItem?.addressId,
        orderSuccessCallback,
        orderFailureCallback,
        paymentErrorCallback,
      );
    });
  };

  const getStripeDetails = () => {
    dispatch(showProgressBar(true));

    dispatch(() => {
      getSecretForStripe(
        dispatch,
        navigation,
        userToken,
        userData?.email,
        receivedItem?.finalAmount + '',
        stripeSuccessCallback,
        stripeErrorCallback,
        paymentErrorCallback,
      );
    });
  };

  const onPaymentClick = (item, idx) => {
    let a = payData.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        temp.selected = !temp.selected;
        if (temp.selected) {
          setSelectedPaymentId(item);
        } else {
          setSelectedPaymentId(null);
        }
      } else {
        temp.selected = false;
      }
      return temp;
    });
    setPayData(a);
  };
  return (
    <View
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}
      showsVerticalScrollIndicator={false}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
          },
        ]}>
        <Ionicons
          name="ios-arrow-back"
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
          }}
        />

        <VegUrbanCommonToolBar
          title="Payment Methods"
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

        {/*<Ionicons*/}
        {/*  name="scan-sharp"*/}
        {/*  color={theme.colors.textColor}*/}
        {/*  size={25}*/}
        {/*  style={[*/}
        {/*    styles.backIcon,*/}
        {/*    {*/}
        {/*      opacity: !show ? 1 : 0.0,*/}
        {/*      marginEnd: 15,*/}
        {/*    },*/}
        {/*  ]}*/}
        {/*  onPress={() => {*/}
        {/*    ShowToastMessage('Coming Soon');*/}
        {/*  }}*/}
        {/*/>*/}
      </View>

      <ScrollView
        contentContainerStyle={{
          backgroundColor: theme?.colors?.bg_color_onBoard,
        }}>
        <View
          style={{
            backgroundColor: theme?.colors?.bg_color_onBoard,
            marginTop: 5,
          }}>
          <Text
            style={[
              styles.prefDeliText,
              {
                marginStart: 15,
                marginEnd: 10,
                marginTop: 15,
                color: theme?.colors?.colorPrimary,
              },
            ]}>
            {STRING.payment_method}
          </Text>
          <FlatList
            style={{
              paddingStart: 10,
              paddingEnd: 5,
            }}
            ListHeaderComponent={() => {
              return <View style={{}} />;
            }}
            ListHeaderComponentStyle={{
              paddingTop: 15,
            }}
            ListFooterComponent={() => {
              return <View style={{}} />;
            }}
            ListFooterComponentStyle={{
              paddingBottom: 15,
            }}
            showsVerticalScrollIndicator={false}
            data={payData}
            renderItem={({item, index}) => (
              <PaymentItem
                onItemClick={() => {
                  onPaymentClick(item, index);
                }}
                item={item}
              />
            )}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginHorizontal: 22,
            marginVertical: 10,
          }}>
          {/*<VegUrbanCommonBtn*/}
          {/*  height={40}*/}
          {/*  width={'100%'}*/}
          {/*  borderRadius={15}*/}
          {/*  textSize={16}*/}
          {/*  fontWeight={'bold'}*/}
          {/*  // marginTop={0}*/}
          {/*  text={t('Add New Card')}*/}
          {/*  textColor={theme.colors?.textColor}*/}
          {/*  backgroundColor={theme.colors?.colorimageback}*/}
          {/*  onPress={() => {*/}
          {/*    ShowToastMessage('Coming soon!');*/}
          {/*    // navigation.navigate('AddNewCard');*/}
          {/*  }}*/}
          {/*  textStyle={{*/}
          {/*    fontFamily: FONTS?.bold,*/}
          {/*  }}*/}
          {/*/>*/}
        </View>
      </ScrollView>
      <View
        style={{
          alignItems: 'center',
          marginTop: 10,
          marginBottom: 10,
        }}>
        <VegUrbanCommonBtn
          height={40}
          width={'90%'}
          borderRadius={20}
          textSize={18}
          text={'Confirm Order'}
          textColor={theme?.colors?.text}
          backgroundColor={theme.colors?.colorPrimary}
          onPress={() => {
            // navigation.navigate('ConfirmPayment');
            if (validateFieldNotEmpty(selectedPaymentId)) {
              ShowToastMessage('Please select payment method');
            } else {
              if (
                selectedPaymentId?.payment_method_name?.toLowerCase() ==
                'stripe'
              ) {
                // getStripeDetails();
                // navigation.navigate('StripePayment');
                navigation.navigate('StripePayment', {
                  item: {
                    finalAmount: receivedItem?.finalAmount,
                    selectedPaymentId: selectedPaymentId?.payment_method_name,
                    addressId: receivedItem?.addressId,
                  },
                });
              } else if (
                selectedPaymentId?.payment_method_name?.toLowerCase() ==
                'paypal'
              ) {
                // getStripeDetails();
                // navigation.navigate('StripePayment');
                navigation.navigate('PayPalPayment', {
                  item: {
                    finalAmount: receivedItem?.finalAmount,
                    selectedPaymentId: selectedPaymentId?.payment_method_name,
                    addressId: receivedItem?.addressId,
                    paymentItem: selectedPaymentId,
                    currencyData: currencyData,
                  },
                });
              } else {
                handleConfirmPayment();
              }
              // setIsModalVisible(!isModalVisible);
            }
          }}
          textStyle={{
            fontFamily: FONTS?.bold,
            // textAlign:'center',
            // alinItem:'center'
          }}
        />
      </View>
      {renderModal()}
    </View>
  );
};
export default memo(Payment);

// export default Payment;
const styles = StyleSheet.create({
  prefDeliText: {
    fontFamily: FONTS?.medium,
    fontSize: 17,
    color: COLORS.colorPrimary,
    marginStart: 15,
    marginTop: 8,
  },
  divLine: {
    height: 0.5,
    width: '95%',
    backgroundColor: COLORS.gray,
    alignSelf: 'center',
    marginVertical: 5,
  },

  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    // width: SIZES.width - 20,
    paddingHorizontal: 20,
    alignSelf: 'center',
    // padding: 5,
    alignItems: 'center',
    width: '80%',
    // height: 450,
    paddingBottom: 30,
    // marginHorizontal:80,
  },
  order_placed: {
    color: COLORS.black,
    fontSize: 22,
    fontFamily: FONTS?.regular,
    textAlign: 'center',
    marginTop: 10,
  },
  success_order: {
    color: COLORS.grey,
    fontSize: 16,
    fontFamily: FONTS?.medium,
    textAlign: 'center',
    marginTop: 10,
  },
});
