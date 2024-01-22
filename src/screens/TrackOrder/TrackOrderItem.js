import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';
import {STRING} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';

const TrackOrderItem = ({item}) => {
  const navigation = useNavigation();
  const theme = useContext(themeContext);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('OrderDetails');
      }}
      activeOpacity={0.9}
      style={[
        styles.wrapper,
        {
          backgroundColor: theme.colors.bg_color,
          
        },
      ]}>
      <View 
      style={GlobalStyle.flexRowJustifyBtwn}
      >
        <Text
          style={[
            styles.orderNo,
            {
              color: theme.colors.white,
            },
          ]}>
          {STRING.order_number} {item?.id}
        </Text>
        <Text
          style={[
            styles.orderPrice,
            {
              color: theme.colors.colorPrimary,
            },
          ]}>
          {STRING.APP_CURRENCY}
          {item?.amount}.00
        </Text>
      </View>
      <Text style={[styles.itemCount,{color:theme?.colors?.textColor}]}>{item?.item}</Text>
      <Text style={[styles.itemName,{color:theme?.colors?.textColor}]} numberOfLines={1}>
        {item?.product}
      </Text>
      <View style={[styles.divLine,,{color:theme?.colors?.textColor}]}/>
      <Text style={[styles.deliDate,{color:theme?.colors?.textColor}]} numberOfLines={1}>
        Placed order on {item?.date}
      </Text>
      <View
        style={[
          GlobalStyle.flexRowJustifyBtwn,
          GlobalStyle.flexRowAlignCenter,
          {
            marginTop: 5,
          },
        ]}>
        <Text
          style={[
            styles.statusText,
            {
              color: item?.txt_color,
              backgroundColor: item.bg_color,
            },
          ]}
          numberOfLines={2}>
          {item?.status}
        </Text>
        <View style={[styles.iconWrapper,{
          backgroundColor:theme?.colors?.bg
        }]}>
          <MaterialCommunityIcons
            name={'motorbike'}
            color={theme?.colors?.textColor}
            size={20}
            style={{
              marginHorizontal: 5,
            }}
          />
          <Text style={[styles.doorStepText,{
            color:theme?.colors?.textColor,
            backgroundColor:theme?.colors?.bg
          }]} numberOfLines={2}>
            {STRING.door_step_delivery}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
// export default memo(TrackOrderItem);
export default TrackOrderItem;

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingBottom: 10,
    marginTop: 5,
    marginVertical:5,
    marginEnd:5
    
  },
  orderNo: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    color: COLORS.black,
    marginStart: 2,
  },
  orderPrice: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    marginEnd: 2,
    color: COLORS.colorPrimary,
  },
  itemCount: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: COLORS.black,
    marginStart: 2,
  },
  itemName: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: COLORS.black,
    marginTop: 5,
    marginStart: 2,
  },
  divLine: {
    height: 0.5,
    backgroundColor: COLORS.gray,
    width: '100%',
    marginTop: 5,
  },
  deliDate: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: COLORS.black,
    marginTop: 5,
    marginStart: 2,
  },
  statusText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 13,
    padding: 5,
    borderRadius: 3,
    textAlignVertical: 'center',
    alignSelf: 'flex-start',
  },
  iconWrapper: {
    backgroundColor: COLORS.trans_white,
    borderRadius: 3,
    elevation: 3,
    marginStart: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  doorStepText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 13,
    color: COLORS.grey,
    padding: 5,
    borderRadius: 3,
    textAlignVertical: 'center',
    alignSelf: 'flex-start',
  },
});
