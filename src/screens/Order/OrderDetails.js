import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import {STRING} from '../../constants';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import OrderItem from './OrderItem';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';

const OrderDetails = ({navigation}) => {
  const theme = useContext(themeContext);

  const [cartData, setCartData] = useState([
    {
      name: 'fresh veg',
      image:
        'https://media.istockphoto.com/id/467328250/photo/mango.jpg?s=612x612&w=0&k=20&c=cYSHeExkHZVYQM6xkWehclgYDqkmB7o4E494xz5GbXs=',

      price: '10',
      old_price: '5',
      ori_price: '5',
      qty: '1 kg',
      count: '2',
      via: 'COD',
    },
    {
      name: 'fresh fruit',
      image:
        'https://t4.ftcdn.net/jpg/02/71/66/91/360_F_271669174_2dHs4FO3SV83lQ4MjswEBa4LQTGjMO4E.jpg',

      price: '20',
      ori_price: '15',
      old_price: '10',
      qty: '2 kg',
      count: '2',
      via: 'ONLINE',
    },

    {
      name: 'fresh vegied',
      image:
        'https://media.istockphoto.com/id/171575811/photo/guava.jpg?s=612x612&w=0&k=20&c=cjVDpisFrT8JlqFbSEImkfsXgQbtrNCdSTILGAzIj2Q=',

      price: '15',
      ori_price: '5',
      qty: '1 kg',
      old_price: '15',
      via: 'Cash',
      count: '1',
    },
  ]);

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme.colors.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
          },
        ]}>
        <ToolBarIcon
          title={Ionicons}
          iconName={'chevron-back'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            marginEnd: 10,
            backgroundColor: theme.colors.toolbar_icon_bg,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar
          title={STRING.order_track_detail}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
          }}
        />
        <ToolBarIcon
          title={Ionicons}
          iconName={'search'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            backgroundColor: theme.colors.toolbar_icon_bg,
            marginEnd: 0,
          }}
          onPress={() => {
            navigation.navigate('Search');
          }}
        />
        <ToolBarIcon
          title={Ionicons}
          iconName={'cart'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            backgroundColor: theme.colors.toolbar_icon_bg,
            marginEnd: 10,
          }}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            paddingVertical: 5,
            backgroundColor: theme.colors.bg_color,
            marginHorizontal: 10,
            marginTop: 5,
            borderRadius: 8,
            marginVertical: 4,
          }}>
          <Text
            style={[
              styles.orderOtp,
              {
                color: theme.colors.textColor,
                marginTop: 5,
                fontFamily: FONTS.semi_old,
              },
            ]}>
            {STRING.order_otp} : 123564
          </Text>
          <Text
            style={[
              styles.orderOtp,
              {
                color: theme.colors.white,
                marginTop: 3,
              },
            ]}>
            {STRING.ordered_id} 123
          </Text>
          <Text
            style={[
              styles.orderOtp,
              {
                color: theme.colors.white,
                marginTop: 3,
              },
            ]}>
            {STRING.order_date} 26-05-2023 01:37:38 pm
          </Text>
        </View>

        <FlatList
          style={{
            paddingStart: 10,
            paddingEnd: 10,
          }}
          ListHeaderComponent={() => {
            return <View style={{}} />;
          }}
          ListHeaderComponentStyle={{
            paddingTop: 0,
          }}
          ListFooterComponent={() => {
            return <View style={{}} />;
          }}
          ListFooterComponentStyle={{
            paddingBottom: 0,
          }}
          showsVerticalScrollIndicator={false}
          data={cartData}
          renderItem={({item, index}) => <OrderItem item={item} />}
        />
        <View
          style={{
            padding: 10,
            // backgroundColor:'#F2FCF0',
            marginHorizontal: 10,
            marginVertical: 15,
            borderRadius: 15,
            backgroundColor: theme.colors.bg_color,
          }}>
          {/* <View
            style={{
              padding: 2,
              backgroundColor: COLORS.light_gray,
              marginBottom: 15,
            }}
          /> */}
          <View
            style={{
              paddingHorizontal: 5,
            }}>
            <Text
              style={[
                GlobalStyle.bothSideMediumText,
                ,
                {
                  color: theme.colors.white,
                  marginVertical: 5,
                  fontWeight: '800',
                },
              ]}>
              {STRING.price_details}
            </Text>
            <View style={GlobalStyle.flexRowJustifyBtwn}>
              <Text
                style={[
                  GlobalStyle.bothSideText,
                  {
                    color: theme.colors.white,
                    marginTop: 3,
                  },
                ]}>
                {STRING.items}
              </Text>
              <Text
                style={[
                  GlobalStyle.bothSideText,
                  {
                    color: theme.colors.white,
                    marginTop: 3,
                  },
                ]}>
                {STRING.APP_CURRENCY}10.00
              </Text>
            </View>

            <View style={GlobalStyle.flexRowJustifyBtwn}>
              <Text
                style={[
                  GlobalStyle.bothSideText,
                  {
                    color: theme.colors.white,
                    marginTop: 3,
                  },
                ]}>
                {STRING.delivery_charge1}
              </Text>
              <Text
                style={[
                  GlobalStyle.bothSideText,
                  {
                    color: theme.colors.white,
                    marginTop: 3,
                  },
                ]}>
                + {STRING.APP_CURRENCY}20.00
              </Text>
            </View>
            <View style={GlobalStyle.flexRowJustifyBtwn}>
              <Text
                style={[
                  GlobalStyle.bothSideText,
                  {
                    color: theme.colors.white,
                    marginTop: 3,
                  },
                ]}>
                {STRING.discount}(0%) :
              </Text>
              <Text
                style={[
                  GlobalStyle.bothSideText,
                  {
                    color: theme.colors.white,
                    marginTop: 3,
                  },
                ]}>
                - {STRING.APP_CURRENCY}0.00
              </Text>
            </View>

            <View style={GlobalStyle.flexRowJustifyBtwn}>
              <Text
                style={[
                  GlobalStyle.bothSideText,
                  {
                    color: theme.colors.white,
                    marginTop: 3,
                  },
                ]}>
                {STRING.total}
              </Text>
              <Text
                style={[
                  GlobalStyle.bothSideText,
                  {
                    color: theme.colors.white,
                    marginTop: 3,
                  },
                ]}>
                {STRING.APP_CURRENCY}100.00
              </Text>
            </View>

            <View style={GlobalStyle.flexRowJustifyBtwn}>
              <Text
                style={[
                  GlobalStyle.bothSideText,
                  {
                    color: theme.colors.white,
                    marginTop: 3,
                  },
                ]}>
                {STRING.promo_applied}
              </Text>
              <Text
                style={[
                  GlobalStyle.bothSideText,
                  {
                    color: theme.colors.white,
                    marginTop: 3,
                  },
                ]}>
                - {STRING.APP_CURRENCY}0.00
              </Text>
            </View>
            <View style={GlobalStyle.flexRowJustifyBtwn}>
              <Text
                style={[
                  GlobalStyle.bothSideText,
                  {
                    color: theme.colors.white,
                    marginTop: 3,
                  },
                ]}>
                {STRING.wallet_balance1}
              </Text>
              <Text
                style={[
                  GlobalStyle.bothSideText,
                  {
                    color: theme.colors.white,
                    marginTop: 3,
                  },
                ]}>
                - {STRING.APP_CURRENCY}0.00
              </Text>
            </View>

            <View
              style={[
                GlobalStyle.flexRowJustifyBtwn,
                {
                  marginTop: 3,
                },
              ]}>
              <Text
                style={[
                  GlobalStyle.bothSideText,
                  {
                    color: theme.colors.white,
                    marginTop: 3,
                  },
                ]}>
                {STRING.final_total}
              </Text>
              <Text
                style={[
                  GlobalStyle.bothSideMediumText,
                  {
                    color: theme.colors.colorPrimary,
                    marginTop: 3,
                  },
                ]}>
                {STRING.APP_CURRENCY}120.00
              </Text>
            </View>

            <View
              style={{
                padding: 1,
                backgroundColor: COLORS.gray,
                marginVertical: 15,
              }}
            />
            <Text
              style={[
                GlobalStyle.bothSideMediumText,
                {
                  color: theme.colors.white,
                  marginBottom: 5,
                  fontWeight: '800',
                },
              ]}>
              {STRING.other_details}
            </Text>

            <Text
              style={[
                GlobalStyle.bothSideText,
                {
                  color: theme.colors.white,
                  marginTop: 3,
                },
              ]}>
              {STRING.name_1} test post
            </Text>
            <Text
              style={[
                GlobalStyle.bothSideText,
                {
                  color: theme.colors.white,
                  marginTop: 3,
                },
              ]}>
              {STRING.mobile_no_1} 12656656565
            </Text>
            <Text
              style={[
                GlobalStyle.bothSideText,
                {
                  color: theme.colors.white,
                },
              ]}>
              {STRING.address_1} test address
            </Text>
            <Text
              style={[
                GlobalStyle.bothSideText,
                {
                  color: theme.colors.white,
                  marginTop: 3,
                },
              ]}>
              {STRING.pincode_1} 450021
            </Text>
            <View
              style={{
                padding: 1,
                backgroundColor: COLORS.gray,
                marginVertical: 15,
              }}
            />
            <Text
              style={[
                GlobalStyle.bothSideMediumText,
                {
                  marginBottom: 5,
                  color: theme.colors.white,
                  marginTop: 3,
                  fontWeight: '800',
                },
              ]}>
              {STRING.order_status}
            </Text>
            <View style={styles.orderStatWrapper}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[
                    styles.orderText,
                    {
                      color: theme.colors.white,
                      marginBottom: 3,
                    },
                  ]}>
                  {STRING.order_received}
                </Text>
                <MaterialCommunityIcons
                  name={'circle-slice-8'}
                  size={22}
                  color={theme.colors.colorPrimary}
                  style={{
                    marginVertical: 2,
                  }}
                />
                <Text
                  style={[
                    styles.orderText,
                    {
                      color: theme.colors.white,
                      marginTop: 3,
                    },
                  ]}>
                  26-05-2023{'\n'}01:35:09 pm
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.colorPrimary,
                  height: 2,
                  marginHorizontal: 25,
                }}
              />
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[
                    styles.orderText,
                    {
                      color: theme.colors.white,
                      marginBottom: 3,
                    },
                  ]}>
                  {STRING.order_cancel_}
                </Text>
                <MaterialCommunityIcons
                  name={'circle-slice-8'}
                  size={22}
                  color={theme.colors.colorPrimary}
                  style={{
                    marginVertical: 2,
                  }}
                />
                <Text
                  style={[
                    styles.orderText,
                    {
                      color: theme.colors.white,
                      marginTop: 3,
                    },
                  ]}>
                  26-05-2023{'\n'}01:35:09 pm
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: theme.colors.bg_color_onBoard,
          padding: 10,
          alignItems: 'center',
        }}>
        <VegUrbanCommonBtn
          height={50}
          width={'100%'}
          borderRadius={10}
          textSize={20}
          textColor={theme?.colors?.text}
          text={STRING.cancel_order}
          backgroundColor={theme.colors.colorPrimary}
          onPress={() => {
            navigation.goBack('TrackOrder');
          }}
          textStyle={{
            fontFamily: 'OpenSans-Regular',
            fontWeight: '600',
          }}
        />
        <Text
          style={[
            styles.orderText,
            {
              color: theme.colors.white,
            },
          ]}>
          if order cancelled
        </Text>
        <VegUrbanCommonBtn
          height={50}
          width={'100%'}
          borderRadius={10}
          textSize={20}
          textColor={theme?.colors?.text}
          text={STRING.reorder}
          backgroundColor={theme.colors.bg}
          onPress={() => {
            navigation.navigate('Cart');
          }}
          textStyle={{
            fontFamily: 'OpenSans-Regular',
            fontWeight: '600',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderDetails;
const styles = StyleSheet.create({
  orderOtp: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    paddingHorizontal: 10,
    marginEnd: 2,
    color: COLORS.colorPrimary,
  },
  orderStatWrapper: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 25,
  },
  orderText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.black,
    textAlign: 'center',
    marginVertical: 5,
  },
});
