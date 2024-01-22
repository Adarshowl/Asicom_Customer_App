import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {lazy, Suspense, useEffect, useState} from 'react';
import {I18nManager, LogBox, Text, View} from 'react-native';
import Splash from './src/screens/Auth/Splash';
import ForgotPassword from './src/screens/Auth/ForgotPassword';
import RNRestart from 'react-native-restart';
import Offers from './src/screens/Offers';
import Currency from './src/screens/Currency';
import Language from './src/screens/Language';
import AppColors from './src/constants/AppColors';
import Theme from './src/screens/Theme';
import {STRING} from './src/constants';
import {EventRegister} from 'react-native-event-listeners';
import themeContext from './src/constants/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RTL from './src/screens/RTL';
import './src/assets/i18n/i18n';
import {useTranslation} from 'react-i18next';
import SignUp from './src/screens/Auth/SignUp';
import PasswordConform from './src/screens/Auth/ForgotPassword/PasswordConform';
import PaymentItem from './src/screens/Payment/PaymentItem';
import Payment from './src/screens/Payment/Payment';
import HomeSwiper from './src/screens/Home/HomeSwiper';
import CategoryHome from './src/screens/Home/CategoryHome';
import TabHomecat from './src/screens/Home/TabHomecat';
import Checkout from './src/screens/Checkout/Checkout';
import ConfirmPayment from './src/screens/Payment/ConfirmPayment';
import ERecipt from './src/screens/Order/ERecipt';
import TrackList from './src/screens/Track/TrackList';
import Wallet from './src/screens/Wallet/Index';
import WalletList from './src/screens/Wallet/WalletList';
import SignupNew from './src/screens/Auth/SignUp/SignupNew';
import InviteFriends from './src/screens/InviteFriends/Index';
import Address from './src/screens/Address/Index';
import AddNewAddress from './src/screens/Address/AddNewAddress';
import WishList from './src/screens/WishList/WishList';
import HelpCenter from './src/screens/HelpCenter/HelpCenter';
import chat from './src/screens/HelpCenter/chat';
import ShippingAddress from './src/screens/Address/ShippingAddress';
import ChooseShipping from './src/screens/Checkout/ChooseShipping';
import PromoCode from './src/screens/Checkout/PromoCode';
import {Provider} from 'react-redux';
import store from './src/redux/store/configureStore';
import VegUrbanProgressBar from './src/utils/VegUrbanProgressBar';
import {StripeProvider} from '@stripe/stripe-react-native';
import StripePayment from './src/screens/Payment/StripePayment';
import {requestUserPermission} from './src/firebase/notificationService';
import notifee, {AndroidImportance} from '@notifee/react-native';

import messaging from '@react-native-firebase/messaging';
import NotificationDetails from './src/screens/Notification/NotificationDetails';
import AllCategories from './src/screens/Home/AllCategories';
import Refund from './src/screens/Refund';
import RefundDetails from './src/screens/Refund/RefundDetails';
import ReturnOrderDetails from './src/screens/Return/ReturnOrderDetails';
import ReturnOrder from './src/screens/Return';
import BottomTabNav from './src/navigation/bottom_tab_nav';
import PayPalPayment from './src/screens/Payment/PayPalPayment';

const OnBoarding = lazy(() => import('./src/screens/Auth/OnBoarding'));
const Login = lazy(() => import('./src/screens/Auth/Login'));
const Profile = lazy(() => import('./src/screens/Profile/index'));
const ProductDetail = lazy(() =>
  import('./src/screens/Products/ProductDetail'),
);

