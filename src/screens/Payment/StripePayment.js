import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import {
  CardField,
  confirmPayment,
  createToken,
} from '@stripe/stripe-react-native';
import {COLORS} from '../../constants/Colors';
import {showProgressBar} from '../../redux/actions';
import {
  createUserOrder,
  emptyCartInOneShot,
  generatePaymentToken,
  getSecretForStripe,
} from '../../redux/actions/CartApi';
import {useDispatch, useSelector} from 'react-redux';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import themeContext from '../../constants/themeContext';
import {icons, STRING} from '../../constants';
import {FONTS} from '../../constants/Fonts';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {updateCartDataLength} from '../../redux/actions/HomeApi';

const StripePayment = ({navigation, route}) => {
  const [cardInfo, setCardInfo] = useState(null);
  const userToken = useSelector(state => state?.state?.userToken);
  const userData = useSelector(state => state?.state?.userData);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const theme = useContext(themeContext);

  const fetchCardDetails = cardDetail => {
    if (cardDetail?.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };

  const onDone = async () => {
    // console.log('card details ', cardInfo);

    if (cardInfo) {
      try {
        const resToken = await createToken({
          ...cardInfo,
          type: 'Card',
          currency: 'usd',
        });
        // console.log('restoken -> ', resToken?.token?.card?.currency);
        console.log('restoken -> ', resToken?.token?.id);
        if (resToken?.token?.id) {
          dispatch(showProgressBar(true));
          dispatch(() => {
            generatePaymentToken(
              dispatch,
              navigation,
              userToken,
              receivedItem?.finalAmount,
              resToken?.token?.card?.currency,
              resToken?.token?.id,
              generateTokenSuccessCallback,
              generateTokenErrorCallback,
              paymentErrorCallback,
            );
          });
          // getStripeDetails();
        } else {
          ShowToastMessage('Unable to process payment, invalid card details');
        }
      } catch (e) {
        console.log('error -> ', e);
      }
    } else {
      ShowToastMessage('Please enter proper card details');
    }
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

  const generateTokenSuccessCallback = data => {
    ShowConsoleLogMessage(JSON.stringify(data));
    dispatch(showProgressBar(false));
    // navigation.goBack();
    handleConfirmPayment();
  };
  const generateTokenErrorCallback = data => {
    ShowConsoleLogMessage(JSON.stringify(data));
    dispatch(showProgressBar(false));
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

  const paymentErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    // ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };
  const stripeSuccessCallback = data => {
    // data?.data?.ephemeralKey,
    // data?.data?.paymentIntent,
    // data?.data?.customer,
    ShowConsoleLogMessage(data?.data?.paymentIntent + ' ------- payemnt inent');
    confirmPayment(data?.data?.paymentIntent, {
      paymentMethodType: 'Card',
    })
      .then(confirmPayments => {
        console.log(confirmPayments, ' -> confirmPayments');

        // dispatch(() => {
        //   generatePaymentToken(
        //     dispatch,
        //     userToken,
        //     receivedItem?.finalAmount,
        //     'usd',
        //     '',
        //     () => {},
        //     () => {},
        //     () => {},
        //   );
        // });
      })
      .catch(error => {
        console.log(error, ' -> error ');
      });
    dispatch(showProgressBar(false));
  };
  const stripeErrorCallback = data => {
    ShowConsoleLogMessage(JSON.stringify(data));
    ShowToastMessage(JSON.stringify(data?.message));
    dispatch(showProgressBar(false));
  };

  const [receivedItem, setReceivedItem] = useState(null);

  useEffect(() => {
    let {item} = route?.params;
    setReceivedItem(item);

    // console.log(item);
  }, []);

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
      {/*<Text>Stripe payment</Text>*/}
      <CardField
        postalCodeEnabled={false}
        cardStyle={{
          backgroundColor: '#ffffff',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          fetchCardDetails(cardDetails);
        }}
        onFocus={focusedField => {
          // console.log('focus -> ', focusedField);
        }}
      />

      <TouchableOpacity
        style={[
          styles.btnContainer,
          {
            backgroundColor: theme.colors.colorPrimary,
          },
        ]}
        onPress={() => {
          onDone();
        }}>
        <Text style={styles.textStyle}>DONE</Text>
      </TouchableOpacity>

      {renderModal()}
    </View>
  );
};

export default StripePayment;
const styles = StyleSheet.create({
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
