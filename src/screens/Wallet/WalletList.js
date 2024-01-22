import React, {useContext, useState} from 'react';
import {
  FlatList,
  I18nManager,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {FONTS} from '../../constants/Fonts';

import {STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';

const WalletList = ({navigation}) => {
  const theme = useContext(themeContext);

  const {t, i18n} = useTranslation();
  const [show, setShow] = useState(false);

  const [cartData, setCartData] = useState([
    {
      name: 'Sonia Headphone',
      image: 'https://cdn-icons-png.flaticon.com/512/772/772183.png',
      price: '120',
      date: 'Dec 15, 2024 | 12:00 PM',
      order: 'Top Up',
      fav: true,
    },
    {
      name: 'Mini Leather Bag',
      image:
        'https://wwd.com/wp-content/uploads/2023/08/Kate-Spade-Sam-Tote.png?w=300',
      price: '130',
      date: 'Jan 13, 2023 | 10:00 PM',
      order: 'Order',

      fav: true,
    },
    {
      name: 'Puma Casual Shoes',
      image:
        'https://e7.pngegg.com/pngimages/107/770/png-clipart-black-shoe-illustration-sneakers-adidas-computer-icons-shoe-running-running-shoes-miscellaneous-white.png',
      price: '90',
      date: 'Oct 20, 2023 | 06:00 AM',
      order: 'Order',
      fav: true,
    },
    {
      name: 'Fujifilm Camera',
      image:
        'https://e7.pngegg.com/pngimages/315/760/png-clipart-black-dslr-camera-camera-lens-graphy-icon-slr-camera-lens-camera-icon.png',
      price: '180',
      date: 'Oct 25, 2023 | 06:00 AM',
      order: 'Top Up',
      fav: true,
    },

    {
      name: 'Zonio SuperWatch',
      image:
        'https://e7.pngegg.com/pngimages/686/779/png-clipart-round-silver-colored-chronograph-watch-with-black-band-watch-rolex-datejust-watch-free-image-file-formats-watch-accessory.png',
      price: '200',
      date: 'Nov 20, 2023 | 06:00 AM',
      order: 'Order',
      fav: true,
    },
    {
      name: 'Gucci Leather Bag',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh0VI0Hs0YFFTbZQ47INOmGOtpePYRcmc87g&usqp=CAU',
      price: '189',
      date: 'May 10, 2023 | 09:00 PM',
      order: 'Top Up',
      fav: true,
    },
  ]);
  const renderItem = ({item}) => {
    return (
      <View
        // activeOpacity={0.8}
        style={[
          styles.wrapperOrder,
          {
            backgroundColor: theme?.colors?.bg_color_onBoard,
          },
        ]}>
        <View
          style={[
            GlobalStyle.flexRowAlignCenter,
            {
              paddingVertical: 5,
              alignItems: 'center',
            },
          ]}>
          <ImageBackground
            style={[
              styles.itemImage,
              {
                backgroundColor: theme?.colors?.colorimageback,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Image
              style={{
                width: 45,
                height: 45,
                alignSelf: 'center',
                borderRadius: 50,
              }}
              // style={styles.itemImage}
              source={{
                uri: item?.image,
              }}
            />
          </ImageBackground>
          <View style={styles.innnerWrapperOrder}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.white,
                  },
                ]}
                numberOfLines={1}>
                {item?.name}
              </Text>
              <Text
                style={[
                  styles.textName,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.colorPrimary,
                    // marginTop: 8
                    marginEnd: 8,
                    // fontSize:16
                  },
                ]}>
                {STRING.APP_CURRENCY}
                {item?.price}
              </Text>
            </View>
            <View
              style={[
                {
                  flexWrap: 'wrap',
                  marginTop: 5,
                  justifyContent: 'space-between',
                  alinItem: 'center',
                },
                GlobalStyle.flexRowAlignCenter,
              ]}>
              <Text
                style={[
                  styles.discountPrice,
                  {
                    color: theme?.colors?.textColor,
                  },
                ]}>
                {item?.date}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alinItem: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme?.colors?.textColor,
                    fontFamily: FONTS?.bold,
                    // margin: 2,
                    // color: item?.order === "order" ? 'pink' : item?.order === 'Top Up' ? 'blue' : 'black',
                  }}>
                  {' '}
                  {item?.order}{' '}
                </Text>
                {item?.order === 'Order' ? (
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: '#FD606A',
                      borderRadius: 5,
                      alinItem: 'center',
                      marginTop: 2,
                    }}>
                    <Ionicons
                      name="arrow-up"
                      size={14}
                      color={COLORS?.white}
                      style={{}}
                    />
                  </View>
                ) : item?.order === 'Top Up' ? (
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: '#606CFD',
                      borderRadius: 5,
                      alinItem: 'center',
                      marginTop: 2,

                      // alignSelf:'center'
                    }}>
                    <Ionicons
                      name="arrow-down"
                      size={14}
                      color={COLORS?.white}
                    />
                  </View>
                ) : null}
              </View>
            </View>

            {/* <View
                            style={{
                                backgroundColor: theme?.colors?.bg,
                                paddingHorizontal: 15,
                                borderRadius: 5,
                                padding: 5,
                                marginTop: 5,
                                width: '40%'

                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    color: COLORS?.black

                                }}
                            >In Delivery</Text>
                        </View> */}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
            alignItems: 'center',
          },
        ]}>
        <Ionicons
          name="ios-arrow-back"
          // color={COLORS.black}
          color={theme.colors.textColor}
          size={25}
          style={[
            styles.backIcon,
            {
              opacity: !show ? 1 : 0.0,
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              marginStart: 10,
              marginTop: 10,
            },
          ]}
          onPress={() => {
            navigation.goBack();
            // ShowToastMessage('Coming Soon!');
          }}
        />
        {/* <ToolBarIcon
           title={Ionicons}
           iconName={'chevron-back'}
           icSize={20}
           icColor={COLORS.colorPrimary}
           style={{
             backgroundColor: theme?.colors?.toolbar_icon_bg,
             marginEnd: 10,
           }}
           onPress={() => {
             navigation.goBack();
           }}
         /> */}
        <VegUrbanCommonToolBar
          title="Transaction History"
          // title={route?.params?.item?.name + ''}

          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
          }}
          textStyle={{
            color: theme.colors.textColor,
            // fontWeight: 'bold',
            fontSize: 20,
          }}
        />
        <AntDesign
          name={'search1'}
          size={26}
          // color={COLORS.colorPrimary}
          style={{
            marginEnd: 10,
          }}
          color={theme?.colors?.textColor}
          onPress={() => {
            navigation.navigate('Search');
            // ShowToastMessage('Coming Soon!');
          }}
        />
        {/* <ToolBarIcon
           title={Ionicons}
           iconName={'person'}
           icSize={20}
           icColor={COLORS.colorPrimary}
           style={{
             backgroundColor: theme?.colors?.toolbar_icon_bg,
             marginEnd: 10,
           }}
           onPress={() => {
             navigation.navigate('Profile');
           }}
         /> */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            GlobalStyle.loginModalBg,
            {
              // alignItems: 'center',
              // paddingHorizontal: 10,
              // borderRadius:10,
              // marginVertical:10,
              // paddingVertical:60,
              // marginTop:'15%',
              // padding:20,
              // elevation:10,
              // marginHorizontal: -10,
              backgroundColor: theme.colors?.bg_color_onBoard,

              // backgroundColor: theme?.colors?.bg_color_onBoard,
            },
          ]}>
          <View
            style={
              {
                // marginTop: '3%',
                // alignItems: 'center'
              }
            }>
            <FlatList
              style={{
                paddingStart: 5,
                paddingEnd: 5,
              }}
              ListHeaderComponent={() => {
                return <View style={{}} />;
              }}
              ListHeaderComponentStyle={{
                paddingTop: 5,
              }}
              showsVerticalScrollIndicator={false}
              data={cartData}
              renderItem={renderItem}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletList;

const styles = StyleSheet.create({
  wrapperOrder: {
    padding: 5,
    borderRadius: 3,
    // margin: 2,
    backgroundColor: COLORS.white,
    // marginHorizontal: 10,
    marginVertical: 3,
    // borderRadius: 12,
    paddingHorizontal: 0,
    // paddingVertical:5,
    borderRadius: 10,
  },
  backIcon: {
    // marginTop: 18,
    marginStart: 15,
    paddingVertical: 5,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  itemImage: {
    width: '18%',
    height: 60,
    borderRadius: 50,
  },
  app_logo: {
    height: 180,
    resizeMode: 'stretch',
    alignSelf: 'center',
    width: '100%',
    marginTop: 0,
    marginBottom: 20,
  },
  discountPrice: {
    // fontFamily: 'OpenSans-SemiBold',
    fontFamily: FONTS?.bold,

    fontSize: 14,
    color: COLORS.black,
  },
  wrapper: {
    padding: 15,

    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    // marginVertical: 20,
    borderRadius: 12,
  },
  innnerWrapperOrder: {
    flex: 1,
    marginStart: 10,
    marginTop: 0,
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  textName: {
    fontFamily: FONTS?.bold,
    fontSize: 16,
    color: COLORS.black,
  },
});
