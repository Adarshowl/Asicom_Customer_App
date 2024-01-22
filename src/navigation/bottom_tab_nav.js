import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {lazy, useContext} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {icons, STRING} from '../constants';
import Home from '../screens/Home';
import themeContext from '../constants/themeContext';
import Order from '../screens/Order';
import Profile from '../screens/Profile';
import Wallet from '../screens/Wallet/Index';
import {FONTS} from '../constants/Fonts';
import {useSelector} from 'react-redux';
import {COLORS} from '../constants/Colors';

const Category = lazy(() => import('../screens/Category'));
const Favorite = lazy(() => import('../screens/Favorite'));
const Cart = lazy(() => import('../screens/Cart'));

const Tab = createBottomTabNavigator();
const BottomTabNav = () => {
  const theme = useContext(themeContext);

  const cartDataLength = useSelector(
    state => state?.homeReducer?.cartDataLength,
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          // backgroundColor: 'yellow',
          backgroundColor: theme?.colors.bg_color_onBoard,
          minHeight: 60,
          paddingTop: 15,
          paddingBottom: 18,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          borderTopWidth: 0,
        },
        tabBarItemStyle: {},
      }}
      // initialRouteName="Home"
      style={{}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',

                flexGrow: 1,
              }}>
              {/*<Entypo*/}
              {/*  name="home"*/}
              {/*  size={25}*/}
              {/*  color={*/}
              {/*    focused ? theme?.colors.colorPrimary : theme?.colors.grey*/}
              {/*  }*/}
              {/*/>*/}
              <Image
                source={icons.tab_home}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused
                    ? theme?.colors.colorPrimary
                    : theme?.colors.grey,
                }}
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                    // fontFamily:FONTS?.bold
                  },
                ]}>
                {STRING.home}
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',

                flexGrow: 1,
              }}>
              {/*<MaterialCommunityIcons*/}
              {/*  name="cart"*/}
              {/*  size={25}*/}
              {/*  color={*/}
              {/*    focused ? theme?.colors.colorPrimary : theme?.colors.grey*/}
              {/*  }*/}
              {/*/>*/}
              <Image
                source={icons.tab_cart}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused
                    ? theme?.colors.colorPrimary
                    : theme?.colors.grey,
                }}
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                  },
                ]}>
                {STRING.cart}
              </Text>
              {cartDataLength > 0 ? (
                <Text
                  style={{
                    color: COLORS.white,

                    fontSize: 14,
                    fontFamily: FONTS.semi_old,
                    position: 'absolute',
                    right: -10,
                    backgroundColor: theme.colors.colorPrimary,
                    paddingHorizontal: 2,
                    borderRadius: 25,
                  }}>
                  {' '}
                  {cartDataLength}{' '}
                </Text>
              ) : null}
              {/* {focused ? (
                <Text
                  style={[
                    styles.text,
                    {
                      color: focused
                        ? theme?.colors.colorPrimary
                        : theme?.colors.grey,
                    },
                  ]}>
                  {STRING.cart}
                </Text>
              ) : null} */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',

                flexGrow: 1,
                // backgroundColor: 'red',
              }}>
              <Image
                source={icons.tab_order}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused
                    ? theme?.colors.colorPrimary
                    : theme?.colors.grey,
                }}
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                  },
                ]}>
                Order
              </Text>
              {/* {focused ? (
                <Text
                  style={[
                    styles.text,
                    {
                      color: focused
                        ? theme?.colors.colorPrimary
                        : theme?.colors.grey,
                    },
                  ]}>
                  {STRING.cart}
                </Text>
              ) : null} */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',

                flexGrow: 1,
              }}>
              {/*<Ionicons*/}
              {/*  name={focused ? 'wallet' : 'wallet-outline'}*/}
              {/*  size={20}*/}
              {/*  color={*/}
              {/*    focused ? theme?.colors.colorPrimary : theme?.colors.grey*/}
              {/*  }*/}
              {/*/>*/}
              <Image
                source={icons.tab_wallet}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused
                    ? theme?.colors.colorPrimary
                    : theme?.colors.grey,
                }}
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                    textAlign: 'center',
                  },
                ]}>
                {/*{STRING.wallet}*/}
                {/*{STRING.transaction_history}*/}
                {STRING.transaction_history1}
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',

                flexGrow: 1,
              }}>
              {/*<AntDesign*/}
              {/*  name="user"*/}
              {/*  // name={focused ? 'heart' : 'hearto'}*/}
              {/*  size={20}*/}
              {/*  color={*/}
              {/*    focused ? theme?.colors.colorPrimary : theme?.colors.grey*/}
              {/*  }*/}
              {/*/>*/}

              <Image
                source={icons.tab_profile}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused
                    ? theme?.colors.colorPrimary
                    : theme?.colors.grey,
                }}
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: focused
                      ? theme?.colors.colorPrimary
                      : theme?.colors.textColor,
                  },
                ]}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNav;

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    marginTop: 3,
    fontFamily: FONTS?.regular,
  },
});
