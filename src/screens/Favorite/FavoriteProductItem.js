import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {COLORS} from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GlobalStyle from '../../styles/GlobalStyle';

const FavoriteProductItem = ({item, fav, onFavClick}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.wrapper}
      onPress={() => {
        navigation.navigate('ProductDetail', {item: item});
      }}>
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: item?.image,
          }}
          style={styles.image}
        />
        {/*<Image*/}
        {/*  style={styles.imageType}*/}
        {/*  source={{*/}
        {/*    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ9WDy2HXg7Qd9J7wq_Qbv07kxtkgMl70on7U0V6qdHQ&s',*/}
        {/*  }}*/}
        {/*/>*/}

        <AntDesign
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          name={item?.fav ? 'heart' : 'hearto'}
          color={item?.fav ? COLORS.bitter_sweet : COLORS.grey}
          size={20}
          onPress={onFavClick}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 5,
        }}>
        <Text
          style={[
            styles.productNameText,
            {
              paddingTop: 8,
            },
          ]}
          numberOfLines={2}>
          {item?.name}
        </Text>
        <View
          style={[
            {
              paddingTop: 2,
            },
            GlobalStyle.flexRowAlignCenter,
          ]}>
          <AntDesign style={{}} name={'star'} color={'gold'} size={15} />
          <Text style={styles.priceText}> {item?.rate} </Text>
          <View
            style={{
              height: 10,
              width: 1,
              backgroundColor: COLORS.black,
              marginHorizontal: 3,
            }}
          />
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              fontSize: 13,
              backgroundColor: COLORS.light_gray,
              color: COLORS.black,
              paddingHorizontal: 3,
              paddingVertical: 2,
              borderRadius: 5,
              marginStart: 5,
            }}>
            {' '}
            {item?.sold} sold{' '}
          </Text>
        </View>

        <Text style={styles.weightText} numberOfLines={2}>
          {item?.price}
        </Text>
      </View>
      <View style={GlobalStyle.paddingBottom} />
    </TouchableOpacity>
  );
};

export default memo(FavoriteProductItem);
// export default ProductItem;

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
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 3,
    // alignItems: 'center',
    // justifyContent: 'center',
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
  qtyText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    color: COLORS.black,
    textAlign: 'center',
    flex: 1,
  },
  weightText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 15,
    color: COLORS.black,
    marginTop: 3,
  },
  imageWrapper: {
    height: 150,
    borderRadius: 10,
    width: '100%',
    backgroundColor: COLORS.light_gray,
  },
  image: {
    // height: 128,
    borderRadius: 10,
    // width: '100%',
    flex: 1,
    backgroundColor: COLORS.light_gray,
    resizeMode: 'center',
  },
  originalPrice: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: COLORS.gray,
    marginStart: 5,
    textDecorationColor: COLORS.black,
  },
  priceText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    color: COLORS.black,
  },
  imageType: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    height: 10,
    width: 10,
  },
  offerText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 11,
    color: COLORS.bitter_sweet,
    backgroundColor: COLORS.pale_pink,
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 4,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  productNameText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 16,
    color: COLORS.black,
  },
});
