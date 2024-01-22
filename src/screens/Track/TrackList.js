// import {
//   Alert,
//   BackHandler,
//   FlatList,
//   I18nManager,
//   Image,
//   ImageBackground,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useContext, useEffect, useState} from 'react';
// import {icons, SIZES, STRING} from '../../constants';
// import {FONTS} from '../../constants/Fonts';
// import GlobalStyle from '../../styles/GlobalStyle';
// import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {COLORS} from '../../constants/Colors';
// import themeContext from '../../constants/themeContext';
// import {useIsFocused} from '@react-navigation/native';
// import {useDispatch, useSelector} from 'react-redux';
// import {showProgressBar} from '../../redux/actions';
// import {
//   addToCartProduct,
//   cancelUserOrder,
//   createReviewForOrder,
//   getReviewForOrder,
//   getUserOrderById,
//   returnUserOrder,
// } from '../../redux/actions/CartApi';
// import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
// import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
// import moment from 'moment';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import {updateCartDataLength} from '../../redux/actions/HomeApi';
// import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
// import CancelOrderModal from './CancelOrderModal';
// import RateOrderModal from './RateOrderModal';
// import ReturnOrderModal from './ReturnOrderModal';
// import {IMAGE_BASE_URL} from '../../network/ApiEndPoints';
//
// let check = false;
//
// const TrackList = ({navigation, route}) => {
//   const theme = useContext(themeContext);
//   const [show, setShow] = useState(false);
//
//   const [loading, setLoading] = useState(false);
//   const [receivedData, setReceivedData] = useState(null);
//   const [orderReturnStatus, setOrderReturnStatus] = useState(null);
//   const [orderData, setOrderData] = useState(null);
//   const [flashAmount, setFlashAmount] = useState(null);
//   const [productData, setProductData] = useState([]);
//   const [productReviewData, setProductReviewData] = useState(null);
//   const cartDataLength = useSelector(
//     state => state?.homeReducer?.cartDataLength,
//   );
//
//   const dispatch = useDispatch();
//   const loginCount = useSelector(state => state?.state?.count);
//   const userToken = useSelector(state => state?.state?.userToken);
//
//   const isFocused = useIsFocused();
//
//   useEffect(() => {
//     let {item} = route?.params;
//     setReceivedData(item);
//     if (loginCount == 1) {
//       if (isFocused) {
//         dispatch(showProgressBar(true));
//         dispatch(() => {
//           getUserOrderById(
//             dispatch,
//             navigation,
//             userToken,
//             item?._id,
//             successCallback,
//             errorCallback,
//             BannerErrorCallback,
//           );
//         });
//
//         dispatch(() => {
//           getReviewForOrder(
//             dispatch,
//             navigation,
//             userToken,
//             item?._id,
//
//             successGetReviewCallback,
//             errorGetReviewCallback,
//             BannerErrorCallback,
//           );
//         });
//       }
//     }
//   }, [isFocused]);
//
//   const [daysDifference, setDaysDifference] = useState(null);
//
//   useEffect(() => {
//     const calculateDaysDifference = () => {
//       // Get the current date and time
//       const currentDate = new Date();
//       // ShowConsoleLogMessage('currentDate = ' + currentDate);
//       // Convert the 'createdAt' string to a Date object
//       const createdDate = new Date(orderData?.createdAt);
//       // ShowConsoleLogMessage('createdDate = ' + createdDate);
//
//       // Calculate the difference in milliseconds
//       const timeDifference = currentDate - createdDate;
//       // ShowConsoleLogMessage('timeDifference = ' + timeDifference);
//
//       // Convert the time difference to days
//       const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//       // ShowConsoleLogMessage(days);
//
//       // Subtract the product_return_policy from the calculated days
//       const daysRemaining =
//         parseInt(orderData?.product_id[0]?.product_return_policy, 10) -
//         parseInt(days);
//       // ShowConsoleLogMessage(
//       //   JSON.stringify(orderData?.product_id[0]?.product_return_policy) +
//       //     ' = orderData?.product_id?.product_return_policy',
//       // );
//       // ShowConsoleLogMessage(daysRemaining);
//
//       // Set the result in the state
//       setDaysDifference(daysRemaining);
//     };
//
//     // Call the function when the component mounts
//     calculateDaysDifference();
//   }, [orderData]);
//
//   const successCallback = async data => {
//     setOrderData(data?.data);
//     if (
//       data?.data?.flash_discount_percentage != undefined &&
//       parseInt(data?.data?.flash_discount_percentage) > 0
//     ) {
//       let sum =
//         ((parseInt(data?.data?.amount) *
//           parseInt(data?.data?.flash_discount_percentage)) /
//           100) *
//         parseInt(data?.data?.quantity);
//       setFlashAmount(sum);
//     }
//
//     setOrderReturnStatus(data?.orderReturnStatus);
//     // ShowConsoleLogMessage(JSON.stringify(data?.data));
//     setProductData(data?.response);
//     dispatch(showProgressBar(false));
//   };
//
//   const errorCallback = async data => {
//     dispatch(showProgressBar(false));
//     setOrderData(null);
//     setProductData([]);
//     setTimeout(() => {
//       ShowToastMessage(data?.message || 'Something went wrong.');
//     }, 100);
//   };
//
//   const BannerErrorCallback = error => {
//     ShowConsoleLogMessage('Banner call back called');
//     dispatch(showProgressBar(false));
//     ShowConsoleLogMessage(error);
//   };
//
//   const [showReviewModal, setShowReviewModal] = useState(false);
//   const [showReturnModal, setShowReturnModal] = useState(false);
//   const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
//   const [returnReason, setReturnReason] = useState('');
//   const [review, setReview] = useState('');
//   const [reason, setReason] = useState('');
//   const [rate, setRate] = useState(0);
//
//   function ratingCompleted(rating) {
//     // console.log('Rating is: ' + rating);
//     setRate(rating);
//   }
//
//   const showLogoutModal = () => {
//     setLogoutModalVisible(true);
//   };
//
//   const hideLogoutModal = () => {
//     setReason('');
//     setLogoutModalVisible(false);
//   };
//
//   const openReviewModal = () => {
//     setShowReviewModal(true);
//   };
//
//   const hideReviewModal = () => {
//     setReview('');
//     setRate(0);
//     setShowReviewModal(false);
//   };
//
//   const openReturnModal = () => {
//     setShowReturnModal(true);
//   };
//
//   const hideReturnModal = () => {
//     setReturnReason('');
//     setShowReturnModal(false);
//   };
//
//   const handleReturnConfirm = () => {
//     // ShowConsoleLogMessage(orderData?._id);
//     dispatch(showProgressBar(true));
//     dispatch(() => {
//       returnUserOrder(
//         dispatch,
//         navigation,
//         userToken,
//         orderData?._id,
//         reason,
//         successReturnCallback,
//         errorReturnCallback,
//         BannerErrorCallback,
//       );
//     });
//   };
//   const handleLogoutConfirm = () => {
//     // ShowConsoleLogMessage(orderData?._id);
//     dispatch(showProgressBar(true));
//     dispatch(() => {
//       cancelUserOrder(
//         dispatch,
//         navigation,
//         userToken,
//         orderData?._id,
//         reason,
//         successCancelCallback,
//         errorCancelCallback,
//         BannerErrorCallback,
//       );
//     });
//   };
//   const handleReviewConfirm = () => {
//     // ShowConsoleLogMessage(productData[0].product_id?._id);
//     if (rate == 0) {
//       ShowToastMessage('Please leave a star');
//     } else {
//       dispatch(showProgressBar(true));
//       dispatch(() => {
//         createReviewForOrder(
//           dispatch,
//           navigation,
//           userToken,
//           orderData?._id,
//           productData[0].product_id?._id + '',
//           rate,
//           review,
//           successReviewCallback,
//           errorReviewCallback,
//           BannerErrorCallback,
//         );
//       });
//     }
//   };
//   const successReviewCallback = async data => {
//     dispatch(showProgressBar(false));
//     hideReviewModal();
//     callGetReviewApi(orderData?._id);
//
//     Alert.alert(
//       'Review',
//       '' + data?.message,
//       [
//         {
//           text: 'OK',
//           onPress: () => {
//             // callGetReviewApi(orderData?._id);
//           },
//         },
//       ],
//       {cancelable: false},
//     );
//   };
//
//   const callGetReviewApi = () => {
//     dispatch(() => {
//       getReviewForOrder(
//         dispatch,
//         navigation,
//         userToken,
//         orderData?._id,
//         successGetReviewCallback,
//         errorGetReviewCallback,
//         BannerErrorCallback,
//       );
//     });
//   };
//
//   const successGetReviewCallback = async data => {
//     dispatch(showProgressBar(false));
//     // ShowConsoleLogMessage(JSON.stringify(data));
//     setProductReviewData(data?.data);
//   };
//   const errorGetReviewCallback = async data => {
//     dispatch(showProgressBar(false));
//     setProductReviewData(null);
//     // setTimeout(() => {
//     //   ShowToastMessage(data?.message || 'Something went wrong.');
//     // }, 100);
//   };
//
//   const errorReviewCallback = async data => {
//     dispatch(showProgressBar(false));
//     setTimeout(() => {
//       ShowToastMessage(data?.message || 'Something went wrong.');
//     }, 100);
//   };
//
//   const successReturnCallback = async data => {
//     dispatch(showProgressBar(false));
//     ShowConsoleLogMessage(JSON.stringify(data));
//     hideReturnModal();
//     Alert.alert(
//       'Return Order',
//       '' + data?.message || 'Return request created.',
//       [
//         {
//           text: 'OK',
//           onPress: () => {
//             navigation.goBack();
//           },
//         },
//       ],
//       {cancelable: false},
//     );
//   };
//
//   const errorReturnCallback = async data => {
//     ShowConsoleLogMessage(JSON.stringify(data));
//     dispatch(showProgressBar(false));
//     setTimeout(() => {
//       ShowToastMessage(data?.message || 'Something went wrong.');
//     }, 100);
//   };
//
//   const successCancelCallback = async data => {
//     dispatch(showProgressBar(false));
//     hideLogoutModal();
//     Alert.alert(
//       'Cancel Order',
//       '' + data?.message,
//       [
//         {
//           text: 'OK',
//           onPress: () => {
//             navigation.goBack();
//           },
//         },
//       ],
//       {cancelable: false},
//     );
//   };
//
//   const errorCancelCallback = async data => {
//     dispatch(showProgressBar(false));
//     setTimeout(() => {
//       ShowToastMessage(data?.message || 'Something went wrong.');
//     }, 100);
//   };
//
//   const renderItem = ({item}) => {
//     const fa =
//       ((parseInt(item?.amount) * parseInt(item?.flash_discount_percentage)) /
//         100) *
//       parseInt(item?.quantity);
//
//     // ShowConsoleLogMessage(item?.flash_discount_percentage);
//     return (
//       <TouchableOpacity
//         onPress={() => {
//           navigation.navigate('ProductDetail', {item: item});
//         }}
//         // activeOpacity={0.8}
//         style={[
//           styles.wrapperOrder,
//           {
//             // backgroundColor: '#F2F3F4',
//             elevation: 2,
//             backgroundColor: theme?.colors?.bg,
//           },
//         ]}>
//         <View
//           style={[
//             GlobalStyle.flexRowAlignCenter,
//             {
//               paddingVertical: 5,
//               alignItems: 'center',
//             },
//           ]}>
//           <ImageBackground
//             style={[
//               styles.itemImage,
//               {
//                 // backgroundColor:"#F2F4F4",
//                 backgroundColor: theme?.colors?.colorimageback,
//                 alignItems: 'center',
//                 // alignSelf: 'center',
//                 justifyContent: 'center',
//               },
//             ]}>
//             <VegUrbanImageLoader
//               source={
//                 item?.product_id?.thumbnail_image
//                   ? IMAGE_BASE_URL + item?.product_id?.thumbnail_image
//                   : IMAGE_BASE_URL + item?.thumbnail_image
//               }
//               styles={[
//                 {
//                   width: 90,
//                   height: 90,
//                   alignSelf: 'center',
//                   margin: 8,
//                   // resizeMode:'contain',
//                   borderRadius: 5,
//                   // marginTop: 30
//                 },
//               ]}
//             />
//           </ImageBackground>
//           {/* </ImageBackground> */}
//           <View style={styles.innnerWrapperOrder}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//               }}>
//               <Text
//                 style={[
//                   styles.textName,
//                   {
//                     alignSelf: 'flex-start',
//                     color: theme?.colors?.white,
//                   },
//                 ]}>
//                 {item?.product_id?.product_name || item?.product_name}
//               </Text>
//             </View>
//             <View
//               style={[
//                 {
//                   flexWrap: 'wrap',
//                   marginTop: 10,
//                 },
//                 GlobalStyle.flexRowAlignCenter,
//               ]}>
//               <View
//                 style={{
//                   borderRadius: 20,
//                   width: 15,
//                   height: 15,
//                   backgroundColor: item?.color || theme?.colors?.gray,
//                   marginEnd: 10,
//                   marginTop: 8,
//                   marginBottom: 8,
//                 }}
//               />
//               <Text
//                 style={[
//                   styles.discountPrice,
//                   {
//                     color: theme?.colors?.white,
//
//                     // color: COLORS?.black,
//                     // color: theme?.colors?.,
//                     marginRight: 5,
//                   },
//                 ]}>
//                 Color
//               </Text>
//               <View
//                 style={{
//                   // width: 0,
//                   // height: 13,
//                   paddingVertical: 6,
//                   borderWidth: 0.8,
//                   borderColor: theme?.colors?.white,
//                   marginStart: 7,
//                   marginEnd: 10,
//                 }}
//               />
//               <Text
//                 style={[
//                   styles.discountPrice,
//                   {
//                     color: theme?.colors?.white,
//                   },
//                 ]}>
//                 Size = {item?.size}
//               </Text>
//               <View
//                 style={{
//                   // width: 0,
//                   // height: 13,
//                   paddingVertical: 6,
//                   borderWidth: 0.8,
//                   borderColor: theme?.colors?.white,
//                   marginStart: 7,
//                   marginEnd: 10,
//                 }}
//               />
//               <Text
//                 style={[
//                   styles.discountPrice,
//                   {
//                     color: theme?.colors?.white,
//                   },
//                 ]}>
//                 Qty = {item?.quantity}
//               </Text>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}>
//               {item?.flash_discount_percentage > 0 ? (
//                 <Text
//                   style={[
//                     styles.finalPriceText,
//                     {
//                       alignSelf: 'flex-start',
//                       color: theme?.colors?.colorPrimary,
//                       marginTop: 5,
//                     },
//                   ]}>
//                   {STRING.APP_CURRENCY} {/*{parseInt(item?.amount) -*/}
//                   {/*  ((parseInt(item?.amount) **/}
//                   {/*    parseInt(item?.flash_discount_percentage)) /*/}
//                   {/*    100) **/}
//                   {/*    parseInt(item?.quantity)}*/}
//                   {parseInt(item?.amount) * parseInt(item?.quantity) - fa}
//                 </Text>
//               ) : (
//                 <Text
//                   style={[
//                     styles.finalPriceText,
//                     {
//                       alignSelf: 'flex-start',
//                       color: theme?.colors?.colorPrimary,
//                       marginTop: 5,
//                     },
//                   ]}>
//                   {STRING.APP_CURRENCY}{' '}
//                   {parseInt(item?.amount) * parseInt(item?.quantity)}
//                   {/*{STRING.APP_CURRENCY} {item?.amount}*/}
//                 </Text>
//               )}
//
//               {/*<Text*/}
//               {/*  style={[*/}
//               {/*    styles.finalPriceText,*/}
//               {/*    {*/}
//               {/*      alignSelf: 'flex-start',*/}
//               {/*      color: theme?.colors?.colorPrimary,*/}
//               {/*      marginTop: 8,*/}
//               {/*    },*/}
//               {/*  ]}>*/}
//               {/*  {STRING.APP_CURRENCY}*/}
//               {/*  {parseInt(item?.amount) * parseInt(item?.quantity)}*/}
//               {/*</Text>*/}
//
//               <Text
//                 onPress={() => {
//                   dispatch(() => {
//                     addToCartProduct(
//                       dispatch,
//                       navigation,
//                       userToken,
//                       item?.product_id?._id + '',
//                       item?.quantity + '',
//                       parseInt(item?.amount) + '',
//                       item?.color,
//                       item?.size,
//                       data => {
//                         ShowConsoleLogMessage(data?.message + '');
//                         if (data?.message === 'Add to Cart Successful') {
//                           dispatch(updateCartDataLength(cartDataLength + 1));
//                         }
//                         ShowToastMessage(
//                           data?.message || 'Add to cart successful',
//                         );
//                       },
//                       data => {
//                         ShowToastMessage(
//                           data?.errors || 'Unable to add to cart',
//                         );
//                       },
//                       BannerErrorCallback,
//                     );
//                   });
//                 }}
//                 style={[
//                   styles.finalPriceText,
//                   {
//                     alignSelf: 'flex-start',
//                     color: theme?.colors?.white,
//                     marginTop: 8,
//                     marginEnd: 8,
//                     fontSize: 14,
//                     textDecorationLine: 'underline',
//                     textDecorationStyle: 'solid',
//                     // backgroundColor: 'red',
//                     padding: 5,
//                   },
//                 ]}>
//                 Re-Order
//               </Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };
//
//   const [step, setStep] = useState(1);
//   const [deliveryStatus, setDeliveryStatus] = useState('Pending');
//   const [packetInTruck, setPacketInTruck] = useState(false);
//
//   const handleNextStep = () => {
//     if (step === 1) {
//       setStep(2);
//     } else if (step === 2) {
//       setPacketInTruck(true);
//       setStep(3);
//     } else if (step === 3) {
//       setDeliveryStatus('Delivered');
//       setStep(4);
//     }
//   };
//
//   const handleBackButton = () => {
//     // You can implement your own logic for handling the back button press here.
//     // For example, you can navigate to a previous screen, show a confirmation dialog, or exit the app.
//
//     // To prevent the default behavior (e.g., going back in navigation stack), return true.
//     // If you want the default behavior, return false or remove this handler.
//
//     // ShowConsoleLogMessage(receivedData);
//     if (check == true) {
//       // ShowConsoleLogMessage('if p[art');
//       navigation.reset({
//         index: 0,
//         routes: [{name: 'MainContainer'}],
//       });
//       return true;
//     } else {
//       // ShowConsoleLogMessage('else p[art');
//       // navigation.reset({
//       //   index: 0,
//       //   routes: [{name: 'MainContainer'}],
//       // });
//       return false;
//     }
//   };
//   useEffect(() => {
//     let {item} = route?.params;
//     // ShowConsoleLogMessage(item);
//     if (item?.intentFromPayment != undefined) {
//       check = true;
//     } else {
//       check = false;
//     }
//     setReceivedData(item);
//
//     // Add the event listener for the back button press
//     BackHandler.addEventListener('hardwareBackPress', handleBackButton);
//
//     // Clean up the event listener when the component is unmounted
//     return () => {
//       BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
//     };
//   }, []);
//
//   const renderShipDot = () => {
//     return (
//       <View
//         style={{
//           fontSize: 35,
//           height: 4,
//           width: 4,
//           margin: 1.5,
//           marginStart: 8,
//           borderRadius: 5,
//           backgroundColor:
//             orderData?.delivery_status == 'Shipped'
//               ? theme?.colors?.colorPrimary
//               : orderData?.delivery_status == 'On The Way'
//               ? theme?.colors?.colorPrimary
//               : orderData?.delivery_status == 'Delivered'
//               ? theme?.colors?.colorPrimary
//               : theme?.colors?.grey,
//         }}
//       />
//     );
//   };
//   const renderOnWayDot = () => {
//     return (
//       <View
//         style={{
//           fontSize: 35,
//           height: 4,
//           width: 4,
//           margin: 1.5,
//           marginStart: 8,
//           borderRadius: 5,
//           backgroundColor:
//             orderData?.delivery_status == 'On The Way'
//               ? theme?.colors?.colorPrimary
//               : orderData?.delivery_status == 'Delivered'
//               ? theme?.colors?.colorPrimary
//               : theme?.colors?.grey,
//         }}
//       />
//     );
//   };
//
//   const renderDeliveryDot = () => {
//     return (
//       <View
//         style={{
//           fontSize: 35,
//           height: 4,
//           width: 4,
//           margin: 1.5,
//           marginStart: 8,
//           borderRadius: 5,
//           backgroundColor:
//             orderData?.delivery_status == 'Delivered'
//               ? theme?.colors?.colorPrimary
//               : theme?.colors?.grey,
//         }}
//       />
//     );
//   };
//
//   return (
//     <SafeAreaView
//       style={[
//         GlobalStyle.mainContainerBgColor,
//         {
//           backgroundColor: theme?.colors?.bg_color_onBoard,
//         },
//       ]}>
//       <View
//         style={[
//           GlobalStyle.commonToolbarBG,
//           {
//             backgroundColor: theme.colors.bg_color_onBoard,
//           },
//         ]}>
//         <Ionicons
//           name="ios-arrow-back"
//           // color={COLORS.black}
//           color={theme.colors.textColor}
//           size={25}
//           style={[
//             styles.backIcon,
//             {
//               opacity: !show ? 1 : 0.0,
//               transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
//               marginStart: 10,
//             },
//           ]}
//           onPress={() => {
//             if (receivedData?.intentFromPayment == true) {
//               handleBackButton();
//             } else {
//               navigation.goBack();
//             }
//             // ShowToastMessage('Coming Soon!');
//           }}
//         />
//
//         <VegUrbanCommonToolBar
//           title="Track Order"
//           style={{
//             backgroundColor: theme.colors.bg_color_onBoard,
//             marginStart: 10,
//           }}
//           textStyle={{
//             color: theme.colors.textColor,
//             fontSize: 20,
//           }}
//         />
//       </View>
//       <ScrollView
//         contentContainerStyle={{
//           flexGrow: 1,
//         }}>
//         <View
//           // activeOpacity={0.8}
//           style={[
//             styles.wrapperOrder,
//             {
//               // backgroundColor: '#F2F3F4',
//               elevation: 2,
//
//               backgroundColor: theme?.colors?.bg,
//             },
//           ]}>
//           <View
//             style={[
//               GlobalStyle.flexRowAlignCenter,
//               {
//                 paddingVertical: 5,
//                 alignItems: 'center',
//               },
//             ]}>
//             {/*<ImageBackground*/}
//             {/*  style={[*/}
//             {/*    styles.itemImage,*/}
//             {/*    {*/}
//             {/*      // backgroundColor:"#F2F4F4",*/}
//             {/*      backgroundColor: theme?.colors?.colorimageback,*/}
//             {/*      alignItems: 'center',*/}
//             {/*      justifyContent: 'center',*/}
//             {/*      alignSelf: 'flex-start',*/}
//             {/*    },*/}
//             {/*  ]}>*/}
//             {/*  <Image*/}
//             {/*    style={{*/}
//             {/*      width: 60,*/}
//             {/*      height: 60,*/}
//             {/*      alignSelf: 'center',*/}
//             {/*      tintColor: theme?.colors?.white,*/}
//             {/*    }}*/}
//             {/*    source={icons.order_successful}*/}
//             {/*  />*/}
//             {/*</ImageBackground>*/}
//
//             <VegUrbanImageLoader
//               source={
//                 IMAGE_BASE_URL + productData[0]?.product_id?.thumbnail_image
//               }
//               styles={[
//                 {
//                   width: 90,
//                   height: 90,
//                   // alignSelf: 'center',
//                   alignSelf: 'flex-start',
//                   margin: 8,
//                   // resizeMode:'contain',
//                   borderRadius: 5,
//                   // marginTop: 30
//                 },
//               ]}
//             />
//
//             <View style={styles.innnerWrapperOrder}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                 }}>
//                 <Text
//                   style={[
//                     styles.textName,
//                     {
//                       alignSelf: 'flex-start',
//                       color: theme?.colors?.white,
//                     },
//                   ]}>
//                   Order id: {orderData?.order_id}
//                 </Text>
//               </View>
//               <Text
//                 style={[
//                   styles.textName,
//                   {
//                     alignSelf: 'flex-start',
//                     color: theme?.colors?.white,
//                     fontSize: 14,
//                     marginVertical: 5,
//                     fontFamily: FONTS.regular,
//                   },
//                 ]}>
//                 {orderData?.createdAt
//                   ? `Date & Time: ${moment(orderData?.createdAt).format('LLL')}`
//                   : ''}
//               </Text>
//
//               <View
//                 style={[
//                   GlobalStyle.flexRowAlignCenter,
//                   {
//                     paddingBottom: 10,
//                   },
//                 ]}>
//                 <View
//                   style={{
//                     backgroundColor: theme?.colors?.colorimageback,
//                     paddingHorizontal: 10,
//                     borderRadius: 5,
//                     padding: 4,
//                     marginTop: 5,
//                     // width: '38%',
//                     alignItems: 'center',
//                   }}>
//                   <Text
//                     numberOfLines={1}
//                     style={{
//                       fontSize: 12,
//                       fontFamily: FONTS?.semi_old,
//                       textAlign: 'center',
//                       color: theme?.colors?.white,
//                     }}>
//                     {orderData?.delivery_status}
//                   </Text>
//                 </View>
//
//                 <View
//                   style={{
//                     backgroundColor: theme?.colors?.colorimageback,
//                     paddingHorizontal: 10,
//                     borderRadius: 5,
//                     padding: 4,
//                     marginTop: 5,
//                     // width: '38%',
//                     alignItems: 'center',
//                     marginStart: 10,
//                   }}>
//                   <Text
//                     numberOfLines={1}
//                     style={{
//                       fontSize: 12,
//                       color: theme?.colors?.white,
//                       fontFamily: FONTS?.semi_old,
//
//                       textAlign: 'center',
//                     }}>
//                     {orderData?.payment_status}
//                   </Text>
//                 </View>
//
//                 <View
//                   style={{
//                     backgroundColor: theme?.colors?.colorimageback,
//                     paddingHorizontal: 10,
//                     borderRadius: 5,
//                     padding: 4,
//                     marginTop: 5,
//                     // width: '38%',
//                     alignItems: 'center',
//                     marginStart: 10,
//                   }}>
//                   <Text
//                     numberOfLines={1}
//                     style={{
//                       fontSize: 12,
//                       color: theme?.colors?.white,
//                       fontFamily: FONTS?.semi_old,
//
//                       textAlign: 'center',
//                     }}>
//                     {orderData?.payment_mode}
//                   </Text>
//                 </View>
//               </View>
//
//               <View
//                 style={[
//                   GlobalStyle.flexRowAlignCenter,
//                   {
//                     paddingBottom: 10,
//                     // backgroundColor: 'red',
//                   },
//                 ]}>
//                 <>
//                   {orderData?.is_return == 'Active' ? (
//                     <View
//                       style={{
//                         backgroundColor: theme?.colors?.colorimageback,
//                         paddingHorizontal: 10,
//                         borderRadius: 5,
//                         padding: 4,
//                         marginTop: 5,
//                         // width: '38%',
//                         // flexGrow: 1,
//                         alignItems: 'flex-start',
//                         alignSelf: 'flex-start',
//                       }}>
//                       <Text
//                         numberOfLines={1}
//                         style={{
//                           fontSize: 12,
//                           color: theme?.colors?.white,
//                           fontFamily: FONTS?.medium,
//
//                           textAlign: 'center',
//                         }}>
//                         Order Return
//                       </Text>
//                     </View>
//                   ) : null}
//
//                   {orderData?.is_refund == 'Active' ? (
//                     <View
//                       style={{
//                         backgroundColor: theme?.colors?.colorimageback,
//                         paddingHorizontal: 10,
//                         borderRadius: 5,
//                         padding: 4,
//                         marginTop: 5,
//                         marginStart: 5,
//                         // width: '38%',
//                         // flexGrow: 1,
//                         alignItems: 'flex-start',
//                         alignSelf: 'flex-start',
//                       }}>
//                       <Text
//                         numberOfLines={1}
//                         style={{
//                           fontSize: 12,
//                           color: theme?.colors?.white,
//                           fontFamily: FONTS?.medium,
//
//                           textAlign: 'center',
//                         }}>
//                         Order Refund
//                       </Text>
//                     </View>
//                   ) : null}
//                 </>
//               </View>
//
//               {orderData?.is_cancelled != 'Active' ? null : (
//                 <View
//                   style={{
//                     backgroundColor: theme?.colors?.colorimageback,
//                     paddingHorizontal: 10,
//                     borderRadius: 5,
//                     padding: 4,
//                     marginTop: 5,
//                     // width: '38%',
//                     // flexGrow: 1,
//                     alignItems: 'flex-start',
//                     alignSelf: 'flex-start',
//                   }}>
//                   <Text
//                     numberOfLines={1}
//                     style={{
//                       fontSize: 12,
//                       color: theme?.colors?.white,
//                       fontFamily: FONTS?.semi_old,
//
//                       textAlign: 'center',
//                     }}>
//                     Order Cancelled
//                   </Text>
//                 </View>
//               )}
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                 }}>
//                 {orderData ? (
//                   orderData?.flash_discount_percentage > 0 ? (
//                     <Text
//                       style={[
//                         styles.finalPriceText,
//                         {
//                           alignSelf: 'flex-start',
//                           color: theme?.colors?.colorPrimary,
//                           marginTop: 5,
//                         },
//                       ]}>
//                       {STRING.APP_CURRENCY} {/*{parseInt(orderData?.amount) -*/}
//                       {/*  ((parseInt(orderData?.amount) **/}
//                       {/*    parseInt(orderData?.flash_discount_percentage)) /*/}
//                       {/*    100) **/}
//                       {/*    parseInt(orderData?.quantity)}*/}
//                       {parseInt(orderData?.amount) *
//                         parseInt(orderData?.quantity) -
//                         flashAmount}
//                     </Text>
//                   ) : (
//                     <Text
//                       style={[
//                         styles.finalPriceText,
//                         {
//                           alignSelf: 'flex-start',
//                           color: theme?.colors?.colorPrimary,
//                           marginTop: 5,
//                         },
//                       ]}>
//                       {STRING.APP_CURRENCY}{' '}
//                       {parseInt(orderData?.amount) *
//                         parseInt(orderData?.quantity)}
//                       {/*{STRING.APP_CURRENCY} {item?.amount}*/}
//                     </Text>
//                   )
//                 ) : (
//                   ''
//                 )}
//
//                 {/*<Text*/}
//                 {/*  style={[*/}
//                 {/*    styles.finalPriceText,*/}
//                 {/*    {*/}
//                 {/*      // alignSelf: 'flex-start',*/}
//                 {/*      color: theme?.colors?.colorPrimary,*/}
//                 {/*      marginTop: 8,*/}
//                 {/*      // fontWeight: 'bold',*/}
//                 {/*      fontFamily: FONTS.semi_old,*/}
//                 {/*    },*/}
//                 {/*  ]}>*/}
//                 {/*  {STRING.APP_CURRENCY}{' '}*/}
//                 {/*  {orderData ? orderData?.amount * orderData?.quantity : ''}*/}
//                 {/*</Text>*/}
//               </View>
//             </View>
//           </View>
//         </View>
//
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginHorizontal: 10,
//             marginVertical: 10,
//             alignSelf: 'center',
//           }}>
//           <View
//             style={[
//               {
//                 flexDirection: 'row',
//               },
//             ]}>
//             <View style={styles.container}>
//               <MaterialIcons
//                 name="backpack"
//                 size={30}
//                 color={theme?.colors?.colorPrimary}
//                 style={{}}
//               />
//               <View
//                 style={{
//                   backgroundColor: theme?.colors?.colorPrimary,
//                   width: 20,
//                   height: 20,
//                   alignItems: 'center',
//                   borderRadius: 25,
//
//                   justifyContent: 'center',
//                   marginTop: 15,
//                 }}>
//                 <MaterialCommunityIcons
//                   name="check"
//                   size={16}
//                   color={theme?.colors?.btnTextColor}
//                 />
//               </View>
//             </View>
//             <View
//               style={{
//                 alignSelf: 'flex-end',
//               }}>
//               <Text
//                 style={{
//                   fontSize: 35,
//                   textAlign: 'center',
//                   color:
//                     orderData?.delivery_status == 'Shipped'
//                       ? theme?.colors?.colorPrimary
//                       : orderData?.delivery_status == 'On The Way'
//                       ? theme?.colors?.colorPrimary
//                       : orderData?.delivery_status == 'Delivered'
//                       ? theme?.colors?.colorPrimary
//                       : theme?.colors?.grey,
//                 }}>
//                 ......
//               </Text>
//             </View>
//           </View>
//
//           <View
//             style={[
//               {
//                 flexDirection: 'row',
//               },
//             ]}>
//             <View style={styles.container}>
//               <Feather
//                 name="truck"
//                 size={30}
//                 color={
//                   orderData?.delivery_status == 'Shipped'
//                     ? theme?.colors?.colorPrimary
//                     : orderData?.delivery_status == 'On The Way'
//                     ? theme?.colors?.colorPrimary
//                     : orderData?.delivery_status == 'Delivered'
//                     ? theme?.colors?.colorPrimary
//                     : theme?.colors?.grey
//                 }
//               />
//               <View
//                 style={{
//                   backgroundColor:
//                     orderData?.delivery_status == 'Shipped'
//                       ? theme?.colors?.colorPrimary
//                       : orderData?.delivery_status == 'On The Way'
//                       ? theme?.colors?.colorPrimary
//                       : orderData?.delivery_status == 'Delivered'
//                       ? theme?.colors?.colorPrimary
//                       : theme?.colors?.grey,
//                   width: 20,
//                   height: 20,
//                   alignItems: 'center',
//                   borderRadius: 25,
//                   justifyContent: 'center',
//                   marginTop: 15,
//                 }}>
//                 <MaterialCommunityIcons
//                   name="check"
//                   size={16}
//                   color={
//                     orderData?.delivery_status == 'Shipped'
//                       ? theme?.colors?.btnTextColor
//                       : orderData?.delivery_status == 'On The Way'
//                       ? theme?.colors?.btnTextColor
//                       : orderData?.delivery_status == 'Delivered'
//                       ? theme?.colors?.btnTextColor
//                       : theme?.colors?.btnTextColor
//                   }
//                 />
//               </View>
//             </View>
//
//             <View
//               style={{
//                 alignSelf: 'flex-end',
//               }}>
//               <Text
//                 style={{
//                   fontSize: 35,
//                   textAlign: 'center',
//                   color:
//                     orderData?.delivery_status == 'On The Way'
//                       ? theme?.colors?.colorPrimary
//                       : orderData?.delivery_status == 'Delivered'
//                       ? theme?.colors?.colorPrimary
//                       : theme?.colors?.grey,
//                 }}>
//                 ......
//               </Text>
//             </View>
//           </View>
//           <View
//             style={[
//               {
//                 flexDirection: 'row',
//               },
//             ]}>
//             <View style={styles.container}>
//               <FontAwesome5
//                 name="people-carry"
//                 size={28}
//                 color={
//                   orderData?.delivery_status == 'On The Way'
//                     ? theme?.colors?.colorPrimary
//                     : orderData?.delivery_status == 'Delivered'
//                     ? theme?.colors?.colorPrimary
//                     : theme?.colors?.grey
//                 }
//               />
//
//               <View
//                 style={{
//                   backgroundColor:
//                     orderData?.delivery_status == 'On The Way'
//                       ? theme?.colors?.colorPrimary
//                       : orderData?.delivery_status == 'Delivered'
//                       ? theme?.colors?.colorPrimary
//                       : theme?.colors?.grey,
//                   width: 20,
//                   height: 20,
//                   alignItems: 'center',
//                   borderRadius: 25,
//
//                   justifyContent: 'center',
//                   marginTop: 15,
//                 }}>
//                 <MaterialCommunityIcons
//                   name="check"
//                   size={16}
//                   color={
//                     orderData?.delivery_status == 'On The Way'
//                       ? theme?.colors?.btnTextColor
//                       : orderData?.delivery_status == 'Delivered'
//                       ? theme?.colors?.btnTextColor
//                       : theme?.colors?.btnTextColor
//                   }
//                 />
//               </View>
//             </View>
//             <View
//               style={{
//                 alignSelf: 'flex-end',
//               }}>
//               <Text
//                 style={{
//                   fontSize: 35,
//                   textAlign: 'center',
//                   color:
//                     orderData?.delivery_status == 'Delivered'
//                       ? theme?.colors?.colorPrimary
//                       : theme?.colors?.grey,
//                 }}>
//                 ......
//               </Text>
//             </View>
//           </View>
//           <View
//             style={[
//               {
//                 flexDirection: 'row',
//               },
//             ]}>
//             <View style={styles.container}>
//               <AntDesign
//                 name="CodeSandbox"
//                 size={30}
//                 color={
//                   orderData?.delivery_status == 'Delivered'
//                     ? theme?.colors?.colorPrimary
//                     : theme?.colors?.grey
//                 }
//               />
//
//               <View
//                 style={{
//                   backgroundColor:
//                     orderData?.delivery_status == 'Delivered'
//                       ? theme?.colors?.colorPrimary
//                       : theme?.colors?.grey,
//                   width: 20,
//                   height: 20,
//                   marginTop: 15,
//                   alignItems: 'center',
//                   borderRadius: 25,
//
//                   justifyContent: 'center',
//                 }}>
//                 <MaterialCommunityIcons
//                   name="check"
//                   size={16}
//                   color={
//                     orderData?.delivery_status == 'Delivered'
//                       ? theme?.colors?.btnTextColor
//                       : theme?.colors?.btnTextColor
//                   }
//                 />
//               </View>
//
//               {/* <Text style={styles.dotsss}>· · · · ·</Text> */}
//             </View>
//           </View>
//         </View>
//
//         <View
//           style={[
//             styles.divLine,
//             {
//               width: '90%',
//               backgroundColor: theme?.colors?.grey,
//             },
//           ]}
//         />
//
//         <View>
//           <Text
//             style={[
//               styles.textName,
//               {
//                 alignSelf: 'flex-start',
//                 color: theme?.colors?.white,
//                 marginStart: 20,
//                 marginTop: 10,
//                 // marginBottom: 20,
//               },
//             ]}>
//             Order Status Details
//           </Text>
//
//           <View
//             style={{
//               marginHorizontal: 10,
//               marginVertical: 10,
//               paddingHorizontal: 15,
//             }}>
//             <View style={[{}]}>
//               <View style={styles.container1}>
//                 <View
//                   style={{
//                     backgroundColor: theme?.colors?.colorPrimary,
//                     width: 20,
//                     height: 20,
//                     alignItems: 'center',
//                     borderRadius: 25,
//                     justifyContent: 'center',
//                   }}>
//                   <MaterialCommunityIcons
//                     name="check"
//                     size={16}
//                     color={theme?.colors?.btnTextColor}
//                   />
//                 </View>
//                 <Text
//                   style={[
//                     styles.shipDetails,
//                     {
//                       color: theme?.colors?.white,
//                     },
//                   ]}>
//                   Pending
//                 </Text>
//               </View>
//
//               <FlatList data={[1, 2, 2, 3, 5]} renderItem={renderShipDot} />
//             </View>
//
//             <View style={[{}]}>
//               <View style={styles.container1}>
//                 <View
//                   style={{
//                     backgroundColor:
//                       orderData?.delivery_status == 'Shipped'
//                         ? theme?.colors?.colorPrimary
//                         : orderData?.delivery_status == 'On The Way'
//                         ? theme?.colors?.colorPrimary
//                         : orderData?.delivery_status == 'Delivered'
//                         ? theme?.colors?.colorPrimary
//                         : theme?.colors?.grey,
//                     width: 20,
//                     height: 20,
//                     alignItems: 'center',
//                     borderRadius: 25,
//                     justifyContent: 'center',
//                   }}>
//                   <MaterialCommunityIcons
//                     name="check"
//                     size={16}
//                     color={
//                       orderData?.delivery_status == 'Shipped'
//                         ? theme?.colors?.btnTextColor
//                         : orderData?.delivery_status == 'On The Way'
//                         ? theme?.colors?.btnTextColor
//                         : orderData?.delivery_status == 'Delivered'
//                         ? theme?.colors?.btnTextColor
//                         : theme?.colors?.btnTextColor
//                     }
//                   />
//                 </View>
//                 <Text
//                   style={[
//                     styles.shipDetails,
//                     {
//                       color: theme?.colors?.white,
//                     },
//                   ]}>
//                   Picked Up
//                 </Text>
//               </View>
//               <FlatList data={[1, 2, 2, 3, 5]} renderItem={renderOnWayDot} />
//             </View>
//
//             <View style={[{}]}>
//               <View style={styles.container1}>
//                 <View
//                   style={{
//                     backgroundColor:
//                       orderData?.delivery_status == 'On The Way'
//                         ? theme?.colors?.colorPrimary
//                         : orderData?.delivery_status == 'Delivered'
//                         ? theme?.colors?.colorPrimary
//                         : theme?.colors?.grey,
//                     width: 20,
//                     height: 20,
//                     alignItems: 'center',
//                     borderRadius: 25,
//                     justifyContent: 'center',
//                   }}>
//                   <MaterialCommunityIcons
//                     name="check"
//                     size={16}
//                     color={
//                       orderData?.delivery_status == 'On The Way'
//                         ? theme?.colors?.btnTextColor
//                         : orderData?.delivery_status == 'Delivered'
//                         ? theme?.colors?.btnTextColor
//                         : theme?.colors?.btnTextColor
//                     }
//                   />
//                 </View>
//                 <Text
//                   style={[
//                     styles.shipDetails,
//                     {
//                       color: theme?.colors?.white,
//                     },
//                   ]}>
//                   On The Way
//                 </Text>
//               </View>
//               <FlatList data={[1, 2, 2, 3, 5]} renderItem={renderDeliveryDot} />
//             </View>
//
//             <View style={[{}]}>
//               <View style={styles.container1}>
//                 <View
//                   style={{
//                     backgroundColor:
//                       orderData?.delivery_status == 'Delivered'
//                         ? theme?.colors?.colorPrimary
//                         : theme?.colors?.grey,
//                     width: 20,
//                     height: 20,
//                     alignItems: 'center',
//                     borderRadius: 25,
//                     justifyContent: 'center',
//                   }}>
//                   <MaterialCommunityIcons
//                     name="check"
//                     size={16}
//                     color={
//                       orderData?.delivery_status == 'Delivered'
//                         ? theme?.colors?.btnTextColor
//                         : theme?.colors?.btnTextColor
//                     }
//                   />
//                 </View>
//                 <Text
//                   style={[
//                     styles.shipDetails,
//                     {
//                       color: theme?.colors?.white,
//                     },
//                   ]}>
//                   Delivered
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//
//         <View>
//           <Text
//             style={[
//               styles.textName,
//               {
//                 alignSelf: 'flex-start',
//                 color: theme?.colors?.white,
//                 marginStart: 20,
//                 marginTop: 10,
//                 // marginBottom: 20,
//               },
//             ]}>
//             Product Details
//           </Text>
//
//           <FlatList
//             style={{
//               paddingStart: 5,
//               paddingEnd: 5,
//             }}
//             ListHeaderComponent={() => {
//               return <View style={{}} />;
//             }}
//             ListHeaderComponentStyle={{
//               paddingTop: 5,
//             }}
//             showsVerticalScrollIndicator={false}
//             data={productData}
//             renderItem={renderItem}
//           />
//         </View>
//         <Text
//           style={[
//             styles.textName,
//             {
//               alignSelf: 'flex-start',
//               color: theme?.colors?.white,
//               marginStart: 20,
//               marginTop: 10,
//               marginBottom: 20,
//             },
//           ]}>
//           {/*Shipping Details - Coming soon... {orderData?.addressId?.addressName}*/}
//           Shipping Details
//         </Text>
//
//         <View
//           style={[
//             styles.wrapper,
//             {
//               // elevation: 5,
//               backgroundColor: theme?.colors?.bg,
//               marginBottom: 10,
//             },
//           ]}>
//           <View
//             style={[
//               {
//                 flexDirection: 'row',
//                 marginEnd: 10,
//               },
//             ]}>
//             <Image
//               style={{
//                 width: 35,
//                 height: 35,
//                 borderRadius: 50,
//                 tintColor: theme?.colors?.white,
//
//                 // alignSelf: 'center',
//               }}
//               // source={{
//               //   uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoB3mYtLafUiRQEUeY7dQVt-rX0w7NF1kRa7SsXA3Nm2cBixmQUYZWYjgAT-5wVg3A7sM&usqp=CAU',
//               // }}
//               source={icons.address}
//             />
//             <View style={styles.innnerWrapper}>
//               <View
//                 style={
//                   {
//                     // alignItems: 'center',
//                     // flex: 1,
//                     // width: '75%',
//                   }
//                 }>
//                 <View
//                   style={{
//                     // flexGrow: 1,
//                     flexDirection: 'row',
//                     // backgroundColor: 'red',
//                   }}>
//                   <Text
//                     style={[
//                       styles.textName,
//                       {
//                         alignSelf: 'flex-start',
//                         fontFamily: FONTS?.semi_old,
//                         color: theme?.colors?.white,
//                       },
//                     ]}>
//                     {orderData?.addressId?.name}
//                   </Text>
//                   {orderData?.addressId?.defaultAddress == 1 ? (
//                     <Text
//                       style={[
//                         styles.textName,
//                         {
//                           fontFamily: FONTS?.regular,
//                           color: theme?.colors?.text,
//                           backgroundColor: theme?.colors?.colorPrimary,
//                           elevation: 10,
//                           fontSize: 12,
//                           marginStart: 10,
//                           paddingHorizontal: 5,
//                           paddingVertical: 2,
//                           borderRadius: 5,
//                           alignSelf: 'flex-start',
//                         },
//                       ]}
//                       numberOfLines={1}>
//                       {orderData?.addressId?.defaultAddress == 1
//                         ? 'Default'
//                         : ''}
//                     </Text>
//                   ) : null}
//                 </View>
//
//                 <Text
//                   style={[
//                     styles.textName,
//                     {
//                       fontSize: 13,
//                       color: theme?.colors?.white,
//                       marginTop: 5,
//                       fontFamily: FONTS?.regular,
//                       alignSelf: 'flex-start',
//                     },
//                   ]}>
//                   Email: {orderData?.addressId?.email}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.textName,
//                     {
//                       fontSize: 13,
//                       color: theme?.colors?.white,
//                       marginTop: 5,
//                       fontFamily: FONTS?.regular,
//                       alignSelf: 'flex-start',
//                     },
//                   ]}>
//                   Phone: {orderData?.addressId?.phone}
//                 </Text>
//
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     color: theme?.colors?.white,
//                     marginTop: 5,
//                     fontFamily: FONTS?.regular,
//                     alignSelf: 'flex-start',
//                   }}>
//                   {orderData?.addressId?.address}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//         {productReviewData != null ? (
//           <>
//             <Text
//               style={[
//                 styles.textName,
//                 {
//                   alignSelf: 'flex-start',
//                   color: theme?.colors?.white,
//                   marginStart: 20,
//                   marginTop: 10,
//                   marginBottom: 20,
//                 },
//               ]}>
//               {/*Shipping Details - Coming soon... {orderData?.addressId?.addressName}*/}
//               Review
//             </Text>
//
//             <View
//               style={[
//                 styles.wrapper,
//                 {
//                   // elevation: 5,
//                   backgroundColor: theme?.colors?.bg,
//                   marginBottom: 10,
//                 },
//               ]}>
//               <View
//                 style={[
//                   {
//                     flexDirection: 'row',
//                     marginEnd: 10,
//                   },
//                 ]}>
//                 <View
//                   style={[
//                     styles.innnerWrapper,
//                     {
//                       marginStart: 0,
//                     },
//                   ]}>
//                   <View
//                     style={
//                       {
//                         // alignItems: 'center',
//                         // flex: 1,
//                         // width: '75%',
//                       }
//                     }>
//                     <View
//                       style={{
//                         alignItems: 'center',
//                         flexDirection: 'row',
//                       }}
//                       // style={GlobalStyle.flexRowAlignCenter}
//                     >
//                       <AntDesign
//                         name={'star'}
//                         size={20}
//                         color={theme?.colors?.textColor}
//                       />
//                       <Text
//                         style={[
//                           styles.itemPrice,
//                           {
//                             color: theme.colors.textColor,
//                             marginLeft: 5,
//                             fontSize: 18,
//                             alignItems: 'center',
//                             // marginBottom: 5
//                           },
//                         ]}>
//                         {productReviewData?.rating}
//                       </Text>
//                     </View>
//                     {productReviewData?.review?.length > 0 ? (
//                       <Text
//                         style={[
//                           styles.textName,
//                           {
//                             fontSize: 13,
//                             color: theme?.colors?.white,
//                             fontFamily: FONTS?.regular,
//                             alignSelf: 'flex-start',
//                             marginTop: 5,
//                           },
//                         ]}>
//                         {productReviewData?.review}
//                       </Text>
//                     ) : null}
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </>
//         ) : null}
//         {orderData?.is_cancelled == 'Active' ? (
//           <Text
//             style={[
//               styles.textName,
//               {
//                 alignSelf: 'flex-start',
//                 color: theme?.colors?.white,
//                 marginStart: 20,
//                 marginTop: 10,
//               },
//             ]}>
//             {/*Shipping Details - Coming soon... {orderData?.addressId?.addressName}*/}
//             Order Cancel Details
//           </Text>
//         ) : null}
//         {orderData?.cancellation_reason?.length > 0 ? (
//           <Text
//             style={[
//               styles.textName,
//               {
//                 alignSelf: 'flex-start',
//                 color: theme?.colors?.white,
//                 marginStart: 20,
//                 marginTop: 10,
//               },
//             ]}>
//             {/*Shipping Details - Coming soon... {orderData?.addressId?.addressName}*/}
//             Cancellation Reason:
//           </Text>
//         ) : null}
//
//         {orderData?.cancellation_reason?.length > 0 ? (
//           <Text
//             style={[
//               styles.textName,
//               {
//                 alignSelf: 'flex-start',
//                 color: theme?.colors?.white,
//                 marginStart: 20,
//                 marginEnd: 5,
//                 marginTop: 10,
//                 marginBottom: 20,
//                 fontFamily: FONTS.regular,
//               },
//             ]}>
//             {/*Shipping Details - Coming soon... {orderData?.addressId?.addressName}*/}
//             {orderData?.cancellation_reason}
//           </Text>
//         ) : orderData?.is_cancelled == 'Active' ? (
//           <Text
//             style={[
//               styles.textName,
//               {
//                 alignSelf: 'flex-start',
//                 color: theme?.colors?.white,
//                 marginStart: 20,
//                 marginEnd: 5,
//                 marginTop: 10,
//                 marginBottom: 20,
//                 fontFamily: FONTS.regular,
//               },
//             ]}>
//             Cancellation reason not found
//           </Text>
//         ) : null}
//       </ScrollView>
//
//       {orderData?.is_cancelled != 'Active' &&
//       orderData?.delivery_status == 'Pending' ? (
//         <View
//           style={{
//             alignItems: 'center',
//             margin: 20,
//           }}>
//           <VegUrbanCommonBtn
//             height={40}
//             width={'100%'}
//             borderRadius={20}
//             textSize={16}
//             textColor={theme?.colors?.text}
//             text={
//               orderData?.is_cancelled == 'Active'
//                 ? 'Order is cancelled'
//                 : 'Cancel Order'
//             }
//             backgroundColor={theme?.colors?.colorPrimary}
//             onPress={() => {
//               // Alert.alert(
//               //   'Cancel Order',
//               //   'Are you sure want to cancel this order ?',
//               //   [
//               //     {
//               //       text: 'Cancel',
//               //       onPress: () => {
//               //         return null;
//               //       },
//               //     },
//               //     {
//               //       text: 'Confirm',
//               //       onPress: () => {
//               //         return null;
//               //       },
//               //     },
//               //   ],
//               //   {cancelable: false},
//               // );
//               if (orderData?.is_cancelled != 'Active') {
//                 showLogoutModal();
//               }
//             }}
//             textStyle={{
//               fontFamily: FONTS?.bold,
//             }}
//           />
//         </View>
//       ) : null}
//       <View style={{flex: 1}}>
//         <CancelOrderModal
//           visible={isLogoutModalVisible}
//           onCancel={hideLogoutModal}
//           onConfirm={handleLogoutConfirm}
//           email={reason}
//           onChange={v => setReason(v)}
//         />
//       </View>
//
//       <View style={{flex: 1}}>
//         <ReturnOrderModal
//           visible={showReturnModal}
//           onCancel={hideReturnModal}
//           onConfirm={handleReturnConfirm}
//           email={returnReason}
//           onChange={v => setReturnReason(v)}
//         />
//       </View>
//
//       <View style={{flex: 1}}>
//         <RateOrderModal
//           visible={showReviewModal}
//           onCancel={hideReviewModal}
//           onConfirm={handleReviewConfirm}
//           email={review}
//           onChange={v => setReview(v)}
//           ratingCompleted={v => ratingCompleted(v)}
//           rate={rate}
//         />
//       </View>
//
//       {orderData?.is_cancelled != 'Active' &&
//       orderData?.delivery_status == 'Delivered' &&
//       productReviewData == null ? (
//         <View
//           style={{
//             alignItems: 'center',
//             margin: 20,
//           }}>
//           <VegUrbanCommonBtn
//             height={40}
//             width={'100%'}
//             borderRadius={20}
//             textSize={16}
//             textColor={theme?.colors?.text}
//             text={
//               'Write a review'
//               // +
//               // daysDifference +
//               // ' --- ' +
//               // orderData?.product_id[0]?.product_return_policy
//             }
//             backgroundColor={theme?.colors?.colorPrimary}
//             onPress={() => {
//               openReviewModal();
//               // ShowToastMessage('Coming soon');
//             }}
//             textStyle={{
//               fontFamily: FONTS?.bold,
//             }}
//           />
//         </View>
//       ) : null}
//
//       {daysDifference <= orderData?.product_id[0]?.product_return_policy &&
//       orderData?.delivery_status == 'Delivered' &&
//       orderReturnStatus == 0 ? (
//         <View
//           style={{
//             alignItems: 'center',
//             marginHorizontal: 20,
//             marginBottom: 20,
//           }}>
//           <VegUrbanCommonBtn
//             height={40}
//             width={'100%'}
//             borderRadius={20}
//             textSize={16}
//             textColor={theme?.colors?.text}
//             text={'Return Order'}
//             backgroundColor={theme?.colors?.colorPrimary}
//             onPress={() => {
//               openReturnModal();
//             }}
//             textStyle={{
//               fontFamily: FONTS?.bold,
//             }}
//           />
//         </View>
//       ) : null}
//     </SafeAreaView>
//   );
// };
//
// export default TrackList;
//
// const styles = StyleSheet.create({
//   order: {
//     fontSize: 16,
//     // fontWeight:'bold',
//     color: COLORS?.black,
//     fontFamily: FONTS?.regular,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 14,
//     marginTop: 2,
//     fontFamily: FONTS?.regular,
//   },
//   date: {
//     fontSize: 14,
//     fontFamily: FONTS?.regular,
//
//     marginEnd: 5,
//     marginTop: 3,
//     // marginLeft:20
//   },
//   wrapper: {
//     padding: 15,
//     backgroundColor: COLORS.white,
//     marginHorizontal: 15,
//     // marginVertical: 20,
//     borderRadius: 12,
//     // paddingBottom: 60
//
//     // paddingVertical:5
//   },
//   container: {
//     // backgroundColor: 'red',
//     // flexDirection:'row',
//     alignItems: 'center',
//     // padding: 8,
//     // marginHorizontal: 0,
//   },
//   container1: {
//     // backgroundColor: 'red',
//     flexDirection: 'row',
//     alignItems: 'center',
//     // padding: 8,
//     // marginHorizontal: 0,
//   },
//   packetIcon: {
//     width: 40,
//     height: 40,
//     backgroundColor: COLORS?.black,
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 8,
//   },
//   rightArrow: {
//     width: 10, // Width of the right arrow
//     height: 10, // Height of the right arrow
//     borderRightWidth: 2, // Width of the right arrow line
//     borderBottomWidth: 2, // Height of the right arrow line
//     transform: [{rotate: '45deg'}], // To rotate it to form a right arrow
//     borderColor: 'white', // Color of the right arrow
//   },
//   dots: {
//     color: COLORS?.black,
//     fontSize: 30, // Font size of the dots
//     alignItems: 'center',
//   },
//   dotsss: {
//     color: COLORS?.grey,
//     fontSize: 30, // Font size of the dots
//     alignItems: 'center',
//   },
//   amountwrapper: {
//     padding: 15,
//     backgroundColor: COLORS.white,
//     marginHorizontal: 18,
//     // marginVertical: 20,
//     borderRadius: 12,
//     marginBottom: 30,
//     // paddingBottom: 60
//
//     // paddingVertical:5
//   },
//   month: {
//     fontSize: 22,
//     // fontFamily: FONTS.medium,
//     color: COLORS.colorPrimary,
//   },
//   monthTitle: {
//     fontSize: 14,
//     // fontFamily: FONTS.regular,
//     color: COLORS.grey,
//     marginBottom: 2.5,
//   },
//   wrapperOrder: {
//     padding: 10,
//     // margin: 2,
//     backgroundColor: COLORS.white,
//     marginHorizontal: 10,
//     marginVertical: 10,
//     borderRadius: 12,
//     // paddingVertical:5
//   },
//   itemImage: {
//     width: '30%',
//     height: 100,
//     borderRadius: 20,
//
//     // resizeMode: 'center',
//     // alignItems: 'center',
//     // resizeMode: 'stretch',
//     // marginBottom: 10
//   },
//   divLine: {
//     height: 1,
//     alignSelf: 'center',
//     marginVertical: 5,
//     marginTop: 20,
//   },
//   textlable: {
//     fontSize: 16,
//     color: COLORS?.black,
//   },
//   amounttext: {
//     fontSize: 16,
//     // fontWeight: 'bold',
//     fontFamily: FONTS.semi_old,
//     color: COLORS?.black,
//   },
//   modalBackground: {
//     flex: 1,
//     // alignItems: 'center',
//     flexDirection: 'column',
//     justifyContent: 'flex-end',
//     backgroundColor: '#00000080',
//   },
//   activityIndicatorWrapper: {
//     backgroundColor: '#FFFFFF',
//     // borderRadius: 15,
//     width: SIZES.width,
//
//     display: 'flex',
//     flexDirection: 'column',
//     // paddingVertical: 8,
//   },
//   qtyText: {
//     fontFamily: 'OpenSans-SemiBold',
//     fontSize: 18,
//     color: COLORS.black,
//     textAlign: 'center',
//     flex: 0.3,
//   },
//   originalPrice: {
//     fontFamily: 'OpenSans-Regular',
//     fontSize: 11,
//     textDecorationLine: 'line-through',
//     color: COLORS.black,
//     marginStart: 8,
//
//     textDecorationColor: COLORS.black,
//   },
//   deleteSaveText: {
//     fontFamily: 'OpenSans-Medium',
//     fontSize: 14,
//     color: COLORS.red,
//     textAlign: 'center',
//     flex: 1,
//     marginTop: 5,
//   },
//   image: {
//     height: 90,
//     width: '28%',
//     // margin:6,
//     marginTop: 5,
//     resizeMode: 'stretch',
//     borderRadius: 5,
//     // paddingTop:10
//     // resizeMode:'contain',
//   },
//   innnerWrapper: {
//     flex: 1,
//     marginStart: 10,
//     marginTop: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   innnerWrapperOrder: {
//     flex: 1,
//     marginStart: 10,
//     marginTop: 0,
//     // flexDirection: 'row',
//     // justifyContent: 'space-between'
//   },
//   textName: {
//     fontFamily: FONTS?.semi_old,
//     fontSize: 16,
//     color: COLORS.black,
//   },
//   shipDetails: {
//     marginStart: 15,
//     marginTop: 0,
//     fontSize: 14,
//     fontFamily: FONTS.regular,
//   },
//   discountPrice: {
//     fontFamily: FONTS?.regular,
//     fontSize: 13,
//     color: COLORS.black,
//   },
//
//   finalPriceText: {
//     fontFamily: 'OpenSans-Medium',
//     fontSize: 17,
//     color: COLORS.colorPrimary,
//     marginTop: 3,
//   },
//   createProfile: {
//     fontSize: 16,
//     // fontFamily: FONTS.regular,
//     color: COLORS.grey,
//     lineHeight: 24,
//     alignSelf: 'center',
//   },
//   label: {
//     fontSize: 16,
//     marginTop: 16,
//     color: COLORS.black,
//     // fontFamily: FONTS.semi_bold,
//   },
// });
import {
  Alert,
  BackHandler,
  FlatList,
  I18nManager,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {icons, SIZES, STRING} from '../../constants';
import {FONTS} from '../../constants/Fonts';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {showProgressBar} from '../../redux/actions';
import {
  addToCartProduct,
  cancelUserOrder,
  createReviewForOrder,
  getReviewForOrder,
  getUserOrderById,
  returnUserOrder,
} from '../../redux/actions/CartApi';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {updateCartDataLength} from '../../redux/actions/HomeApi';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import CancelOrderModal from './CancelOrderModal';
import RateOrderModal from './RateOrderModal';
import ReturnOrderModal from './ReturnOrderModal';
import {IMAGE_BASE_URL} from '../../network/ApiEndPoints';

let check = false;

const TrackList = ({navigation, route}) => {
  const theme = useContext(themeContext);
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);
  const [receivedData, setReceivedData] = useState(null);
  const [orderReturnStatus, setOrderReturnStatus] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [flashAmount, setFlashAmount] = useState(null);
  const [productData, setProductData] = useState([]);
  const [productReviewData, setProductReviewData] = useState(null);
  console.log('data---', orderData);
  const cartDataLength = useSelector(
    state => state?.homeReducer?.cartDataLength,
  );

  const dispatch = useDispatch();
  const loginCount = useSelector(state => state?.state?.count);
  const userToken = useSelector(state => state?.state?.userToken);

  const isFocused = useIsFocused();

  useEffect(() => {
    let {item} = route?.params;
    console.log('item', item);
    setReceivedData(item);
    if (loginCount == 1) {
      if (isFocused) {
        dispatch(showProgressBar(true));
        dispatch(() => {
          getUserOrderById(
            dispatch,
            navigation,
            userToken,
            item?._id,
            successCallback,
            errorCallback,
            BannerErrorCallback,
          );
        });

        dispatch(() => {
          getReviewForOrder(
            dispatch,
            navigation,
            userToken,
            item?._id,

            successGetReviewCallback,
            errorGetReviewCallback,
            BannerErrorCallback,
          );
        });
      }
    }
  }, [isFocused]);

  const [daysDifference, setDaysDifference] = useState(null);

  useEffect(() => {
    const calculateDaysDifference = () => {
      // Get the current date and time
      const currentDate = new Date();
      // ShowConsoleLogMessage('currentDate = ' + currentDate);
      // Convert the 'createdAt' string to a Date object
      const createdDate = new Date(orderData?.createdAt);
      // ShowConsoleLogMessage('createdDate = ' + createdDate);

      // Calculate the difference in milliseconds
      const timeDifference = currentDate - createdDate;
      // ShowConsoleLogMessage('timeDifference = ' + timeDifference);

      // Convert the time difference to days
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      // ShowConsoleLogMessage(days);

      // Subtract the product_return_policy from the calculated days
      const daysRemaining =
        parseInt(orderData?.product_id[0]?.product_return_policy, 10) -
        parseInt(days);
      // ShowConsoleLogMessage(
      //   JSON.stringify(orderData?.product_id[0]?.product_return_policy) +
      //     ' = orderData?.product_id?.product_return_policy',
      // );
      // ShowConsoleLogMessage(daysRemaining);

      // Set the result in the state
      setDaysDifference(daysRemaining);
    };

    // Call the function when the component mounts
    calculateDaysDifference();
  }, [orderData]);

  const successCallback = async data => {
    setOrderData(data?.data);
    if (
      data?.data?.flash_discount_percentage != undefined &&
      parseInt(data?.data?.flash_discount_percentage) > 0
    ) {
      let sum =
        ((parseInt(data?.data?.amount) *
          parseInt(data?.data?.flash_discount_percentage)) /
          100) *
        parseInt(data?.data?.quantity);
      setFlashAmount(sum);
    }

    setOrderReturnStatus(data?.orderReturnStatus);
    // ShowConsoleLogMessage(JSON.stringify(data?.data));
    setProductData(data?.response);
    dispatch(showProgressBar(false));
  };

  const errorCallback = async data => {
    dispatch(showProgressBar(false));
    setOrderData(null);
    setProductData([]);
    setTimeout(() => {
      ShowToastMessage(data?.message || 'Something went wrong.');
    }, 100);
  };

  const BannerErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    ShowConsoleLogMessage(error);
  };

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [returnReason, setReturnReason] = useState('');
  const [review, setReview] = useState('');
  const [reason, setReason] = useState('');
  const [rate, setRate] = useState(0);

  function ratingCompleted(rating) {
    // console.log('Rating is: ' + rating);
    setRate(rating);
  }

  const showLogoutModal = () => {
    setLogoutModalVisible(true);
  };

  const hideLogoutModal = () => {
    setReason('');
    setLogoutModalVisible(false);
  };

  const openReviewModal = () => {
    setShowReviewModal(true);
  };

  const hideReviewModal = () => {
    setReview('');
    setRate(0);
    setShowReviewModal(false);
  };

  const openReturnModal = () => {
    setShowReturnModal(true);
  };

  const hideReturnModal = () => {
    setReturnReason('');
    setShowReturnModal(false);
  };

  const handleReturnConfirm = () => {
    // ShowConsoleLogMessage(orderData?._id);
    dispatch(showProgressBar(true));
    dispatch(() => {
      returnUserOrder(
        dispatch,
        navigation,
        userToken,
        orderData?._id,
        reason,
        successReturnCallback,
        errorReturnCallback,
        BannerErrorCallback,
      );
    });
  };
  const handleLogoutConfirm = () => {
    // ShowConsoleLogMessage(orderData?._id);
    dispatch(showProgressBar(true));
    dispatch(() => {
      cancelUserOrder(
        dispatch,
        navigation,
        userToken,
        orderData?._id,
        reason,
        successCancelCallback,
        errorCancelCallback,
        BannerErrorCallback,
      );
    });
  };

  const handleReviewConfirm = () => {
    // ShowConsoleLogMessage(productData[0].product_id?._id);
    if (rate == 0) {
      ShowToastMessage('Please leave a star');
    } else {
      dispatch(showProgressBar(true));
      dispatch(() => {
        createReviewForOrder(
          dispatch,
          navigation,
          userToken,
          orderData?._id,
          productData[0].product_id?._id + '',
          rate,
          review,
          successReviewCallback,
          errorReviewCallback,
          BannerErrorCallback,
        );
      });
    }
  };
  const successReviewCallback = async data => {
    dispatch(showProgressBar(false));
    hideReviewModal();
    callGetReviewApi(orderData?._id);

    Alert.alert(
      'Review',
      '' + data?.message,
      [
        {
          text: 'OK',
          onPress: () => {
            // callGetReviewApi(orderData?._id);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const callGetReviewApi = () => {
    dispatch(() => {
      getReviewForOrder(
        dispatch,
        navigation,
        userToken,
        orderData?._id,
        successGetReviewCallback,
        errorGetReviewCallback,
        BannerErrorCallback,
      );
    });
  };

  const successGetReviewCallback = async data => {
    dispatch(showProgressBar(false));
    // ShowConsoleLogMessage(JSON.stringify(data));
    setProductReviewData(data?.data);
  };
  const errorGetReviewCallback = async data => {
    dispatch(showProgressBar(false));
    setProductReviewData(null);
    // setTimeout(() => {
    //   ShowToastMessage(data?.message || 'Something went wrong.');
    // }, 100);
  };

  const errorReviewCallback = async data => {
    dispatch(showProgressBar(false));
    setTimeout(() => {
      ShowToastMessage(data?.message || 'Something went wrong.');
    }, 100);
  };

  const successReturnCallback = async data => {
    dispatch(showProgressBar(false));
    ShowConsoleLogMessage(JSON.stringify(data));
    hideReturnModal();
    Alert.alert(
      'Return Order',
      '' + data?.message || 'Return request created.',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const errorReturnCallback = async data => {
    ShowConsoleLogMessage(JSON.stringify(data));
    dispatch(showProgressBar(false));
    setTimeout(() => {
      ShowToastMessage(data?.message || 'Something went wrong.');
    }, 100);
  };

  const successCancelCallback = async data => {
    dispatch(showProgressBar(false));
    hideLogoutModal();
    Alert.alert(
      'Cancel Order',
      '' + data?.message,
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const errorCancelCallback = async data => {
    dispatch(showProgressBar(false));
    setTimeout(() => {
      ShowToastMessage(data?.message || 'Something went wrong.');
    }, 100);
  };

  const renderItem = ({item}) => {
    const fa =
      ((parseInt(item?.amount) * parseInt(item?.flash_discount_percentage)) /
        100) *
      parseInt(item?.quantity);

    // ShowConsoleLogMessage(item?.flash_discount_percentage);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProductDetail', {item: item});
        }}
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
                ]}>
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
              {item?.flash_discount_percentage > 0 ? (
                <Text
                  style={[
                    styles.finalPriceText,
                    {
                      alignSelf: 'flex-start',
                      color: theme?.colors?.colorPrimary,
                      marginTop: 5,
                    },
                  ]}>
                  {STRING.APP_CURRENCY} {/*{parseInt(item?.amount) -*/}
                  {/*  ((parseInt(item?.amount) **/}
                  {/*    parseInt(item?.flash_discount_percentage)) /*/}
                  {/*    100) **/}
                  {/*    parseInt(item?.quantity)}*/}
                  {parseInt(item?.amount) * parseInt(item?.quantity) - fa}
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
                  {STRING.APP_CURRENCY}{' '}
                  {parseInt(item?.amount) * parseInt(item?.quantity)}
                  {/*{STRING.APP_CURRENCY} {item?.amount}*/}
                </Text>
              )}

              {/*<Text*/}
              {/*  style={[*/}
              {/*    styles.finalPriceText,*/}
              {/*    {*/}
              {/*      alignSelf: 'flex-start',*/}
              {/*      color: theme?.colors?.colorPrimary,*/}
              {/*      marginTop: 8,*/}
              {/*    },*/}
              {/*  ]}>*/}
              {/*  {STRING.APP_CURRENCY}*/}
              {/*  {parseInt(item?.amount) * parseInt(item?.quantity)}*/}
              {/*</Text>*/}

              <Text
                onPress={() => {
                  dispatch(() => {
                    addToCartProduct(
                      dispatch,
                      navigation,
                      userToken,
                      item?.product_id?._id + '',
                      item?.quantity + '',
                      parseInt(item?.amount) + '',
                      item?.color,
                      item?.size,
                      data => {
                        ShowConsoleLogMessage(data?.message + '');
                        if (data?.message === 'Add to Cart Successful') {
                          dispatch(updateCartDataLength(cartDataLength + 1));
                        }
                        ShowToastMessage(
                          data?.message || 'Add to cart successful',
                        );
                      },
                      data => {
                        ShowToastMessage(
                          data?.errors || 'Unable to add to cart',
                        );
                      },
                      BannerErrorCallback,
                    );
                  });
                }}
                style={[
                  styles.finalPriceText,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                    marginTop: 8,
                    marginEnd: 8,
                    fontSize: 14,
                    textDecorationLine: 'underline',
                    textDecorationStyle: 'solid',
                    // backgroundColor: 'red',
                    padding: 5,
                  },
                ]}>
                Re-Order
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const [step, setStep] = useState(1);
  const [deliveryStatus, setDeliveryStatus] = useState('Pending');
  const [packetInTruck, setPacketInTruck] = useState(false);

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setPacketInTruck(true);
      setStep(3);
    } else if (step === 3) {
      setDeliveryStatus('Delivered');
      setStep(4);
    }
  };

  const handleBackButton = () => {
    // You can implement your own logic for handling the back button press here.
    // For example, you can navigate to a previous screen, show a confirmation dialog, or exit the app.

    // To prevent the default behavior (e.g., going back in navigation stack), return true.
    // If you want the default behavior, return false or remove this handler.

    // ShowConsoleLogMessage(receivedData);
    if (check == true) {
      // ShowConsoleLogMessage('if p[art');
      navigation.reset({
        index: 0,
        routes: [{name: 'MainContainer'}],
      });
      return true;
    } else {
      // ShowConsoleLogMessage('else p[art');
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'MainContainer'}],
      // });
      return false;
    }
  };
  useEffect(() => {
    let {item} = route?.params;
    // ShowConsoleLogMessage(item);
    if (item?.intentFromPayment != undefined) {
      check = true;
    } else {
      check = false;
    }
    setReceivedData(item);

    // Add the event listener for the back button press
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    // Clean up the event listener when the component is unmounted
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const renderShipDot = () => {
    return (
      <View
        style={{
          fontSize: 35,
          height: 4,
          width: 4,
          margin: 1.5,
          marginStart: 8,
          borderRadius: 5,
          backgroundColor:
            orderData?.delivery_status == 'Shipped'
              ? theme?.colors?.colorPrimary
              : orderData?.delivery_status == 'On The Way'
              ? theme?.colors?.colorPrimary
              : orderData?.delivery_status == 'Delivered'
              ? theme?.colors?.colorPrimary
              : theme?.colors?.grey,
        }}
      />
    );
  };
  const renderOnWayDot = () => {
    return (
      <View
        style={{
          fontSize: 35,
          height: 4,
          width: 4,
          margin: 1.5,
          marginStart: 8,
          borderRadius: 5,
          backgroundColor:
            orderData?.delivery_status == 'On The Way'
              ? theme?.colors?.colorPrimary
              : orderData?.delivery_status == 'Delivered'
              ? theme?.colors?.colorPrimary
              : theme?.colors?.grey,
        }}
      />
    );
  };

  const renderDeliveryDot = () => {
    return (
      <View
        style={{
          fontSize: 35,
          height: 4,
          width: 4,
          margin: 1.5,
          marginStart: 8,
          borderRadius: 5,
          backgroundColor:
            orderData?.delivery_status == 'Delivered'
              ? theme?.colors?.colorPrimary
              : theme?.colors?.grey,
        }}
      />
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
              opacity: !show ? 1 : 0.0,
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              marginStart: 10,
            },
          ]}
          onPress={() => {
            if (receivedData?.intentFromPayment == true) {
              handleBackButton();
            } else {
              navigation.goBack();
            }
            // ShowToastMessage('Coming Soon!');
          }}
        />

        <VegUrbanCommonToolBar
          title="Track Order"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
          }}
          textStyle={{
            color: theme.colors.textColor,
            fontSize: 20,
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
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
            {/*<ImageBackground*/}
            {/*  style={[*/}
            {/*    styles.itemImage,*/}
            {/*    {*/}
            {/*      // backgroundColor:"#F2F4F4",*/}
            {/*      backgroundColor: theme?.colors?.colorimageback,*/}
            {/*      alignItems: 'center',*/}
            {/*      justifyContent: 'center',*/}
            {/*      alignSelf: 'flex-start',*/}
            {/*    },*/}
            {/*  ]}>*/}
            {/*  <Image*/}
            {/*    style={{*/}
            {/*      width: 60,*/}
            {/*      height: 60,*/}
            {/*      alignSelf: 'center',*/}
            {/*      tintColor: theme?.colors?.white,*/}
            {/*    }}*/}
            {/*    source={icons.order_successful}*/}
            {/*  />*/}
            {/*</ImageBackground>*/}

            <VegUrbanImageLoader
              source={
                IMAGE_BASE_URL + productData[0]?.product_id?.thumbnail_image
              }
              styles={[
                {
                  width: 90,
                  height: 90,
                  // alignSelf: 'center',
                  alignSelf: 'flex-start',
                  margin: 8,
                  // resizeMode:'contain',
                  borderRadius: 5,
                  // marginTop: 30
                },
              ]}
            />

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
                  ]}>
                  Order id: {orderData?.order_id}
                </Text>
              </View>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                    fontSize: 14,
                    marginVertical: 5,
                    fontFamily: FONTS.regular,
                  },
                ]}>
                {orderData?.createdAt
                  ? `Date & Time: ${moment(orderData?.createdAt).format('LLL')}`
                  : ''}
              </Text>

              <View
                style={[
                  GlobalStyle.flexRowAlignCenter,
                  {
                    paddingBottom: 10,
                  },
                ]}>
                <View
                  style={{
                    backgroundColor: theme?.colors?.colorimageback,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    padding: 4,
                    marginTop: 5,
                    // width: '38%',
                    alignItems: 'center',
                  }}>
                  {orderData?.is_cancelled === 'Active' ? (
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 12,
                        fontFamily: FONTS?.semi_old,
                        textAlign: 'center',
                        color: theme?.colors?.white,
                      }}>
                      Cancelled
                    </Text>
                  ) : (
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 12,
                        fontFamily: FONTS?.semi_old,
                        textAlign: 'center',
                        color: theme?.colors?.white,
                      }}>
                      {orderData?.delivery_status}
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    backgroundColor: theme?.colors?.colorimageback,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    padding: 4,
                    marginTop: 5,
                    // width: '38%',
                    alignItems: 'center',
                    marginStart: 10,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 12,
                      color: theme?.colors?.white,
                      fontFamily: FONTS?.semi_old,

                      textAlign: 'center',
                    }}>
                    {orderData?.payment_status}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: theme?.colors?.colorimageback,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    padding: 4,
                    marginTop: 5,
                    // width: '38%',
                    alignItems: 'center',
                    marginStart: 10,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 12,
                      color: theme?.colors?.white,
                      fontFamily: FONTS?.semi_old,

                      textAlign: 'center',
                    }}>
                    {orderData?.payment_mode}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  GlobalStyle.flexRowAlignCenter,
                  {
                    paddingBottom: 10,
                    // backgroundColor: 'red',
                  },
                ]}>
                <>
                  {orderData?.is_return == 'Active' ? (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ReturnOrder');
                      }}
                      style={{
                        backgroundColor: theme?.colors?.colorimageback,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        padding: 4,
                        marginTop: 5,
                        // width: '38%',
                        // flexGrow: 1,
                        alignItems: 'flex-start',
                        alignSelf: 'flex-start',
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 12,
                          // color: theme?.colors?.white,
                          fontFamily: FONTS?.medium,
                          color: 'blue',
                          textAlign: 'center',
                        }}>
                        Order Return
                      </Text>
                    </TouchableOpacity>
                  ) : null}

                  {orderData?.is_refund == 'Active' ? (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Refund');
                      }}
                      style={{
                        backgroundColor: theme?.colors?.colorimageback,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        padding: 4,
                        marginTop: 5,
                        marginStart: 7,
                        // width: '38%',
                        // flexGrow: 1,
                        alignItems: 'flex-start',
                        alignSelf: 'flex-start',
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 12,
                          color: 'blue',
                          fontFamily: FONTS?.medium,

                          textAlign: 'center',
                        }}>
                        Refund Amount
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </>
              </View>

              {orderData?.is_cancelled != 'Active' ? null : (
                <View
                  style={{
                    backgroundColor: theme?.colors?.colorimageback,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    padding: 4,
                    marginTop: 5,
                    // width: '38%',
                    // flexGrow: 1,
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 12,
                      color: theme?.colors?.white,
                      fontFamily: FONTS?.semi_old,

                      textAlign: 'center',
                    }}>
                    Order Cancelled
                  </Text>
                </View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {orderData ? (
                  orderData?.flash_discount_percentage > 0 ? (
                    <Text
                      style={[
                        styles.finalPriceText,
                        {
                          alignSelf: 'flex-start',
                          color: theme?.colors?.colorPrimary,
                          marginTop: 5,
                        },
                      ]}>
                      {STRING.APP_CURRENCY} {/*{parseInt(orderData?.amount) -*/}
                      {/*  ((parseInt(orderData?.amount) **/}
                      {/*    parseInt(orderData?.flash_discount_percentage)) /*/}
                      {/*    100) **/}
                      {/*    parseInt(orderData?.quantity)}*/}
                      {parseInt(orderData?.amount) *
                        parseInt(orderData?.quantity) -
                        flashAmount}
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
                      {STRING.APP_CURRENCY}{' '}
                      {parseInt(orderData?.amount) *
                        parseInt(orderData?.quantity)}
                      {/*{STRING.APP_CURRENCY} {item?.amount}*/}
                    </Text>
                  )
                ) : (
                  ''
                )}

                {/*<Text*/}
                {/*  style={[*/}
                {/*    styles.finalPriceText,*/}
                {/*    {*/}
                {/*      // alignSelf: 'flex-start',*/}
                {/*      color: theme?.colors?.colorPrimary,*/}
                {/*      marginTop: 8,*/}
                {/*      // fontWeight: 'bold',*/}
                {/*      fontFamily: FONTS.semi_old,*/}
                {/*    },*/}
                {/*  ]}>*/}
                {/*  {STRING.APP_CURRENCY}{' '}*/}
                {/*  {orderData ? orderData?.amount * orderData?.quantity : ''}*/}
                {/*</Text>*/}
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
            marginVertical: 10,
            alignSelf: 'center',
          }}>
          <View
            style={[
              {
                flexDirection: 'row',
              },
            ]}>
            <View style={styles.container}>
              <MaterialIcons
                name="backpack"
                size={30}
                color={theme?.colors?.colorPrimary}
                style={{}}
              />
              <View
                style={{
                  backgroundColor: theme?.colors?.colorPrimary,
                  width: 20,
                  height: 20,
                  alignItems: 'center',
                  borderRadius: 25,

                  justifyContent: 'center',
                  marginTop: 15,
                }}>
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color={theme?.colors?.btnTextColor}
                />
              </View>
            </View>
            <View
              style={{
                alignSelf: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: 35,
                  textAlign: 'center',
                  color:
                    orderData?.delivery_status == 'Shipped'
                      ? theme?.colors?.colorPrimary
                      : orderData?.delivery_status == 'On The Way'
                      ? theme?.colors?.colorPrimary
                      : orderData?.delivery_status == 'Delivered'
                      ? theme?.colors?.colorPrimary
                      : theme?.colors?.grey,
                }}>
                ......
              </Text>
            </View>
          </View>

          <View
            style={[
              {
                flexDirection: 'row',
              },
            ]}>
            <View style={styles.container}>
              <Feather
                name="truck"
                size={30}
                color={
                  orderData?.delivery_status == 'Shipped'
                    ? theme?.colors?.colorPrimary
                    : orderData?.delivery_status == 'On The Way'
                    ? theme?.colors?.colorPrimary
                    : orderData?.delivery_status == 'Delivered'
                    ? theme?.colors?.colorPrimary
                    : theme?.colors?.grey
                }
              />
              <View
                style={{
                  backgroundColor:
                    orderData?.delivery_status == 'Shipped'
                      ? theme?.colors?.colorPrimary
                      : orderData?.delivery_status == 'On The Way'
                      ? theme?.colors?.colorPrimary
                      : orderData?.delivery_status == 'Delivered'
                      ? theme?.colors?.colorPrimary
                      : theme?.colors?.grey,
                  width: 20,
                  height: 20,
                  alignItems: 'center',
                  borderRadius: 25,
                  justifyContent: 'center',
                  marginTop: 15,
                }}>
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color={
                    orderData?.delivery_status == 'Shipped'
                      ? theme?.colors?.btnTextColor
                      : orderData?.delivery_status == 'On The Way'
                      ? theme?.colors?.btnTextColor
                      : orderData?.delivery_status == 'Delivered'
                      ? theme?.colors?.btnTextColor
                      : theme?.colors?.btnTextColor
                  }
                />
              </View>
            </View>

            <View
              style={{
                alignSelf: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: 35,
                  textAlign: 'center',
                  color:
                    orderData?.delivery_status == 'On The Way'
                      ? theme?.colors?.colorPrimary
                      : orderData?.delivery_status == 'Delivered'
                      ? theme?.colors?.colorPrimary
                      : theme?.colors?.grey,
                }}>
                ......
              </Text>
            </View>
          </View>
          <View
            style={[
              {
                flexDirection: 'row',
              },
            ]}>
            <View style={styles.container}>
              <FontAwesome5
                name="people-carry"
                size={28}
                color={
                  orderData?.delivery_status == 'On The Way'
                    ? theme?.colors?.colorPrimary
                    : orderData?.delivery_status == 'Delivered'
                    ? theme?.colors?.colorPrimary
                    : theme?.colors?.grey
                }
              />

              <View
                style={{
                  backgroundColor:
                    orderData?.delivery_status == 'On The Way'
                      ? theme?.colors?.colorPrimary
                      : orderData?.delivery_status == 'Delivered'
                      ? theme?.colors?.colorPrimary
                      : theme?.colors?.grey,
                  width: 20,
                  height: 20,
                  alignItems: 'center',
                  borderRadius: 25,

                  justifyContent: 'center',
                  marginTop: 15,
                }}>
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color={
                    orderData?.delivery_status == 'On The Way'
                      ? theme?.colors?.btnTextColor
                      : orderData?.delivery_status == 'Delivered'
                      ? theme?.colors?.btnTextColor
                      : theme?.colors?.btnTextColor
                  }
                />
              </View>
            </View>
            <View
              style={{
                alignSelf: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: 35,
                  textAlign: 'center',
                  color:
                    orderData?.delivery_status == 'Delivered'
                      ? theme?.colors?.colorPrimary
                      : theme?.colors?.grey,
                }}>
                ......
              </Text>
            </View>
          </View>
          <View
            style={[
              {
                flexDirection: 'row',
              },
            ]}>
            <View style={styles.container}>
              <AntDesign
                name="CodeSandbox"
                size={30}
                color={
                  orderData?.delivery_status == 'Delivered'
                    ? theme?.colors?.colorPrimary
                    : theme?.colors?.grey
                }
              />

              <View
                style={{
                  backgroundColor:
                    orderData?.delivery_status == 'Delivered'
                      ? theme?.colors?.colorPrimary
                      : theme?.colors?.grey,
                  width: 20,
                  height: 20,
                  marginTop: 15,
                  alignItems: 'center',
                  borderRadius: 25,

                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color={
                    orderData?.delivery_status == 'Delivered'
                      ? theme?.colors?.btnTextColor
                      : theme?.colors?.btnTextColor
                  }
                />
              </View>

              {/* <Text style={styles.dotsss}>· · · · ·</Text> */}
            </View>
          </View>
        </View>

        <View
          style={[
            styles.divLine,
            {
              width: '90%',
              backgroundColor: theme?.colors?.grey,
            },
          ]}
        />

        <View>
          <Text
            style={[
              styles.textName,
              {
                alignSelf: 'flex-start',
                color: theme?.colors?.white,
                marginStart: 20,
                marginTop: 10,
                // marginBottom: 20,
              },
            ]}>
            Order Status Details
          </Text>

          <View
            style={{
              marginHorizontal: 10,
              marginVertical: 10,
              paddingHorizontal: 15,
            }}>
            {orderData?.is_return === 'Active' &&
              orderData?.payment_mode === 'Cod' && (
                // ||orderData?.payment_mode === 'Cod'
                <View style={[{}]}>
                  <View style={styles.container1}>
                    <View
                      style={{
                        backgroundColor: theme?.colors?.colorPrimary,
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                        borderRadius: 25,
                        justifyContent: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="check"
                        size={16}
                        color={theme?.colors?.btnTextColor}
                      />
                    </View>
                    {orderData?.return_status === 'Accepted' ? (
                      <Text
                        style={[
                          styles.shipDetails,
                          {
                            color:
                              orderData?.return_status === 'Rejected'
                                ? '#FF0000'
                                : '#4DB857',

                            fontFamily: FONTS?.bold,
                          },
                        ]}>
                        Return {orderData?.return_status}
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.shipDetails,
                          {
                            color: theme?.colors?.white,
                            fontFamily: FONTS?.regular,
                          },
                        ]}>
                        Return Pending
                      </Text>
                    )}
                  </View>
                  {/* <Text
                  style={[
                    // styles.textName,
                    {
                      alignSelf: 'flex-start',
                      color: theme?.colors?.white,
                      // marginStart: 20,
                      marginEnd: 5,
                      marginTop: 10,
                      // marginBottom: 20,
                      fontFamily: FONTS.regular,
                      marginHorizontal: 20,
                      marginLeft: 36
                    },
                  ]}>
                  {orderData?.cancellation_reason}
                </Text> */}
                  {/* {orderData?.payment_mode === 'Stripe' && (

                  <FlatList data={[1, 2, 2, 3, 5]} renderItem={renderShipDot} />
                )} */}
                </View>
              )}
            {orderData?.is_cancelled === 'Active' && (
              // ||orderData?.payment_mode === 'Cod'
              <View style={[{}]}>
                <View style={styles.container1}>
                  <View
                    style={{
                      backgroundColor: theme?.colors?.colorPrimary,
                      width: 20,
                      height: 20,
                      alignItems: 'center',
                      borderRadius: 25,
                      justifyContent: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="check"
                      size={16}
                      color={theme?.colors?.btnTextColor}
                    />
                  </View>
                  <Text
                    style={[
                      styles.shipDetails,
                      {
                        color: theme?.colors?.white,
                      },
                    ]}>
                    Cancelled
                  </Text>
                </View>
                {/* <Text
                  style={[
                    // styles.textName,
                    {
                      alignSelf: 'flex-start',
                      color: theme?.colors?.white,
                      // marginStart: 20,
                      marginEnd: 5,
                      marginTop: 10,
                      // marginBottom: 20,
                      fontFamily: FONTS.regular,
                      marginHorizontal: 20,
                      marginLeft: 36
                    },
                  ]}>
                  {orderData?.cancellation_reason}
                </Text> */}
                {orderData?.payment_mode === 'Stripe' &&
                orderData?.is_refund === 'Active' ? (
                  <>
                    <FlatList
                      data={[1, 2, 2, 3, 5]}
                      renderItem={renderShipDot}
                    />
                  </>
                ) : null}
              </View>
            )}

            {
              // orderData?.is_cancelled === 'Active' &&
              orderData?.payment_mode === 'Stripe' &&
                orderData?.is_refund === 'Active' && (
                  <View style={[{}]}>
                    <View style={styles.container1}>
                      <View
                        style={{
                          backgroundColor: theme?.colors?.colorPrimary,
                          width: 20,
                          height: 20,
                          alignItems: 'center',
                          borderRadius: 25,
                          justifyContent: 'center',
                        }}>
                        <MaterialCommunityIcons
                          name="check"
                          size={16}
                          color={theme?.colors?.btnTextColor}
                        />
                      </View>
                      {orderData?.refund_status === 'Accepted' ||
                      orderData?.refund_status === 'Rejected' ? (
                        <Text
                          style={[
                            styles.shipDetails,
                            {
                              // color: '#4DB857',
                              color:
                                orderData?.refund_status === 'Rejected'
                                  ? '#FF0000'
                                  : '#4DB857',

                              fontFamily: FONTS?.bold,
                            },
                          ]}>
                          {/* Refund Amount : Accepted */}
                          {/* Return Accepted */}
                          Refund {orderData?.refund_status}
                        </Text>
                      ) : (
                        <Text
                          style={[
                            styles.shipDetails,
                            {
                              color: theme?.colors?.white,
                              fontFamily: FONTS?.regular,
                            },
                          ]}>
                          Refund Pending
                        </Text>
                      )}
                    </View>

                    {
                      // orderData?.is_cancelled === 'Active' &&
                      orderData?.payment_mode === 'Stripe' ? (
                        orderData?.is_return === 'Active' ? (
                          <FlatList
                            data={[1, 2, 2, 3, 5]}
                            renderItem={renderShipDot}
                          />
                        ) : null
                      ) : null
                    }
                  </View>
                )
            }

            {
              // orderData?.is_cancelled === 'Active' &&
              orderData?.payment_mode === 'Stripe' &&
                orderData?.is_return === 'Active' && (
                  <View style={[{}]}>
                    <View style={styles.container1}>
                      <View
                        style={{
                          backgroundColor: theme?.colors?.colorPrimary,
                          width: 20,
                          height: 20,
                          alignItems: 'center',
                          borderRadius: 25,
                          justifyContent: 'center',
                        }}>
                        <MaterialCommunityIcons
                          name="check"
                          size={16}
                          color={theme?.colors?.btnTextColor}
                        />
                      </View>
                      {orderData?.return_status === 'Accepted' ? (
                        <Text
                          style={[
                            styles.shipDetails,
                            {
                              // color: '#4DB857',
                              color:
                                orderData?.return_status === 'Rejected'
                                  ? '#FF0000'
                                  : '#4DB857',

                              fontFamily: FONTS?.bold,
                            },
                          ]}>
                          {/* Refund Amount : Accepted */}
                          Return {orderData?.return_status}
                        </Text>
                      ) : (
                        <Text
                          style={[
                            styles.shipDetails,
                            {
                              color: theme?.colors?.white,
                              fontFamily: FONTS?.regular,
                            },
                          ]}>
                          Return Pending
                        </Text>
                      )}
                    </View>

                    {/* <FlatList data={[1, 2, 2, 3, 5]} renderItem={renderShipDot} /> */}
                  </View>
                )
            }

            {orderData?.is_cancelled !== 'Active' &&
              orderData?.is_return !== 'Active' &&
              orderData?.is_refund !== 'Active' && (
                <View style={[{}]}>
                  <View style={styles.container1}>
                    <View
                      style={{
                        backgroundColor: theme?.colors?.colorPrimary,
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                        borderRadius: 25,
                        justifyContent: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="check"
                        size={16}
                        color={theme?.colors?.btnTextColor}
                      />
                    </View>
                    <Text
                      style={[
                        styles.shipDetails,
                        {
                          color: theme?.colors?.white,
                        },
                      ]}>
                      Pending
                    </Text>
                  </View>

                  <FlatList data={[1, 2, 2, 3, 5]} renderItem={renderShipDot} />
                </View>
              )}

            {orderData?.is_cancelled !== 'Active' &&
              orderData?.is_return !== 'Active' &&
              orderData?.is_refund !== 'Active' && (
                <View style={[{}]}>
                  <View style={styles.container1}>
                    <View
                      style={{
                        backgroundColor:
                          orderData?.delivery_status == 'Shipped'
                            ? theme?.colors?.colorPrimary
                            : orderData?.delivery_status == 'On The Way'
                            ? theme?.colors?.colorPrimary
                            : orderData?.delivery_status == 'Delivered'
                            ? theme?.colors?.colorPrimary
                            : theme?.colors?.grey,
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                        borderRadius: 25,
                        justifyContent: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="check"
                        size={16}
                        color={
                          orderData?.delivery_status == 'Shipped'
                            ? theme?.colors?.btnTextColor
                            : orderData?.delivery_status == 'On The Way'
                            ? theme?.colors?.btnTextColor
                            : orderData?.delivery_status == 'Delivered'
                            ? theme?.colors?.btnTextColor
                            : theme?.colors?.btnTextColor
                        }
                      />
                    </View>
                    <Text
                      style={[
                        styles.shipDetails,
                        {
                          color: theme?.colors?.white,
                        },
                      ]}>
                      Picked Up
                    </Text>
                  </View>
                  <FlatList
                    data={[1, 2, 2, 3, 5]}
                    renderItem={renderOnWayDot}
                  />
                </View>
              )}

            {orderData?.is_cancelled !== 'Active' &&
            orderData?.is_return !== 'Active'
              ? orderData?.is_refund !== 'Active' && (
                  <View style={[{}]}>
                    <View style={styles.container1}>
                      <View
                        style={{
                          backgroundColor:
                            orderData?.delivery_status == 'On The Way'
                              ? theme?.colors?.colorPrimary
                              : orderData?.delivery_status == 'Delivered'
                              ? theme?.colors?.colorPrimary
                              : theme?.colors?.grey,
                          width: 20,
                          height: 20,
                          alignItems: 'center',
                          borderRadius: 25,
                          justifyContent: 'center',
                        }}>
                        <MaterialCommunityIcons
                          name="check"
                          size={16}
                          color={
                            orderData?.delivery_status == 'On The Way'
                              ? theme?.colors?.btnTextColor
                              : orderData?.delivery_status == 'Delivered'
                              ? theme?.colors?.btnTextColor
                              : theme?.colors?.btnTextColor
                          }
                        />
                      </View>
                      <Text
                        style={[
                          styles.shipDetails,
                          {
                            color: theme?.colors?.white,
                          },
                        ]}>
                        On The Way
                      </Text>
                    </View>
                    <FlatList
                      data={[1, 2, 2, 3, 5]}
                      renderItem={renderDeliveryDot}
                    />
                  </View>
                )
              : null}
            {orderData?.is_cancelled !== 'Active' &&
              orderData?.is_return !== 'Active' &&
              orderData?.is_refund !== 'Active' && (
                <View style={[{}]}>
                  <View style={styles.container1}>
                    <View
                      style={{
                        backgroundColor:
                          orderData?.delivery_status == 'Delivered'
                            ? theme?.colors?.colorPrimary
                            : theme?.colors?.grey,
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                        borderRadius: 25,
                        justifyContent: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="check"
                        size={16}
                        color={
                          orderData?.delivery_status == 'Delivered'
                            ? theme?.colors?.btnTextColor
                            : theme?.colors?.btnTextColor
                        }
                      />
                    </View>
                    <Text
                      style={[
                        styles.shipDetails,
                        {
                          color: theme?.colors?.white,
                        },
                      ]}>
                      Delivered
                    </Text>
                  </View>
                </View>
              )}
          </View>
        </View>

        <View>
          <Text
            style={[
              styles.textName,
              {
                alignSelf: 'flex-start',
                color: theme?.colors?.white,
                marginStart: 20,
                marginTop: 10,
                // marginBottom: 20,
              },
            ]}>
            Product Details
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
            data={productData}
            renderItem={renderItem}
          />
        </View>
        <Text
          style={[
            styles.textName,
            {
              alignSelf: 'flex-start',
              color: theme?.colors?.white,
              marginStart: 20,
              marginTop: 10,
              marginBottom: 20,
            },
          ]}>
          {/*Shipping Details - Coming soon... {orderData?.addressId?.addressName}*/}
          Shipping Details
        </Text>

        <View
          style={[
            styles.wrapper,
            {
              // elevation: 5,
              backgroundColor: theme?.colors?.bg,
              marginBottom: 10,
            },
          ]}>
          <View
            style={[
              {
                flexDirection: 'row',
                marginEnd: 10,
              },
            ]}>
            <Image
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                tintColor: theme?.colors?.white,

                // alignSelf: 'center',
              }}
              // source={{
              //   uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoB3mYtLafUiRQEUeY7dQVt-rX0w7NF1kRa7SsXA3Nm2cBixmQUYZWYjgAT-5wVg3A7sM&usqp=CAU',
              // }}
              source={icons.address}
            />
            <View style={styles.innnerWrapper}>
              <View
                style={
                  {
                    // alignItems: 'center',
                    // flex: 1,
                    // width: '75%',
                  }
                }>
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
                        fontFamily: FONTS?.semi_old,
                        color: theme?.colors?.white,
                      },
                    ]}>
                    {orderData?.addressId?.name}
                  </Text>
                  {orderData?.addressId?.defaultAddress == 1 ? (
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
                      {orderData?.addressId?.defaultAddress == 1
                        ? 'Default'
                        : ''}
                    </Text>
                  ) : null}
                </View>

                <Text
                  style={[
                    styles.textName,
                    {
                      fontSize: 13,
                      color: theme?.colors?.white,
                      marginTop: 5,
                      fontFamily: FONTS?.regular,
                      alignSelf: 'flex-start',
                    },
                  ]}>
                  Email: {orderData?.addressId?.email}
                </Text>
                <Text
                  style={[
                    styles.textName,
                    {
                      fontSize: 13,
                      color: theme?.colors?.white,
                      marginTop: 5,
                      fontFamily: FONTS?.regular,
                      alignSelf: 'flex-start',
                    },
                  ]}>
                  Phone: {orderData?.addressId?.phone}
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    color: theme?.colors?.white,
                    marginTop: 5,
                    fontFamily: FONTS?.regular,
                    alignSelf: 'flex-start',
                  }}>
                  {orderData?.addressId?.address}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {productReviewData != null ? (
          <>
            <Text
              style={[
                styles.textName,
                {
                  alignSelf: 'flex-start',
                  color: theme?.colors?.white,
                  marginStart: 20,
                  marginTop: 10,
                  marginBottom: 20,
                },
              ]}>
              {/*Shipping Details - Coming soon... {orderData?.addressId?.addressName}*/}
              Review
            </Text>

            <View
              style={[
                styles.wrapper,
                {
                  // elevation: 5,
                  backgroundColor: theme?.colors?.bg,
                  marginBottom: 10,
                },
              ]}>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    marginEnd: 10,
                  },
                ]}>
                <View
                  style={[
                    styles.innnerWrapper,
                    {
                      marginStart: 0,
                    },
                  ]}>
                  <View
                    style={
                      {
                        // alignItems: 'center',
                        // flex: 1,
                        // width: '75%',
                      }
                    }>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                      // style={GlobalStyle.flexRowAlignCenter}
                    >
                      <AntDesign
                        name={'star'}
                        size={20}
                        color={theme?.colors?.textColor}
                      />
                      <Text
                        style={[
                          styles.itemPrice,
                          {
                            color: theme.colors.textColor,
                            marginLeft: 5,
                            fontSize: 18,
                            alignItems: 'center',
                            // marginBottom: 5
                          },
                        ]}>
                        {productReviewData?.rating}
                      </Text>
                    </View>
                    {productReviewData?.review?.length > 0 ? (
                      <Text
                        style={[
                          styles.textName,
                          {
                            fontSize: 13,
                            color: theme?.colors?.white,
                            fontFamily: FONTS?.regular,
                            alignSelf: 'flex-start',
                            marginTop: 5,
                          },
                        ]}>
                        {productReviewData?.review}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          </>
        ) : null}
        {orderData?.is_cancelled == 'Active' ? (
          <Text
            style={[
              styles.textName,
              {
                alignSelf: 'flex-start',
                color: theme?.colors?.white,
                marginStart: 20,
                marginTop: 10,
              },
            ]}>
            {/*Shipping Details - Coming soon... {orderData?.addressId?.addressName}*/}
            Order Cancel Details
          </Text>
        ) : null}
        {orderData?.cancellation_reason?.length > 0 ? (
          <Text
            style={[
              styles.textName,
              {
                alignSelf: 'flex-start',
                color: theme?.colors?.white,
                marginStart: 20,
                marginTop: 10,
              },
            ]}>
            {/*Shipping Details - Coming soon... {orderData?.addressId?.addressName}*/}
            Cancellation Reason:
          </Text>
        ) : null}

        {orderData?.cancellation_reason?.length > 0 ? (
          <Text
            style={[
              styles.textName,
              {
                alignSelf: 'flex-start',
                color: theme?.colors?.white,
                marginStart: 20,
                marginEnd: 5,
                marginTop: 10,
                marginBottom: 20,
                fontFamily: FONTS.regular,
              },
            ]}>
            {/*Shipping Details - Coming soon... {orderData?.addressId?.addressName}*/}
            {orderData?.cancellation_reason}
          </Text>
        ) : orderData?.is_cancelled == 'Active' ? (
          <Text
            style={[
              styles.textName,
              {
                alignSelf: 'flex-start',
                color: theme?.colors?.white,
                marginStart: 20,
                marginEnd: 5,
                marginTop: 10,
                marginBottom: 20,
                fontFamily: FONTS.regular,
              },
            ]}>
            Cancellation reason not found
          </Text>
        ) : null}
      </ScrollView>

      {orderData?.is_cancelled != 'Active' &&
      orderData?.delivery_status == 'Pending' ? (
        <View
          style={{
            alignItems: 'center',
            margin: 20,
          }}>
          <VegUrbanCommonBtn
            height={40}
            width={'100%'}
            borderRadius={20}
            textSize={16}
            textColor={theme?.colors?.text}
            text={
              orderData?.is_cancelled == 'Active'
                ? 'Order is cancelled'
                : 'Cancel Order'
            }
            backgroundColor={theme?.colors?.colorPrimary}
            onPress={() => {
              // Alert.alert(
              //   'Cancel Order',
              //   'Are you sure want to cancel this order ?',
              //   [
              //     {
              //       text: 'Cancel',
              //       onPress: () => {
              //         return null;
              //       },
              //     },
              //     {
              //       text: 'Confirm',
              //       onPress: () => {
              //         return null;
              //       },
              //     },
              //   ],
              //   {cancelable: false},
              // );
              if (orderData?.is_cancelled != 'Active') {
                showLogoutModal();
              }
            }}
            textStyle={{
              fontFamily: FONTS?.bold,
            }}
          />
        </View>
      ) : null}
      <View style={{flex: 1}}>
        <CancelOrderModal
          visible={isLogoutModalVisible}
          onCancel={hideLogoutModal}
          onConfirm={handleLogoutConfirm}
          email={reason}
          onChange={v => setReason(v)}
        />
      </View>

      <View style={{flex: 1}}>
        <ReturnOrderModal
          visible={showReturnModal}
          onCancel={hideReturnModal}
          onConfirm={handleReturnConfirm}
          email={returnReason}
          onChange={v => setReturnReason(v)}
        />
      </View>

      <View style={{flex: 1}}>
        <RateOrderModal
          visible={showReviewModal}
          onCancel={hideReviewModal}
          onConfirm={handleReviewConfirm}
          email={review}
          onChange={v => setReview(v)}
          ratingCompleted={v => ratingCompleted(v)}
          rate={rate}
        />
      </View>

      {orderData?.is_cancelled != 'Active' &&
      orderData?.delivery_status == 'Delivered' &&
      productReviewData == null ? (
        <View
          style={{
            alignItems: 'center',
            margin: 20,
          }}>
          <VegUrbanCommonBtn
            height={40}
            width={'100%'}
            borderRadius={20}
            textSize={16}
            textColor={theme?.colors?.text}
            text={
              'Write a review'
              // +
              // daysDifference +
              // ' --- ' +
              // orderData?.product_id[0]?.product_return_policy
            }
            backgroundColor={theme?.colors?.colorPrimary}
            onPress={() => {
              openReviewModal();
              // ShowToastMessage('Coming soon');
            }}
            textStyle={{
              fontFamily: FONTS?.bold,
            }}
          />
        </View>
      ) : null}

      {daysDifference <= orderData?.product_id[0]?.product_return_policy &&
      orderData?.delivery_status == 'Delivered' &&
      orderReturnStatus == 0 ? (
        <View
          style={{
            alignItems: 'center',
            marginHorizontal: 20,
            marginBottom: 20,
          }}>
          <VegUrbanCommonBtn
            height={40}
            width={'100%'}
            borderRadius={20}
            textSize={16}
            textColor={theme?.colors?.text}
            text={'Return Order'}
            backgroundColor={theme?.colors?.colorPrimary}
            onPress={() => {
              openReturnModal();
            }}
            textStyle={{
              fontFamily: FONTS?.bold,
            }}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default TrackList;

const styles = StyleSheet.create({
  order: {
    fontSize: 16,
    // fontWeight:'bold',
    color: COLORS?.black,
    fontFamily: FONTS?.regular,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    marginTop: 2,
    fontFamily: FONTS?.regular,
  },
  date: {
    fontSize: 14,
    fontFamily: FONTS?.regular,

    marginEnd: 5,
    marginTop: 3,
    // marginLeft:20
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
  container: {
    // backgroundColor: 'red',
    // flexDirection:'row',
    alignItems: 'center',
    // padding: 8,
    // marginHorizontal: 0,
  },
  container1: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 8,
    // marginHorizontal: 0,
  },
  packetIcon: {
    width: 40,
    height: 40,
    backgroundColor: COLORS?.black,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  rightArrow: {
    width: 10, // Width of the right arrow
    height: 10, // Height of the right arrow
    borderRightWidth: 2, // Width of the right arrow line
    borderBottomWidth: 2, // Height of the right arrow line
    transform: [{rotate: '45deg'}], // To rotate it to form a right arrow
    borderColor: 'white', // Color of the right arrow
  },
  dots: {
    color: COLORS?.black,
    fontSize: 30, // Font size of the dots
    alignItems: 'center',
  },
  dotsss: {
    color: COLORS?.grey,
    fontSize: 30, // Font size of the dots
    alignItems: 'center',
  },
  amountwrapper: {
    padding: 15,
    backgroundColor: COLORS.white,
    marginHorizontal: 18,
    // marginVertical: 20,
    borderRadius: 12,
    marginBottom: 30,
    // paddingBottom: 60

    // paddingVertical:5
  },
  month: {
    fontSize: 22,
    // fontFamily: FONTS.medium,
    color: COLORS.colorPrimary,
  },
  monthTitle: {
    fontSize: 14,
    // fontFamily: FONTS.regular,
    color: COLORS.grey,
    marginBottom: 2.5,
  },
  wrapperOrder: {
    padding: 10,
    // margin: 2,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 12,
    // paddingVertical:5
  },
  itemImage: {
    width: '30%',
    height: 100,
    borderRadius: 20,

    // resizeMode: 'center',
    // alignItems: 'center',
    // resizeMode: 'stretch',
    // marginBottom: 10
  },
  divLine: {
    height: 1,
    alignSelf: 'center',
    marginVertical: 5,
    marginTop: 20,
  },
  textlable: {
    fontSize: 16,
    color: COLORS?.black,
  },
  amounttext: {
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: FONTS.semi_old,
    color: COLORS?.black,
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
    fontFamily: FONTS?.semi_old,
    fontSize: 16,
    color: COLORS.black,
  },
  shipDetails: {
    marginStart: 15,
    marginTop: 0,
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
  discountPrice: {
    fontFamily: FONTS?.regular,
    fontSize: 13,
    color: COLORS.black,
  },

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
    fontSize: 16,
    marginTop: 16,
    color: COLORS.black,
    // fontFamily: FONTS.semi_bold,
  },
});
