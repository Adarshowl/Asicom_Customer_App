import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useContext} from 'react';
import {COLORS} from '../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';

const PaymentItem = ({item, show, onItemClick}) => {
  const theme = useContext(themeContext);
  return (
    <TouchableOpacity
      style={[styles.wrapper, {backgroundColor: theme?.colors?.bg}]}
      onPress={onItemClick}>
      <View style={styles.innerWrapper}>
        <VegUrbanImageLoader source={item?.image} styles={styles.image} />
        <Text
          style={[
            styles.textName,
            {
              color: theme?.colors?.white,
            },
          ]}>
          {item?.payment_method_name || item?.payment_name}
          {/*{item?.payment_name}*/}
        </Text>
        <MaterialCommunityIcons
          name={item?.selected ? 'circle-slice-8' : 'circle-outline'}
          size={22}
          color={theme?.colors?.colorPrimary}
        />
      </View>
    </TouchableOpacity>
  );
};

export default memo(PaymentItem);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.bg_gray,
    marginHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
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
  },
  textName: {
    fontFamily: FONTS?.medium,
    fontSize: 18,
    color: COLORS.black,
    flex: 1,
    marginStart: 10,
  },
  image: {
    height: 40,
    width: 40,
    resizeMode: 'center',
  },
  divLine: {
    backgroundColor: COLORS.gray,
    height: 0.5,
    width: '100%',
    marginTop: 15,
  },
});