const Search = lazy(() => import('./src/screens/Search'));
const AddressList = lazy(() => import('./src/screens/Address/AddressList'));
const Order = lazy(() => import('./src/screens/Order'));
const OrderConfirm = lazy(() => import('./src/screens/Order/OrderConfirm'));
const TrackOrder = lazy(() => import('./src/screens/TrackOrder'));
const OrderDetails = lazy(() => import('./src/screens/Order/OrderDetails'));
const Cart = lazy(() => import('./src/screens/Cart'));
const Notification = lazy(() => import('./src/screens/Notification'));
const Transaction = lazy(() => import('./src/screens/Transaction'));
const About = lazy(() => import('./src/screens/Content/About'));
const Contact = lazy(() => import('./src/screens/Content/Contact'));
const FAQ = lazy(() => import('./src/screens/Content/FAQ'));
const CategoryData = lazy(() => import('./src/screens/Category/CategoryData'));
const TermsCondition = lazy(() =>
  import('./src/screens/Content/TermsCondition'),
);
const ForgotPageNext = lazy(() =>
  import('./src/screens/Auth/ForgotPassword/ForgotPageNext'),
);
const PrivacyPolicy = lazy(() => import('./src/screens/Content/PrivacyPolicy'));
const CategoryDataList = lazy(() =>
  import('./src/screens/Category/CategoryDataList'),
);
const AddNewCard = lazy(() => import('./src/screens/Payment/AddNewCard'));

const AddressAddUpdate = lazy(() =>
  import('./src/screens/Address/AddressAddUpdate'),
);
const FlashSale = lazy(() => import('./src/screens/Flash/FlashSale'));
const FlashDealSale = lazy(() => import('./src/screens/Flash/FlashDealSale'));
const Review = lazy(() => import('./src/screens/Review'));

LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);
const Stack = createNativeStackNavigator();

export const languageRestart = async () => {
  //changing language based on what was chosen
  //   if (//selected language is LTR) {
  //     if (I18nManager.isRTL) {
  //       await I18nManager.forceRTL(false);
  //     }
  // } else {
  if (!I18nManager.isRTL) {
    await I18nManager.forceRTL(true);
  } else if (I18nManager.isRTL) {
    await I18nManager.forceRTL(false);
  }
  // }
  RNRestart.restart();
};

const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: I18nManager.isRTL ? 'slide_from_left' : 'slide_from_right',
      }}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

