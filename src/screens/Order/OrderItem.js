import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {STRING} from '../../constants';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';

const OrderItem = ({item}) => {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('OrderDetails');
      }}
      activeOpacity={0.9}
      style={[styles.wrapper, {backgroundColor: theme.colors.bg_color}]}>
      <Image
        source={{
          uri: item?.image,
        }}
        style={styles.image}
      />
      <View style={styles.innerWrapper}>
        <Text
          style={[
            GlobalStyle.bothSideMediumText,
            {
              fontSize: 14,
              color: theme.colors.textColor,
              fontFamily: FONTS.semi_old,
            },
          ]}
          numberOfLines={2}>
          {item?.name}
        </Text>
        <Text
          style={[
            styles.qtyText,
            {
              color: theme.colors.textColor,
            },
          ]}>
          Qty: {item?.qty}
        </Text>
        <Text
          style={[
            styles.priceText,
            {
              color: theme.colors.textColor,
            },
          ]}>
          {STRING.APP_CURRENCY} {item?.price}.00
        </Text>
        <View style={GlobalStyle.flexRowAlignCenter}>
          <View
            style={{
              alignSelf: 'flex-start',
            }}>
            <Text
              style={[
                styles.viaText,
                {
                  color: theme.colors.colorPrimary,
                },
              ]}>
              {STRING.via}
              {item?.via}
              {/*{STRING.cod}*/}
            </Text>
            <Text
              style={[
                styles.statusText,
                {
                  color: theme.colors.textColor,
                },
              ]}>
              {STRING.received}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
            }}
          />
          <VegUrbanCommonBtn
            height={32}
            width={'40%'}
            borderRadius={5}
            textSize={14}
            textColor={theme?.colors?.text}
            text={STRING.cancel_item}
            backgroundColor={theme.colors.colorPrimary}
            onPress={() => {}}
            textStyle={{
              fontFamily: 'OpenSans-Medium',
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
// export default memo(TrackOrderItem);
export default OrderItem;
const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    borderRadius: 3,
    backgroundColor: COLORS.white,
    marginVertical: 4,
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  statusText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    marginEnd: 2,
    color: COLORS.grey,
  },
  image: {
    height: 80,
    width: 80,
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  innerWrapper: {
    marginStart: 10,
    flex: 1,
    alignItems: 'flex-start',
  },
  qtyText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    marginEnd: 2,
    color: COLORS.black,
  },
  priceText: {
    // fontFamily: 'OpenSans-Medium',
    fontFamily: 'OpenSans-Regular',

    fontSize: 14,
    marginEnd: 2,
    marginVertical: 2,
    color: COLORS.black,
  },
  viaText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 13,
    marginEnd: 2,
    color: COLORS.colorAccent,
  },
});
