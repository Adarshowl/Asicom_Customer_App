import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useContext} from 'react';
import {COLORS} from '../../constants/Colors';
import {AirbnbRating} from 'react-native-elements';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';

const ReviewItem = ({item, show}) => {
  const theme = useContext(themeContext);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.wrapper,
        {
          backgroundColor: theme?.colors?.wrapper,
        },
      ]}
      onPress={() => {}}>
      <View style={GlobalStyle.flexRowAlignCenter}>
        <Image
          source={{
            uri: item?.image,
          }}
          style={styles.itemImage}
        />
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={[
              styles.itemName,
              {
                color: theme?.colors?.white,
              },
            ]}>
            {item?.name}
          </Text>
          <Text style={styles.dateTime}>{item?.date}</Text>
        </View>
        <AirbnbRating
          count={5}
          isDisabled={true}
          showRating={false}
          defaultRating={item?.star}
          size={10}
          starContainerStyle={{
            marginStart: 15,
          }}
        />
      </View>
      <View style={styles.divLine} />
      <Text
        style={[
          styles.reviewText,
          {
            color: theme?.colors?.textColor,
          },
        ]}>
        {item?.message}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(ReviewItem);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    padding: 10,
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
  itemImage: {
    height: 40,
    width: 40,
    borderRadius: 5,
    marginEnd: 5,
    marginBottom: 5,
  },
  itemName: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.dark_gray,
  },
  dateTime: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 10,
    color: COLORS.grey,
    marginVertical: 2,
  },
  divLine: {
    height: 2,
    backgroundColor: COLORS.light_gray,
  },
  reviewText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    color: COLORS.txt_color,
    marginTop: 4,
  },
});
