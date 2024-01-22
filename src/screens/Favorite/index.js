import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import {images, SIZES, STRING} from '../../constants';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import themeContext from '../../constants/themeContext';

const Favorite = ({navigation}) => {
  const theme = useContext(themeContext);

  const onFavClick = idx => {
    let a = favData.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        temp.fav = !temp.fav;
      }
      // ShowToastMessage('HI CLIXK' + temp.fav);

      return temp;
    });

    setFavData(a);
  };

  const [favData, setFavData] = useState([
    {
      name: 'test 1',
      image:
        'https://t4.ftcdn.net/jpg/02/71/66/91/360_F_271669174_2dHs4FO3SV83lQ4MjswEBa4LQTGjMO4E.jpg',
      price: '120.00',
      old: '100.00',
      rate: '2',
      qty: '2 kg',
      sold: '1.2k',
      fav: true,
    },
    {
      name: 'test 2',
      image:
        'https://media.istockphoto.com/id/185284489/photo/orange.jpg?s=612x612&w=0&k=20&c=m4EXknC74i2aYWCbjxbzZ6EtRaJkdSJNtekh4m1PspE=',
      price: '130.00',
      old: '80.00',
      qty: '1 kg',
      rate: '1',
      sold: '1.5k',
      fav: true,
    },
    {
      name: 'test 3',
      image:
        'https://media.istockphoto.com/id/171575811/photo/guava.jpg?s=612x612&w=0&k=20&c=cjVDpisFrT8JlqFbSEImkfsXgQbtrNCdSTILGAzIj2Q=',
      price: '50.00',
      old: '700.00',
      rate: '3',
      sold: '3.2k',
      qty: '3 kg',
      fav: true,
    },
    {
      name: 'test 4',
      image:
        'https://media.istockphoto.com/id/467328250/photo/mango.jpg?s=612x612&w=0&k=20&c=cYSHeExkHZVYQM6xkWehclgYDqkmB7o4E494xz5GbXs=',
      price: '1050.00',
      qty: '4 kg',
      old: '500.00',
      rate: '4',
      sold: '11.5k',
      fav: true,
    },
  ]);

  

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.itemWrapper,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
                      // backgroundColor: theme.colors.bg_color,
                  

          },
        ]}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('ProductDetail', {item: item});
        }}>
        {/* <Image
          style={styles.itemImage}
          source={{
            uri: item?.image,
          }}
        />
        <AntDesign
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          name={item?.fav ? 'heart' : 'hearto'}
          color={item?.fav ? COLORS.bitter_sweet : COLORS.grey}
          size={20}
          onPress={() => onFavClick(index)}
        /> */}
         <View style={styles.imageWrapper}>
        <Image
           source={{
            uri: item?.image,
          }}
          style={styles.itemImage}
        />
        

        <AntDesign
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
          }}
          name={item?.fav ? 'heart' : 'hearto'}
          color={item?.fav ? COLORS.bitter_sweet : COLORS.grey}
          size={20}
          onPress={() => onFavClick(index)}
        />
        <Text style={styles.offerText} numberOfLines={1}>
          {item?.old_price}% off
        </Text>
      </View>
        {/* <View
          style={{
            marginHorizontal: 8,
          }}>
          <Text
            style={[
              styles.itemName,
              {
                color: theme.colors.textColor,
                alignSelf: 'flex-start',
              },
            ]}
            numberOfLines={1}>
            {item?.name}
          </Text>
          <View style={GlobalStyle.flexRowAlignCenter}>
            <Text style={[styles.itemPrice, {color: theme.colors.white}]}>
              {STRING.APP_CURRENCY}
              {item?.price}
            </Text>
            <Text
              style={[styles.itemOriPrice, {color: theme.colors.textColor}]}>
              {STRING.APP_CURRENCY}
              {item?.price}
            </Text>
          </View>
        </View> */}
         <View
        style={[
          {
            paddingTop: 5,
          },
          GlobalStyle.flexRowAlignCenter,
        ]}>
        <Text
          style={[
            styles.priceText,
            {
              color: theme.colors.colorPrimary,
            },
          ]}>
          {STRING.APP_CURRENCY} {item?.price}
        </Text>
        {/* <Text
          style={[
            styles.originalPrice,
            {
              color: theme.colors.grey,
            },
          ]}>
          {STRING.APP_CURRENCY} {item?.ori_price}.00
        </Text> */}
      </View>
      <Text
        style={[
          styles.productNameText,
          {
            color: theme.colors.white,
          },
        ]}
        numberOfLines={2}>
        {item?.name}
      </Text>
      <Text
        style={[
          styles.weightText,
          {
            color: theme.colors.white,
            marginBottom:10
          },
        ]}
        numberOfLines={2}>
        {item?.qty}
      </Text>
        <Text
          style={[
            styles.offerText,
            {
              color: theme.colors.pale_pink,
              // backgroundColor: theme.colors.bitter_sweet,
            },
          ]}
          numberOfLines={1}>
          {item?.rate}% off
        </Text>
        {/*<Text*/}
        {/*  style={{*/}
        {/*    fontFamily: 'OpenSans-SemiBold',*/}
        {/*    fontSize: 11,*/}
        {/*    color: COLORS.red,*/}
        {/*    position: 'absolute',*/}
        {/*    left: 0,*/}
        {/*    top: 0,*/}
        {/*    padding: 3,*/}
        {/*    borderTopLeftRadius: 5,*/}
        {/*    borderTopRightRadius: 5,*/}
        {/*    borderBottomRightRadius: 5,*/}
        {/*  }}*/}
        {/*  numberOfLines={1}>*/}
        {/*  Out of stock*/}
        {/*</Text>*/}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color,
        },
      ]}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
          },
        ]}>
        <Image source={images.app_logo} style={GlobalStyle.toolbarAppIcon} />
        <VegUrbanCommonToolBar
          title={STRING.hi_user}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
          }}
        />
        <ToolBarIcon
          title={Ionicons}
          iconName={'search'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            marginEnd: 0,
            backgroundColor: theme.colors.toolbar_icon_bg,
          }}
          onPress={() => {
            navigation.navigate('Search');
          }}
        />
        <ToolBarIcon
          title={Ionicons}
          iconName={'person'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            marginEnd: 10,
            backgroundColor: theme.colors.toolbar_icon_bg,
          }}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
      </View>
      {/*<View style={GlobalStyle.alignJustifyCenter}>*/}
      {/*  <AntDesign name={'heart'} size={80} color={COLORS.gray} />*/}
      {/*  <Text style={styles.no_wish}>{STRING.no_wish_list_found}</Text>*/}
      {/*  <Text style={styles.no_wish_item}>*/}
      {/*    {STRING.you_have_no_wish_list_items_yet}*/}
      {/*  </Text>*/}
      {/*  <Text style={styles.no_wish_item}>*/}
      {/*    {STRING.tap_the_heart_shape_of_items_to_add_one}*/}
      {/*  </Text>*/}
      {/*</View>*/}

      <FlatList
        style={{
          paddingStart: 5,
          paddingEnd: 5,
        }}
        ListHeaderComponent={() => {
          return <View style={{}} />;
        }}
        ListHeaderComponentStyle={{
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
        data={favData}
        numColumns={2}
        // renderItem={({item, index}) => (
        //   <FavoriteProductItem
        //     item={item}
        //     onFavClick={() => onFavClick(index)}
        //   />
        // )}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  no_wish: {
    marginHorizontal: 15,
    marginTop: 20,
    fontFamily: 'OpenSans-Bold',
    color: COLORS.gray,
    fontSize: 18,
  },
  no_wish_item: {
    marginHorizontal: 15,
    marginTop: 15,
    fontFamily: 'OpenSans-Medium',
    color: COLORS.gray,
    fontSize: 16,
  },
  itemWrapper: {
    // flex: 1,
    // margin: 5,
    // backgroundColor: COLORS.white,
    // borderRadius: 5,
    // maxWidth: SIZES.width / 2 - 10,
    // paddingBottom: 5,
    flex: 1,
    backgroundColor: COLORS.white,
    elevation: 3,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weightText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14.5,
    color: COLORS.grey,
    textAlign: 'center',
    marginTop: 1,
  },
  imageWrapper: {
    height: 140,
    width: '100%',
    alignItems:"center",
    paddingTop:20
  },
  productNameText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.black,
    textAlign: 'center',
  },
  itemImage: {
    // width: '100%',
    // height: 160,
    // borderRadius: 5,
    // resizeMode: 'center',
     height: 100,
    // borderRadius: 10,
    width: '60%',
    resizeMode: 'center',
    marginTop:10
  },
  itemName: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 13,
    color: COLORS.black,
    marginTop: 5,
  },
  itemPrice: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 13,
    color: COLORS.black,
  },
  itemOriPrice: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.gray,
    marginStart: 5,
  },
  offerText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 11,
    color: COLORS.bitter_sweet,
    backgroundColor: COLORS.pale_pink,
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 3,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});
