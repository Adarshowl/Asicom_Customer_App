import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import {SIZES, STRING} from '../../constants';
import {FONTS} from '../../constants/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useContext} from 'react';
import {COLORS} from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import GlobalStyle from '../../styles/GlobalStyle';
import {IMAGE_BASE_URL} from '../../network/ApiEndPoints';
// import {getDateDiff} from '../../utils/Utility';

const FlashDealProductItem = ({item, index, navigation}) => {
  const theme = useContext(themeContext);
  // let counterTime = 100;
  // const counterTime = getDateDiff(item?.flash_enddate);

  const fa =
    ((parseInt(item?.amount) * parseInt(item?.flash_offer_percentage)) / 100) *
    1;

  return (
    <View style={[styles.Wrapper, {}]}>
      <TouchableOpacity
        style={[styles.itemWrapper, {}]}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('ProductDetail', {
            item,
            isFavorite: !item.fav,
            endDate: item?.enddate,
          });
        }}>
        <ImageBackground
          style={[
            styles.itemImage,
            {
              backgroundColor: theme?.colors?.colorimageback,
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <VegUrbanImageLoader
            source={IMAGE_BASE_URL + item?.thumbnail_image}
            styles={{
              // flexGrow: 1,
              width: SIZES.width / 2.4,
              height: 160,
              borderRadius: 15,
            }}
          />
        </ImageBackground>
        {/*{index % 2 !== 0 ? (*/}
        {/*<View*/}
        {/*  style={{*/}
        {/*    position: 'absolute',*/}
        {/*    bottom: 10,*/}
        {/*    left: 8,*/}
        {/*  }}>*/}
        {/*  <CountDown*/}
        {/*    digitStyle={{*/}
        {/*      // backgroundColor: theme?.colors?.colorPrimary,*/}
        {/*      padding: 1,*/}
        {/*    }}*/}
        {/*    until={counterTime}*/}
        {/*    // timeLabels={false}*/}
        {/*    timeToShow={['D', 'H', 'M', 'S']}*/}
        {/*    // timeToShow={['H', 'M', 'S']}*/}
        {/*    size={9}*/}
        {/*    showSeparator={true}*/}
        {/*    separatorStyle={{*/}
        {/*      // color: theme?.colors?.text,*/}
        {/*      color: '#884D31',*/}

        {/*      marginBottom: 2,*/}
        {/*    }}*/}
        {/*    digitTxtStyle={{*/}
        {/*      color: '#884D31',*/}
        {/*      fontFamily: FONTS.medium,*/}
        {/*    }}*/}
        {/*    timeLabelStyle={{*/}
        {/*      color: theme?.colors?.text,*/}

        {/*      fontSize: 0,*/}
        {/*      backgroundColor: theme?.colors?.colorPrimary,*/}
        {/*      // paddingHorizontal: 2,*/}
        {/*      borderRadius: 2,*/}
        {/*      marginStart: 2,*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</View>*/}
        {/*) : null}*/}
      </TouchableOpacity>
      <Text
        style={[
          styles.itemName,
          {
            color: theme.colors.textColor,
            marginTop: 10,
            fontFamily: FONTS?.semi_old,
          },
        ]}
        numberOfLines={1}>
        {item?.product_id?.product_name || item?.product_name}
      </Text>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
        }}
        // style={GlobalStyle.flexRowAlignCenter}
      >
        <AntDesign name={'star'} size={20} color={theme?.colors?.textColor} />
        <Text
          style={[
            styles.itemPrice,
            {
              color: theme.colors.textColor,
              marginLeft: 5,
              alignItems: 'center',
              // marginBottom: 5
            },
          ]}>
          0.0
        </Text>
        <View
          style={{
            paddingVertical: 6,
            borderWidth: 0.8,
            borderColor: theme?.colors?.white,
            marginStart: 7,
            marginEnd: 10,
          }}
        />
        <View
          style={{
            backgroundColor: theme?.colors?.colorimageback,
            paddingHorizontal: 15,
            borderRadius: 5,
            padding: 5,
            marginTop: 5,
          }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: FONTS?.medium,
              color: theme?.colors?.textColor,
            }}>
            {item?.product_id?.sold || item?.sold} sold
          </Text>
        </View>
      </View>
      <View
        style={[
          GlobalStyle.flexRowAlignCenter,
          {
            marginTop: 5,
          },
        ]}>
        <Text style={[styles.itemPrice, {color: theme.colors.white}]}>
          {STRING.APP_CURRENCY}
          {parseInt(parseInt(item?.amount) * parseInt(1) - fa)}

          {/*{item?.product_id?.amount || item?.amount}*/}
        </Text>
        <View
          style={{
            paddingEnd: 8,
          }}
        />
        <Text
          style={[
            styles.itemOfferPrice,
            {
              color: theme.colors.white,
              textDecorationLine: 'line-through',
            },
          ]}>
          {STRING.APP_CURRENCY}
          {item?.product_id?.amount || item?.amount}
          {/*{parseInt(item?.amount) * parseInt(1) - fa}*/}
        </Text>
        <View
          style={{
            paddingEnd: 8,
          }}
        />
        <Text style={[styles.itemOfferPrice, {color: theme.colors.white}]}>
          {/*{STRING.APP_CURRENCY}*/}
          {item?.product_id?.flash_offer_percentage ||
            item?.flash_offer_percentage}
          {'%'}
          off
        </Text>
      </View>
      {/*{counterTime > 0 ? (*/}
      {/*  <View*/}
      {/*    style={{*/}
      {/*      position: 'absolute',*/}
      {/*      top: 12,*/}
      {/*      right: 15,*/}
      {/*    }}>*/}
      {/*    <CountDown*/}
      {/*      digitStyle={{*/}
      {/*        // backgroundColor: theme?.colors?.colorPrimary,*/}
      {/*        padding: 1,*/}
      {/*      }}*/}
      {/*      until={counterTime}*/}
      {/*      timeLabels={false}*/}
      {/*      timeToShow={['D', 'H', 'M', 'S']}*/}
      {/*      size={9}*/}
      {/*      showSeparator={true}*/}
      {/*      separatorStyle={{*/}
      {/*        // color: theme?.colors?.text,*/}
      {/*        color: '#DAA88B',*/}

      {/*        marginBottom: 2,*/}
      {/*      }}*/}
      {/*      digitTxtStyle={{*/}
      {/*        // color: theme?.colors?.text,*/}
      {/*        color: '#DAA88B',*/}

      {/*        fontFamily: FONTS.medium,*/}
      {/*      }}*/}
      {/*      timeLabelStyle={{*/}
      {/*        color: theme?.colors?.text,*/}

      {/*        fontSize: 0,*/}
      {/*        backgroundColor: theme?.colors?.colorPrimary,*/}
      {/*        // paddingHorizontal: 2,*/}
      {/*        borderRadius: 2,*/}
      {/*        marginStart: 2,*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </View>*/}
      {/*) : null}*/}
    </View>
  );
};
const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    borderRadius: 5,
  },
  Wrapper: {
    marginTop: 10,
    flexGrow: 1,
    marginVertical: 2,
    maxWidth: SIZES.width / 2 - 10,
    paddingBottom: 5,
    padding: 5,
    borderRadius: 10,
  },
  itemImage: {
    width: '100%',
    height: 170,
    borderRadius: 20,
    // resizeMode: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
    // marginBottom: 10
  },
  itemName: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    color: COLORS.black,
    marginTop: 2,
    // alignItems:'center'
    // textAlign: 'center'
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: FONTS?.medium,

    // color: COLORS.grey,
    // textAlign: 'center',
    // marginTop: 5,
  },
  itemOfferPrice: {
    fontSize: 13,
    fontFamily: FONTS?.regular,

    color: COLORS.light_gray,
    // textAlign: 'center',
    // marginTop: 5,
  },
  itemOriPrice: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.gray,
    marginStart: 5,
  },
  offerText: {
    // fontFamily: 'OpenSans-SemiBold',
    //   fontSize: 12,
    //   color: COLORS.bitter_sweet,
    //   backgroundColor: COLORS.pale_pink,
    //   position: 'absolute',
    //   left: 0,
    //   top: 0,
    //   padding: 5,
    //   paddingHorizontal: 10,
    //   borderTopRightRadius: 10, // Always apply this radius
    //   borderBottomRightRadius: 10, // Always apply this radius
    //   borderTopLeftRadius: isRTL ? 0 : 10, // Apply only in LTR mode
    //   borderBottomLeftRadius: isRTL ? 0 : 10,
  },
});
export default FlashDealProductItem;
