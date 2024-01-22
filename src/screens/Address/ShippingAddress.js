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

const ShippingAddress = ({navigation, route}) => {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const [finalAmount, setFinalAmount] = useState(1000);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const theme = useContext(themeContext);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [cartData, setCartData] = useState([
    {
      name: 'Home',
      image: 'https://randomuser.me/api/portraits/men/60.jpg',
      title: '123, Main Street New York',
      id: 1,
    },
    {
      name: 'Office',
      image: 'https://randomuser.me/api/portraits/women/81.jpg',
      title: '345, Second Street New York',
      id: 2,
    },
    {
      name: 'Appatment',
      image: 'https://randomuser.me/api/portraits/men/79.jpg',
      title: '567, Forth Street New York',
      id: 3,
    },
    {
      name: "Parent's House ",
      image: 'https://randomuser.me/api/portraits/men/85.jpg',
      title: '123, Fifth Street New York',
      id: 4,
    },

    {
      name: 'Farm House',
      title: '789, Min Road New York',
      image: 'https://randomuser.me/api/portraits/women/74.jpg',
      id: 5,
    },
    {
      name: 'Town Square',
      title: '123, Main Street New York',
      image: 'https://randomuser.me/api/portraits/men/79.jpg',
      id: 6,
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
        // activeOpacity={0.8}
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
          {/* <Image
                        style={{
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            // alignSelf: 'center',
                            resizeMode: 'center',
                            // marginTop: 30,
                            borderRadius: 100
                        }}
                        // style={styles.itemImage}
                        source={{
                            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoB3mYtLafUiRQEUeY7dQVt-rX0w7NF1kRa7SsXA3Nm2cBixmQUYZWYjgAT-5wVg3A7sM&usqp=CAU"
                            // uri: item?.image,
                        }}
                    /> */}
          <ImageBackground
            style={[
              styles.imagestyle,
              {
                // backgroundColor:"#F2F4F4",
                backgroundColor: theme?.colors?.colorPrimary,
                alignItems: 'center',
                // alignSelf: 'center',
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
                // resizeMode:'contain',
                // borderRadius: 10,
                // marginTop: 30
              }}
              // style={styles.itemImage}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoB3mYtLafUiRQEUeY7dQVt-rX0w7NF1kRa7SsXA3Nm2cBixmQUYZWYjgAT-5wVg3A7sM&usqp=CAU',

                // uri: notification?.image
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
                alignSelf: 'center',
              }}>
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
          title="Shipping Address"
          // title={route?.params?.item?.name + ''}

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

        {/* <AntDesign
                    name={'search1'}
                    size={26}
                    // color={COLORS.colorPrimary}
                    style={{
                        marginEnd: 10
                    }}
                    color={theme?.colors?.textColor}
                /> */}
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
        <View
          style={{
            alignItems: 'center',
            marginHorizontal: 15,
            marginVertical: 10,
            marginBottom: 10,
          }}>
          <VegUrbanCommonBtn
            height={45}
            width={'100%'}
            borderRadius={20}
            textSize={16}
            textColor={theme?.colors?.textColor}
            text={'Add New Address'}
            backgroundColor={theme?.colors?.colorimageback}
            onPress={() => {
              navigation.navigate('AddNewAddress');
            }}
            textStyle={{
              fontFamily: FONTS?.bold,
            }}
          />
        </View>
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

export default ShippingAddress;

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
    paddingVertical: 8,
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
  },
  imagestyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 5,
    marginLeft: 10,
  },
});
