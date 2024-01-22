import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useContext} from 'react';
import {COLORS} from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';

const FaqItem = ({item, show, onClick}) => {
  const theme = useContext(themeContext);
  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: theme?.colors?.wrapper,
        },
      ]}>
      <TouchableOpacity
        onPress={onClick}
        activeOpacity={1.0}
        style={[
          GlobalStyle.flexRowAlignCenter,
          GlobalStyle.flexRowJustifyBtwn,
        ]}>
        <Text
          style={[
            styles.quesText,
            {
              color: theme?.colors?.white,
            },
          ]}>
          {item?.ques}
        </Text>
        <AntDesign
          name={item?.selected ? 'minus' : 'plus'}
          color={theme?.colors?.white}
          size={15}
          onPress={onClick}
          style={{
            paddingHorizontal: 5,
          }}
        />
        {/*<AntDesign name={'minus'} color={COLORS.black} size={15} />*/}
      </TouchableOpacity>
      {item?.selected ? (
        <Text
          style={[
            styles.answerText,
            {
              color: theme?.colors?.textColor,
            },
          ]}>
          {item?.ans}
        </Text>
      ) : null}
    </View>
  );
};

export default memo(FaqItem);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 5,
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
  answerText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: COLORS.black,
    marginTop: 10,
  },
  quesText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    color: COLORS.black,
    flex: 1,
  },
});
