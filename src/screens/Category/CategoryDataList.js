import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useContext} from 'react';
import {COLORS} from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';

const CategoryDataList = ({item}) => {
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.wrapper,
        {
          // backgroundColor: theme?.colors?.bg_color,

          backgroundColor: theme.colors.bg_color_onBoard,
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
        activeOpacity={0.8}
        style={{
          // backgroundColor: theme.colors.colorPrimary,
          // backgroundColor: '#e7e7e7',
          backgroundColor: theme?.colors?.bg_color,
          // height: 80,
          width: '100%',
          borderRadius: 15,
          // elevation:5,

          flexDirection: 'row',
          // alinItem:'center',
          marginHorizontal: 20,
          // alignItems:'center'
        }}>
        <Image
          source={{
            uri: item?.image,
          }}
          style={styles.imageStyle}
        />
        <View style={{marginLeft: 5}}>
          <Text
            style={[
              styles.text,
              {
                // backgroundColor: theme.colors.colorPrimary,
                // color: theme.colors.text_color,
                color: theme.colors.textColor,

                // color: COLORS?.white,
                fontFamily: FONTS.bold,
                // fontWeight: 'bold'
              },
            ]}
            numberOfLines={1}>
            {item?.name}
          </Text>
          <Text
            style={[
              styles.item,
              {
                // backgroundColor: theme.colors.colorPrimary,
                color: theme.colors.textColor,

                // color: COLORS?.black,
                // fontWeight:'bold'
              },
            ]}
            numberOfLines={1}>
            {item?.qty}
          </Text>

          <Text style={styles.offerText} numberOfLines={1}>
            {item?.old}% off
          </Text>
          <Text
            style={[
              styles.item,
              {
                // backgroundColor: theme.colors.colorPrimary,
                color: theme.colors.textColor,

                // color: COLORS?.black,
                // fontWeight:'bold'
              },
            ]}
            numberOfLines={1}>
            ₹{item?.price}/-
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(CategoryDataList);

const styles = StyleSheet.create({
  imageStyle: {
    // height: 80,
    // width: SIZES.width / 5,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    // flex: 1,
    // width:'100%',
    resizeMode: 'stretch',
    marginVertical: 10,
    marginHorizontal: 10,
    height: 100,
    width: '30%',
    borderRadius: 15,
    color: COLORS.gray,
  },
  commonToolbarBG: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: COLORS.white,
    minHeight: 56,
    elevation: 10,
    // borderRadius: 10
  },
  offerText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 11,
    color: COLORS.bitter_sweet,
    backgroundColor: COLORS.pale_pink,
    // position: 'absolute',
    // left: 0,
    top: 0,
    padding: 4,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    // marginLeft:30
    marginTop: 5,
    marginBottom: 5,
  },
  wrapper: {
    marginHorizontal: 20,
    marginVertical: 5,
    // paddingHorizontal: 10,
    // // width:'60%',
    // // width: SIZES.width / 9,
    // // // height: 60,
    // // // // flex: 1,
    // marginStart: 3,
    // marginEnd: 5,
    // backgroundColor: COLORS.bg_color,
    borderRadius: 15,

    // elevation: 4,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    // maxHeight: 35,
    // minHeight: 35,
    // width: '100%',
    // textAlign: 'center',
    // textAlignVertical: 'center',
    // fontFamily: 'OpenSans-Bold',
    color: COLORS.black,
    fontFamily: 'OpenSans-Regular',
    // textAlign: 'center',
    // // backgroundColor: COLORS.search_bg_grey,
    // // borderTopLeftRadius: 10,
    // // borderTopRightRadius: 10,
    fontSize: 16,
    letterSpacing: 0.5,
    // fontWeight:'bold',
    // // textTransform: 'uppercase',
    // alignItems: 'center',
    marginTop: 12,
  },
  item: {
    color: COLORS.black,
    fontFamily: 'OpenSans-Regular',
    // textAlign: 'center',
    // // backgroundColor: COLORS.search_bg_grey,
    // // borderTopLeftRadius: 10,
    // // borderTopRightRadius: 10,
    fontSize: 14,
    letterSpacing: 0.5,
    // fontWeight:'bold',
    // // textTransform: 'uppercase',
    // alignItems: 'center',
    // marginTop: 12
  },
});
