import {
  FlatList,
  I18nManager,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {SIZES} from '../../constants';
import {FONTS} from '../../constants/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';

const ChooseShipping = ({navigation, route}) => {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const [finalAmount, setFinalAmount] = useState(1000);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const theme = useContext(themeContext);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [cartData, setCartData] = useState([
    {
      name: 'Economy',
      image: 'https://cdn-icons-png.flaticon.com/128/685/685388.png',
      title: 'Delivery in 3-5 days',
      price: '$10',
      id: 1,
    },
    {
      name: 'Regular',
      image: 'https://cdn-icons-png.flaticon.com/128/679/679821.png',
      title: 'Delivery in 2-3 days',
      price: '$15',
      id: 2,
    },
    {
      name: 'Cargo',
      image: 'https://cdn-icons-png.flaticon.com/128/6125/6125110.png',
      title: '5Delivery in 1-2 days',
      id: 3,
      price: '$20',
    },
    {
      name: 'Express',
      image: 'https://cdn-icons-png.flaticon.com/128/713/713311.png',
      title: 'Delivery in 1 days',
      id: 4,
      price: '$25',
    },
  ]);

  const [selectedAddress, setSelectedaddress] = useState('');

  const onCartDataClick = id => {
    let a = cartData.map(item => {
      let temp = Object.assign({}, item);
      if (temp.id == id) {
        temp.selected = true;
        setSelectedaddress(temp?.name + '');
      } else {
        temp.selected = false;
      }
      return temp;
    });
    setCartData(a);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onCartDataClick(item?.id)}
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
          <ImageBackground
            style={[
              styles.imagestyle,
              {
                backgroundColor: theme?.colors?.colorPrimary,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Image
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,

                alignSelf: 'center',
                margin: 8,
              }}
              source={{
                uri: item?.image,
              }}
            />
          </ImageBackground>
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
                {item?.name}
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
                {item?.title}
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
                    fontSize: 16,
                  },
                ]}>
                {item?.price}
              </Text>
              <MaterialCommunityIcons
                name={item?.selected ? 'circle-slice-8' : 'circle-outline'}
                size={22}
                color={theme?.colors?.textColor}
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
          title="Choose Shipping"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
          }}
          textStyle={{
            color: theme.colors.textColor,
            fontFamily: FONTS?.bold,
            fontSize: 20,
          }}
        />
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
          data={cartData}
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
          textColor={theme?.colors?.btnTextColor}
          text={'Apply'}
          backgroundColor={theme?.colors?.colorPrimary}
          onPress={() => {
            navigation.navigate('Checkout');
          }}
          textStyle={{
            fontFamily: FONTS?.bold,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChooseShipping;

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
  imagestyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 5,
    marginLeft: 10,
  },
  amounttext: {
    fontSize: 16,
    fontFamily: FONTS.medium,
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
    fontFamily: FONTS.medium,
    // fontWeight: 'bold',
    // fontFamily: FONTS.semi_bold,
  },
});
