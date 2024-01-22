import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useContext} from 'react';
import {COLORS} from '../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import themeContext from '../../constants/themeContext';

const TimeItem = ({item, onItemClick}) => {
  const theme = useContext(themeContext);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.wrapper,
        {backgroundColor: theme?.colors?.bg_color_onBoard},
      ]}
      onPress={onItemClick}>
      <View style={styles.innerWrapper}>
        <Text
          style={[
            styles.timeText,
            {
              color: theme?.colors?.white,
            },
          ]}>
          {item?.title}
        </Text>
        <MaterialCommunityIcons
          name={item?.selected ? 'circle-slice-8' : 'circle-outline'}
          size={22}
          color={theme?.colors?.colorPrimary}
        />
      </View>
      <View style={styles.divLine} />
    </TouchableOpacity>
  );
};

export default memo(TimeItem);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    paddingVertical: 5,
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
  innerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  timeText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: COLORS.black,
    flex: 1,
  },
  divLine: {
    backgroundColor: COLORS.gray,
    height: 0.5,
    width: '100%',
    marginTop: 15,
  },
});