const App = () => {
  if (!__DEV__) {
    console.log = () => {};
    console.info = () => {};
    console.warn = () => {};
    console.debug = () => {};
    console.error = () => {};
  }

  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    requestUserPermission();
    getUserFromStorage();
    const listener = EventRegister.addEventListener(STRING.app_theme, data => {
      setDarkMode(data);
      AsyncStorage.setItem(STRING.app_theme, data + '');
    });
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, [darkMode]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
        await DisplayNotification(remoteMessage);
      }
    });

    return unsubscribe;
  }, []);

  const DisplayNotification = async remoteMessage => {
    const channelId = await notifee.createChannel({
      id: 'Multi_Vendor',
      name: 'Multi_Vendor_Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: remoteMessage.notification?.title,
      body: remoteMessage?.data?.body || remoteMessage?.notification?.body,
      android: {
        channelId: channelId,
        loopSound: false,
        sound: 'default',
        // smallIcon: 'ic_launcher',
      },
    });

    notifee.onBackgroundEvent(event => {
      console.log('on background event notifee -=> ' + JSON.stringify(event));
    });
  };

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem(STRING.app_theme, (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            if (value == 'true') {
              setDarkMode(true);
            } else {
              setDarkMode(false);
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
            changeLanguage(value);
          } else {
            STRING.APP_LANGUAGE = 'en';
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };
  const {t, i18n} = useTranslation();

  const [currentLanguage, setLanguage] = useState('en');
  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };
  return (
    <StripeProvider publishableKey={STRING.STRIPE_PUBLISHABLE_KEY}>
      <Provider store={store}>
        <themeContext.Provider
          value={darkMode ? AppColors.dark : AppColors.light}>
          <Suspense
            fallback={
              <View>
                <Text>Loading...</Text>
              </View>
            }>
            <NavigationContainer
              // theme={STRING.APP_THEME == 'dark' ? AppColors.dark : AppColors.light}>
              theme={darkMode ? AppColors.dark : AppColors.light}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  animation: I18nManager.isRTL
                    ? 'slide_from_left'
                    : 'slide_from_right',
                  statusBarAnimation: 'slide',
                  statusBarColor: darkMode
                    ? AppColors.dark.colors.transparent
                    : AppColors.light.colors.transparent,
                  statusBarStyle: 'light',
                }}>
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="MainContainer" component={BottomTabNav} />
                {/*<Stack.Screen name="MainContainer" component={DrawerNav} />*/}
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="AddressList" component={AddressList} />
                <Stack.Screen name="Order" component={Order} />
                <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
                <Stack.Screen name="TrackOrder" component={TrackOrder} />
                <Stack.Screen name="OrderDetails" component={OrderDetails} />
                <Stack.Screen name="Carts" component={Cart} />
                <Stack.Screen name="Payment" component={Payment} />
                <Stack.Screen name="StripePayment" component={StripePayment} />
                <Stack.Screen
                  name="NotificationDetails"
                  component={NotificationDetails}
                />
                <Stack.Screen name="PaymentItem" component={PaymentItem} />
                <Stack.Screen
                  name="ConfirmPayment"
                  component={ConfirmPayment}
                />
                <Stack.Screen name="ERecipt" component={ERecipt} />
                <Stack.Screen name="SignupNew" component={SignupNew} />
                <Stack.Screen name="WishList" component={WishList} />
                <Stack.Screen name="HelpCenter" component={HelpCenter} />
                <Stack.Screen
                  name="ChooseShipping"
                  component={ChooseShipping}
                />
                <Stack.Screen name="PromoCode" component={PromoCode} />

                {/* <Stack.Screen name="SignupNew" component={SignupNew} /> */}

                <Stack.Screen
                  name="ShippingAddress"
                  component={ShippingAddress}
                />

                <Stack.Screen name="chat" component={chat} />

                <Stack.Screen name="HomeSwiper" component={HomeSwiper} />
                <Stack.Screen name="AllCategories" component={AllCategories} />
                <Stack.Screen name="CategoryHome" component={CategoryHome} />
                <Stack.Screen name="TabHomecat" component={TabHomecat} />
                <Stack.Screen name="Checkout" component={Checkout} />
                <Stack.Screen name="TrackList" component={TrackList} />
                <Stack.Screen name="Wallet" component={Wallet} />
                <Stack.Screen name="WalletList" component={WalletList} />
                <Stack.Screen name="Address" component={Address} />
                <Stack.Screen name="AddNewAddress" component={AddNewAddress} />

                <Stack.Screen name="InviteFriends" component={InviteFriends} />

                <Stack.Screen name="Notification" component={Notification} />
                <Stack.Screen name="Transaction" component={Transaction} />
                <Stack.Screen name="About" component={About} />
                <Stack.Screen name="Contact" component={Contact} />
                <Stack.Screen name="FAQ" component={FAQ} />
                <Stack.Screen
                  name="TermsCondition"
                  component={TermsCondition}
                />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="CategoryData" component={CategoryData} />
                <Stack.Screen
                  name="CategoryDataList"
                  component={CategoryDataList}
                />
                <Stack.Screen
                  name="ForgotPageNext"
                  component={ForgotPageNext}
                />
                <Stack.Screen
                  name="PasswordConform"
                  component={PasswordConform}
                />
                <Stack.Screen name="AddNewCard" component={AddNewCard} />

                <Stack.Screen
                  name="AddressAddUpdate"
                  component={AddressAddUpdate}
                />
                <Stack.Screen name="FlashSale" component={FlashSale} />
                <Stack.Screen name="FlashDealSale" component={FlashDealSale} />
                <Stack.Screen name="Review" component={Review} />
                <Stack.Screen name="Offers" component={Offers} />
                <Stack.Screen name="Currency" component={Currency} />
                <Stack.Screen name="Language" component={Language} />
                <Stack.Screen name="Theme" component={Theme} />
                <Stack.Screen name="RTL" component={RTL} />
                <Stack.Screen name="Refund" component={Refund} />
                <Stack.Screen name="RefundDetails" component={RefundDetails} />
                <Stack.Screen
                  name="ReturnOrderDetails"
                  component={ReturnOrderDetails}
                />
                <Stack.Screen name="ReturnOrder" component={ReturnOrder} />
                <Stack.Screen name="PayPalPayment" component={PayPalPayment} />
              </Stack.Navigator>
            </NavigationContainer>
            {/*<SnackbarMsg />*/}
            <VegUrbanProgressBar />
          </Suspense>
        </themeContext.Provider>
      </Provider>
    </StripeProvider>
  );
};

export default App;
