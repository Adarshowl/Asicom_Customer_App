import {
  FlatList,
  I18nManager,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {images, SIZES} from '../../constants';
import {FONTS} from '../../constants/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {showProgressBar} from '../../redux/actions';
import {couponItem, getCouponList} from '../../redux/actions/CartApi';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';

const PromoCode = ({navigation, route}) => {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [finalAmount, setFinalAmount] = useState(1000);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const theme = useContext(themeContext);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(showProgressBar(true));
      dispatch(() => {
        getCouponList(
          dispatch,
          navigation,
          addressSuccessCallback,
          addressErrorCallback,
          BannerErrorCallback,
        );
      });
    }
  }, [isFocused]);

  const BannerErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    // ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };

  const addressSuccessCallback = async data => {
    // ShowConsoleLogMessage('successCallback called after');
    dispatch(showProgressBar(false));
    setCouponData(data?.response);
    setLoading(false);
  };

  const addressErrorCallback = async data => {
    setCouponData([]);
    setLoading(false);
    setTimeout(() => {
      ShowToastMessage(data?.message || 'Something went wrong.');
    }, 100);
  };

  const [couponData, setCouponData] = useState([
    // {
    //   name: 'Special 25% Off',
    //   title: 'Special promo only today!',
    //   id: 1,
    //   // selected: true,
    // },
    // {
    //   name: 'Discount 30% Off',
    //   title: 'New user special promo',
    //   id: 2,
    // },
    // {
    //   name: 'Special 30% Off',
    //   title: 'Special promo only today!',
    //   id: 3,
    //   color: '#273746',
    // },
  ]);
  const [selectedAddress, setSelectedaddress] = useState(null);

  const onCartDataClick = id => {
    let a = couponData.map(item => {
      let temp = Object.assign({}, item);
      if (temp._id == id) {
        temp.selected = true;
        setSelectedaddress(temp);
      } else {
        temp.selected = false;
      }
      return temp;
    });
    setCouponData(a);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        // activeOpacity={0.8}
        onPress={() => onCartDataClick(item?._id)}
        style={[
          styles.wrapperOrder,
          {
            elevation: 2,
            backgroundColor: theme?.colors?.bg,
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
          <Image
            style={{
              width: 70,
              height: 70,
              alignItems: 'center',
              // alignSelf: 'center',
              resizeMode: 'center',
              // borderRadius: 100
            }}
            // style={styles.itemImage}
            source={images.promo}
          />
          {/* <Image source={images.app_logo} style={styles.app_logo} /> */}

          <View style={styles.innnerWrapperOrder}>
            <View
              style={{
                flex: 1,
                // flexDirection: 'row',
                // justifyContent: 'space-between'
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
                {item?.coupon_code}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  // styles.finalPriceText,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.colorPrimary,
                    marginTop: 8,
                    fontFamily: FONTS?.regular,
                  },
                ]}>
                By: {item?.discount_by}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  // styles.finalPriceText,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.colorPrimary,
                    fontFamily: FONTS?.bold,
                    marginEnd: 5,
                    fontSize: 18,
                  },
                ]}>
                {item?.discount_by == 'percentage'
                  ? item?.percentage + '%'
                  : item?.amount + ' ' + item?.currency}
              </Text>
              <MaterialCommunityIcons
                name={item?.selected ? 'circle-slice-8' : 'circle-outline'}
                size={22}
                color={theme?.colors?.colorPrimary}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
            },
          ]}
          onPress={() => {
            navigation.goBack();
            // ShowToastMessage('Coming Soon!');
          }}
        />

        <VegUrbanCommonToolBar
          title="Add Promo"
          // title={route?.params?.item?.name + ''}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
          }}
          textStyle={{
            color: theme.colors.textColor,
            fontSize: 20,
            fontFamily: FONTS?.bold,
          }}
        />
        {/*<AntDesign*/}
        {/*  name={'search1'}*/}
        {/*  size={26}*/}
        {/*  // color={COLORS.colorPrimary}*/}
        {/*  style={{*/}
        {/*    marginEnd: 10,*/}
        {/*  }}*/}
        {/*  onPress={() => {*/}
        {/*    navigation.navigate('Search');*/}
        {/*    // ShowToastMessage('Coming Soon!');*/}
        {/*  }}*/}
        {/*  color={theme?.colors?.textColor}*/}
        {/*/>*/}
      </View>

      <ScrollView>
        <FlatList
          style={{
            paddingStart: 5,
            paddingEnd: 5,
            flex: 1,
          }}
          ListHeaderComponent={() => {
            return <View style={{}} />;
          }}
          ListHeaderComponentStyle={{
            paddingTop: 5,
          }}
          showsVerticalScrollIndicator={false}
          data={couponData}
          renderItem={renderItem}
        />

        {/* <View style={styles.divLine} /> */}
      </ScrollView>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        <VegUrbanCommonBtn
          height={45}
          width={'100%'}
          borderRadius={20}
          textSize={16}
          textColor={theme?.colors?.text}
          text={'Apply'}
          backgroundColor={theme?.colors?.colorPrimary}
          onPress={() => {
            if (selectedAddress == null) {
              ShowToastMessage('Please select promo code');
            } else {
              dispatch(couponItem(selectedAddress));
              navigation.navigate('Checkout');
            }
          }}
          textStyle={{
            fontFamily: FONTS?.bold,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PromoCode;

const styles = StyleSheet.create({
  buttoninvite: {
    // flex:0.4,
    width: '28%',
    alignItems: 'center',
    borderRadius: 80,
    // paddingVertical:5,
    height: 28,
    justifyContent: 'center',
    // height:10,
    alignSelf: 'center',
  },
  wrapper: {
    padding: 15,
    borderRadius: 3,
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    // marginVertical: 20,
    borderRadius: 12,
    // paddingBottom: 60

    // paddingVertical:5
  },
  amountwrapper: {
    padding: 15,
    borderRadius: 3,
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    marginVertical: 20,
    borderRadius: 12,
    marginBottom: 30,
    // paddingBottom: 60

    paddingVertical: 5,
  },
  month: {
    fontSize: 22,
    // fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  monthTitle: {
    fontSize: 14,
    // fontFamily: FONTS.regular,
    color: COLORS.black,
    marginBottom: 2.5,
  },
  wrapperOrder: {
    // padding: 5,
    // margin: 2,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 12,
    // paddingVertical:5
  },
  itemImage: {
    width: '20%',
    height: 100,
    borderRadius: 20,

    // resizeMode: 'center',
    // alignItems: 'center',
    // resizeMode: 'stretch',
    // marginBottom: 10
  },
  divLine: {
    height: 0.5,
    width: '95%',
    backgroundColor: COLORS.gray,
    alignSelf: 'center',
    marginVertical: 5,
    marginTop: 10,
  },
  textlable: {
    fontSize: 16,
    color: COLORS?.black,
  },
  amounttext: {
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: FONTS.semi_old,
    color: COLORS?.black,
  },
  modalBackground: {
    flex: 1,
    // alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    // borderRadius: 15,
    width: SIZES.width,

    display: 'flex',
    flexDirection: 'column',
    // paddingVertical: 8,
  },
  qtyText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
    flex: 0.3,
  },
  originalPrice: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.black,
    marginStart: 8,

    textDecorationColor: COLORS.black,
  },
  deleteSaveText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.red,
    textAlign: 'center',
    flex: 1,
    marginTop: 5,
  },
  image: {
    height: 90,
    width: '28%',
    // margin:6,
    marginTop: 5,
    resizeMode: 'stretch',
    borderRadius: 5,
    // paddingTop:10
    // resizeMode:'contain',
  },
  innnerWrapper: {
    flex: 1,
    marginStart: 10,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innnerWrapperOrder: {
    flex: 1,
    marginStart: 10,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textName: {
    fontFamily: FONTS?.bold,
    fontSize: 18,
    color: COLORS.black,
  },
  discountPrice: {
    // fontFamily: 'OpenSans-SemiBold',
    fontFamily: FONTS?.regular,

    fontSize: 13,
    color: COLORS.black,
  },
  // qtyText: {
  //   fontFamily: 'OpenSans-Regular',
  //   fontSize: 13,
  //   color: COLORS.black,
  // },
  finalPriceText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 17,
    color: COLORS.colorPrimary,
    marginTop: 3,
  },
  createProfile: {
    fontSize: 16,
    // fontFamily: FONTS.regular,
    color: COLORS.grey,
    lineHeight: 24,
    alignSelf: 'center',
  },
  label: {
    fontSize: 20,
    marginTop: 16,
    color: COLORS.black,

    fontFamily: FONTS.semi_old,
    // fontFamily: FONTS.semi_bold,
  },
});
