import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {memo, useContext} from 'react';
import {COLORS} from '../../constants/Colors';
import themeContext from '../../constants/themeContext';

const DateItem = ({item, onDateClick}) => {
  const theme = useContext(themeContext);
  return (
    <TouchableOpacity
      onPress={onDateClick}
      activeOpacity={0.9}
      style={[
        styles.wrapper,
        {
          backgroundColor: item?.selected
            ? theme?.colors?.colorPrimary
            : theme?.colors?.bg_color,
        },
      ]}>
      <Text
        style={[
          styles.dayMonText,
          {
            color: item?.selected ? COLORS?.white : theme?.colors?.textColor,
          },
        ]}>
        {item?.dayName}
      </Text>
      <Text
        style={[
          styles.dateText,
          {
            color: item?.selected ? COLORS.white : theme?.colors?.textColor,
          },
        ]}>
        {item?.date}
      </Text>
      <Text
        style={[
          styles.dayMonText,
          {
            color: item?.selected ? COLORS.white : theme?.colors?.textColor,
          },
        ]}>
        {item?.monthName}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(DateItem);

const styles = StyleSheet.create({
  imageStyle: {
    // height: 120,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
    resizeMode: 'center',
  },
  wrapper: {
    backgroundColor: COLORS.white,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 3,
    marginHorizontal: 5,
    width: 65,
    height: 80,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
  dayMonText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    flexWrap: 'wrap',
  },
  dateText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 17,
    flexWrap: 'wrap',
    marginVertical: 2,
  },
});
