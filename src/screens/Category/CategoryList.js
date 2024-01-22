import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useContext} from 'react';
import {COLORS} from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';

const CategoryItem = ({item}) => {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      // activeOpacity={0.8}
      style={[
        styles.wrapper,
        {
          backgroundColor: theme?.colors?.bg_color,

          // backgroundColor: theme.colors.bg_color_onBoard,
        },
      ]}
      onPress={() => {
        navigation.navigate('ProductList', {item});
      }}>
      {/* <Text
        style={[
          styles.text,
          {
            backgroundColor: theme.colors.cat_head,
            color: theme.colors.textColor,
          },
        ]}
        numberOfLines={1}>
        {item?.name}
      </Text> */}
      <View
        style={{
          // backgroundColor: theme.colors.colorPrimary,
          // backgroundColor: '#e7e7e7',
          backgroundColor: theme?.colors?.bg_color,
          // height: 80,
          // width: 80,
          borderRadius: 100,
          // borderRadius:100,
          // elevation:2
        }}>
        <Image
          source={{
            uri: item?.image,
          }}
          style={styles.imageStyle}
        />
      </View>
      <Text
        style={[
          styles.text,
          {
            // backgroundColor: theme.colors.colorPrimary,
            color: theme.colors.textColor,

            // color: COLORS?.black,
            // fontWeight:'bold'
            fontFamily: FONTS.bold,
          },
        ]}
        numberOfLines={1}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(CategoryItem);

const styles = StyleSheet.create({
  imageStyle: {
    // height: 80,
    // width: SIZES.width / 5,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    flex: 1,
    // width:'100%',
    resizeMode: 'stretch',
    marginVertical: 10,
    marginHorizontal: 10,
    height: 60,
    width: 60,
    borderRadius: 100,
    color: COLORS.gray,
  },
  commonToolbarBG: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: COLORS.white,
    minHeight: 56,
    elevation: 10,
    borderRadius: 10,
  },
  wrapper: {
    marginHorizontal: 8,

    // paddingHorizontal: 10,
    // // width:'60%',
    // // width: SIZES.width / 9,
    // // // height: 60,
    // // // // flex: 1,
    // marginStart: 3,
    // // marginEnd: 5,
    // backgroundColor: COLORS.bg_color,
    // elevation: 6,
    // marginBottom: 10,
    borderRadius: 100,
  },
  text: {
    maxHeight: 35,
    minHeight: 35,
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    // fontFamily: 'OpenSans-Bold',
    color: COLORS.black,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    // backgroundColor: COLORS.search_bg_grey,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    fontSize: 14,
    letterSpacing: 0.5,
    // fontWeight:'bold',
    // textTransform: 'uppercase',
    alignItems: 'center',
    marginTop: 5,
  },
});
