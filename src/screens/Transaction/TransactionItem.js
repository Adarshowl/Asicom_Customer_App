import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useContext} from 'react';
import {COLORS} from '../../constants/Colors';
import {STRING} from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';

const TransactionItem = ({item, show}) => {
  const theme = useContext(themeContext);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.wrapper,
        {
          backgroundColor: theme.colors.wrapper,
        },
      ]}
      onPress={() => {}}>
      <Text
        style={[
          styles.idText,
          {
            color: theme.colors.textColor,
          },
        ]}>
        ID : {item?.id}
      </Text>
      <View style={styles.divLine} />
      <View
        style={[
          GlobalStyle.flexRowAlignCenter,
          GlobalStyle.flexRowJustifyBtwn,
          {
            marginTop: 5,
          },
        ]}>
        <Text
          style={[
            styles.payModeText,
            {
              color: theme.colors.colorPrimary,
            },
          ]}>
          Via: {item?.mode}
        </Text>
        <Text
          style={[
            styles.payStatusText,
            {
              backgroundColor:
                item?.status == 'Pending' ? COLORS.red : COLORS.light_green,
            },
          ]}>
          {item?.status}
        </Text>
      </View>

      <View
        style={[
          GlobalStyle.flexRowJustifyBtwn,
          {
            marginTop: 5,
          },
        ]}>
        <View>
          <Text
            style={[
              GlobalStyle.bothSideText,
              {
                color: theme?.colors?.textColor,
              },
            ]}>
            {STRING.transaction_date_and_time}
          </Text>
          <Text
            style={[
              GlobalStyle.bothSideText,
              {
                color: theme?.colors?.textColor,
                marginTop:5
              },
            ]}>
            {item?.time}
          </Text>
        </View>
        <Text
          style={[
            styles.amtText,
            {
              color: theme.colors.colorPrimary,
            },
          ]}>
          {STRING.amount_} {STRING.APP_CURRENCY}
          {item?.amount}
        </Text>
      </View>

      <Text 
      // style={styles.msgHeadText}
      style={[
        styles.msgHeadText,
        {
          color: theme.colors.textColor,
        },
      ]}
      >{STRING.message}</Text>
      <Text style={[styles.msgText,{color:theme?.colors?.textColor}]}>{item?.message}</Text>
    </TouchableOpacity>
  );
};

export default memo(TransactionItem);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginVertical:6,
    borderRadius:10,
    marginHorizontal:10
  },
  text: {
    maxHeight: 35,
    minHeight: 35,
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'OpenSans-Bold',
    color: COLORS.black,
    backgroundColor: COLORS.search_bg_grey,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  idText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: COLORS.black,
    fontWeight:'bold'
  },
  divLine: {
    height: 1,
    backgroundColor: COLORS.light_gray,
    marginVertical: 5,
  },
  payModeText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.colorPrimary,
  },
  payStatusText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.white,
    backgroundColor: COLORS.light_green,
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 3,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  amtText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.colorPrimary,
  },
  msgHeadText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    marginTop: 5,
    color: COLORS.black,
  },
  msgText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: COLORS.black,
    marginTop: 2,
  },
});
