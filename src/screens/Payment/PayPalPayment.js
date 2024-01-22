import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import {showProgressBar} from '../../redux/actions';
import {createUserOrder, emptyCartInOneShot} from '../../redux/actions/CartApi';
import {useDispatch, useSelector} from 'react-redux';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import themeContext from '../../constants/themeContext';
import {icons, STRING} from '../../constants';
import {FONTS} from '../../constants/Fonts';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {updateCartDataLength} from '../../redux/actions/HomeApi';
import WebView from 'react-native-webview';
import axios from 'axios';
import qs from 'qs';
import {COLORS} from '../../constants/Colors';

const PayPalPayment = ({navigation, route}) => {
  const userToken = useSelector(state => state?.state?.userToken);
  const userData = useSelector(state => state?.state?.userData);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const theme = useContext(themeContext);

  const handleConfirmPayment = () => {
    dispatch(showProgressBar(true));

    dispatch(() => {
      createUserOrder(
        dispatch,
        navigation,
        userToken,
        receivedItem?.cartData?.toString(),
        // receivedItem?.finalAmount + '',
        receivedItem?.selectedPaymentId,
        receivedItem?.addressId,
        orderSuccessCallback,
        orderFailureCallback,
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

  const orderSuccessCallback = data => {
    // ShowConsoleLogMessage(JSON.stringify(data?.response));
    dispatch(showProgressBar(false));
    setIsModalVisible(!isModalVisible);
    // setOrderId(data?.orderIds[0] + '');
    clearCart();
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

  const paymentErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    // ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };

  const [receivedItem, setReceivedItem] = useState(null);
  const [currencyData, setCurrencyData] = useState(null);

  useEffect(() => {
    let {item} = route?.params;
    // ShowConsoleLogMessage(JSON.stringify(item));
    setReceivedItem(item);
    setCurrencyData(item?.currencyData);

    generatePaypalUrl(item);
  }, []);

  // useEffect(() => {
  //   try {
  //     if (!global?.btoa) {
  //       global.btoa = encode;
  //     }
  //
  //     if (!global?.atob) {
  //       global.atob = decode;
  //     }
  //   } catch (e) {
  //     ShowConsoleLogMessage(e);
  //   }
  // }, []);

  const [loading, setLoading] = useState(false);

  const [isWebViewLoading, SetIsWebViewLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [shouldShowWebViewLoading, setShouldShowWebviewLoading] =
    useState(true);

  const [firstTime, setFirstTime] = useState(true);

  const onWebviewLoadStart = () => {
    if (shouldShowWebViewLoading) {
      SetIsWebViewLoading(true);
    }
  };

  useEffect(() => {
    SetIsWebViewLoading(true);
  }, []);

  const _onNavigationStateChange = webViewState => {
    // console.log('webViewState', webViewState);

    //When the webViewState.title is empty this mean it's in process loading the first paypal page so there is no paypal's loading icon
    //We show our loading icon then. After that we don't want to show our icon we need to set setShouldShowWebviewLoading to limit it
    if (webViewState.title == '') {
      //When the webview get here Don't need our loading anymore because there is one from paypal
      setShouldShowWebviewLoading(false);
    }

    if (webViewState.url.includes(receivedItem?.paymentItem?.test_return_url)) {
      if (firstTime) {
        setFirstTime(false);
        const urlArr = webViewState.url.split(/(=|&)/);
        setLoading(true);
        const paymentId = urlArr[2];
        const payerId = urlArr[10];
        console.log(paymentId + ' --- ' + payerId);
        console.log(accessToken);
        // if (
        //   receivedItem?.paymentItem?.test_payment_url?.contains(
        //     'api.sandbox.paypal.com',
        //   )
        // ) {
        fetch(
          `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, // test
          // `https://api.paypal.com/v1/payments/payment/${paymentId}/execute`, // live
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + accessToken,
            },
            body: JSON.stringify({payer_id: payerId}),
          },
        )
          .then(response => {
            return response.json();
          })
          .then(response => {
            console.log('fetch response');
            console.log(JSON.stringify(response));
            if (response?.id) {
              setPaypalUrl('');
              SetIsWebViewLoading(false);
              handleConfirmPayment();
            } else if (response?.name == 'TRANSACTION_REFUSED') {
              setPaypalUrl('');
              SetIsWebViewLoading(false);
              setFirstTime(true);

              setLoading(false);
              ShowToastMessage('Payment Failed');
              navigation.goBack();
            } else {
              setPaypalUrl('');
              SetIsWebViewLoading(false);
              setFirstTime(true);

              setLoading(false);
              ShowToastMessage('Payment Failed');
              navigation.goBack();
            }
          })
          .catch(err => {
            setShouldShowWebviewLoading(true);

            console.log({...err});
            setLoading(false);
            ShowToastMessage('Payment Failed');
            setPaypalUrl('');
            setFirstTime(true);

            SetIsWebViewLoading(false);
          });
        // } else {
        //   fetch(
        //     // `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, // test
        //     `https://api.paypal.com/v1/payments/payment/${paymentId}/execute`, // live
        //     {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: 'Bearer ' + accessToken,
        //       },
        //       body: JSON.stringify({payer_id: payerId}),
        //     },
        //   )
        //     .then(response => {
        //       return response.json();
        //     })
        //     .then(response => {
        //       console.log('fetch response');
        //       console.log(JSON.stringify(response));
        //       if (response?.id) {
        //         setPaypalUrl('');
        //         SetIsWebViewLoading(false);
        //         handleConfirmPayment();
        //       } else if (response?.name == 'TRANSACTION_REFUSED') {
        //         setPaypalUrl('');
        //         SetIsWebViewLoading(false);
        //         setFirstTime(true);
        //
        //         setLoading(false);
        //         ShowToastMessage('Payment Failed');
        //         navigation.goBack();
        //       } else {
        //         setPaypalUrl('');
        //         SetIsWebViewLoading(false);
        //         setFirstTime(true);
        //
        //         setLoading(false);
        //         ShowToastMessage('Payment Failed');
        //         navigation.goBack();
        //       }
        //     })
        //     .catch(err => {
        //       setShouldShowWebviewLoading(true);
        //
        //       console.log({...err});
        //       setLoading(false);
        //       ShowToastMessage('Payment Failed');
        //       setPaypalUrl('');
        //       setFirstTime(true);
        //
        //       SetIsWebViewLoading(false);
        //     });
        // }
      }
    }
  };

  const generatePaypalUrl = async item => {
    try {
      setLoading(true);
      const dataDetail = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        transactions: [
          {
            amount: {
              currency: item?.currencyData?.currency_name,
              total: item?.finalAmount + '',
            },
            description: 'This is the payment transaction description',
            payment_options: {
              allowed_payment_method: 'IMMEDIATE_PAY',
            },
            // item_list: {
            //   items: [
            //     {
            //       name: receivedItem?.name,
            //       description: receivedItem?.description,
            //       price: receivedItem?.finalAmount + '',
            //       sku: '',
            //       currency: currencyData?.currency_name,
            //     },
            //     // receivedData,
            //   ],
            // },
          },
        ],
        redirect_urls: {
          return_url: '' + item?.paymentItem?.test_return_url, // live
          cancel_url: '' + item?.paymentItem?.test_cancel_url,
        },
      };
      // Step 1: Get an access token from PayPal
      const tokenResponse = await axios.post(
        //'https://api.sandbox.paypal.com/v1/oauth2/token', // test
        '' + item?.paymentItem?.test_authtoken, // live
        qs.stringify({grant_type: 'client_credentials'}),
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username:
              // 'AWwH4b3uxpveigG8_aDBvtFyekvNQqpCUYZGNgKLAWDmO8C2H_hM_sU2EgZlKbTAotT2tqDiSME4sPO2',
              '' + item?.paymentItem?.test_key, // live

            password:
              // 'EDHgUWGkhdrf1E6SypxvlyXeVwlFmOvXSo1yfBTUpSKpnwOMNaH1GJuLIs1yWZw_fKsGh7x21-q5bcht',
              '' + item?.paymentItem?.test_secret, // live
          },
        },
      );

      const accessToken = tokenResponse.data.access_token;
      setAccessToken(accessToken);
      // Step 2: Create a PayPal payment request
      const paymentResponse = await axios.post(
        // 'https://api.sandbox.paypal.com/v1/payments/payment', // test
        '' + item?.paymentItem?.test_payment_url, // live

        dataDetail,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const {id, links} = paymentResponse.data;
      const approvalUrl = links?.find(
        data => data?.rel === 'approval_url',
      )?.href;

      console.log('PayPal response:', approvalUrl);

      // Set the PayPal URL or do something else with it
      setLoading(false);

      setPaypalUrl(approvalUrl);
    } catch (error) {
      console.error('Paypal Axios Error:', error);
      setLoading(false);

      // Handle the error as needed, e.g., show an error message to the user
    }
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
            {/* <Lottie
                            source={require('../../assets/animation/successful_order.json')}
                            autoPlay
                            loop={false}
                            style={{
                                height: 150,
                            }}
                        /> */}
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

                navigation.navigate('MainContainer', {
                  screen: 'Order',
                });
              }}
              textStyle={{
                fontFamily: FONTS?.bold,
              }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View
      style={[
        GlobalStyle.mainContainer,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      {paypalUrl ? (
        <View style={styles.webview}>
          <WebView
            style={{height: '100%', width: '100%'}}
            source={{uri: paypalUrl}}
            onNavigationStateChange={_onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            onLoadStart={onWebviewLoadStart}
            onLoadEnd={() => SetIsWebViewLoading(false)}
          />
        </View>
      ) : null}
      {isWebViewLoading ? (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
          }}>
          <ActivityIndicator size="large" color={theme.colors.colorPrimary} />
        </View>
      ) : null}
      {renderModal()}
    </View>
  );
};

export default PayPalPayment;
const styles = StyleSheet.create({
  webview: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  btnContainer: {
    height: 42,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.black,
    marginHorizontal: 15,
  },
  textStyle: {
    // fontWeight: 'bold',
    fontFamily: FONTS.semi_old,
    fontSize: 16,
    color: COLORS.white,
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
