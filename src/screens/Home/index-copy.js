import {
  FlatList,
  I18nManager,
  Image,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import {SIZES} from '../../constants';
import {COLORS} from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import TabOfferScreen from '../Flash/TabOfferScreen';
import '../../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';
import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';
import {
  getGreeting,
  ShowConsoleLogMessage,
  ShowToastMessage,
} from '../../utils/Utility';
import {useDispatch, useSelector} from 'react-redux';
import {
  getHomeBanner,
  getHomeProduct,
  getItemCategory,
} from '../../redux/actions/HomeApi';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import {getSavedImage} from '../../utils/RealmUtility';
import {getFavoriteProductList} from '../../redux/actions/CartApi';

const Home = ({navigation}) => {
  const theme = useContext(themeContext);
  const greeting = getGreeting();
  const dispatch = useDispatch();
  const userData = useSelector(state => state?.state?.userData);
  const userImage = useSelector(state => state?.state?.userImage);
  const userToken = useSelector(state => state?.state?.userToken);
  const count = useSelector(state => state?.state?.count);
  const bannerData = useSelector(state => state?.homeReducer?.data);
  const categoryData = useSelector(state => state?.homeReducer?.categoryData);
  const {t, i18n} = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  // ShowConsoleLogMessage(userToken);
  const onRefresh = () => {
    // Simulate a 2-second delay
    setTimeout(() => {
      setRefreshing(false);

      getAllData();
    }, 2000);
  };

  const getAllData = () => {
    getBanner();
    getCategory();
    getProducts();
  };
  const onLocationBarClick = () => {
    navigation.navigate('DeliveryAddress');
  };

  const catData = [
    {
      name: 'Clothes',
      image: 'https://cdn-icons-png.flaticon.com/128/1867/1867565.png',
    },

    {
      name: 'Shoes',
      image: 'https://cdn-icons-png.flaticon.com/128/5479/5479005.png',
    },
    {
      name: 'Bags',
      image: 'https://cdn-icons-png.flaticon.com/128/11137/11137719.png',
    },
    {
      name: 'Electronics',
      image: 'https://cdn-icons-png.flaticon.com/128/2406/2406065.png',
    },
    {
      name: 'Watch',
      image: 'https://cdn-icons-png.flaticon.com/128/3109/3109881.png',
    },
    {
      name: 'Jewelry',
      image: 'https://cdn-icons-png.flaticon.com/128/10551/10551201.png',
    },
    {
      name: 'Kitchen',
      image: 'https://cdn-icons-png.flaticon.com/128/1698/1698691.png',
    },
    {
      name: 'Toys',
      image: 'https://cdn-icons-png.flaticon.com/128/3082/3082060.png',
    },
  ];

  const [language, setLanguage] = useState(0);

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };
  const [image, setImage] = useState('');
  const getUserFromStorage = async () => {
    // try {
    //   await AsyncStorage.getItem(USER_IMAGE, async (error, value) => {
    //     if (error) {
    //     } else {
    //       if (value !== null) {
    //         setImage(value);
    //       } else {
    //         setImage('');
    //         // navigation.replace('Login');
    //       }
    //     }
    //   });
    // } catch (err) {
    //   console.log('ERROR IN GETTING USER FROM STORAGE');
    // }

    getSavedImage()
      .then(res => {
        // ShowToastMessage('called');
        // ShowConsoleLogMessage(res[0]?.image);
        setImage(res[0]?.image);
      })
      .catch(error => {
        ShowConsoleLogMessage(error);
      })
      .finally(() => {});
  };
  useEffect(() => {
    getUserFromStorage();
    // clearRealm();
    getBanner();
    getCategory();
    getProducts();
    getFavProducts();
  }, []);

  useEffect(() => {
    getUserFromStorage();
  }, [userImage]);

  const getBanner = () => {
    dispatch(() =>
      getHomeBanner(
        dispatch,
        navigation,
        () => {},
        () => {},
        BannerErrorCallback,
      ),
    );
  };

  const getProducts = () => {
    dispatch(() =>
      getHomeProduct(
        dispatch,
        navigation,
        () => {},
        () => {},
        BannerErrorCallback,
      ),
    );
  };

  const getCategory = () => {
    dispatch(() =>
      getItemCategory(
        dispatch,
        navigation,
        () => {},
        () => {},
        BannerErrorCallback,
      ),
    );
  };

  const getFavProducts = () => {
    dispatch(() =>
      getFavoriteProductList(
        dispatch,
        navigation,
        userToken,
        () => {},
        () => {},
        BannerErrorCallback,
      ),
    );
  };

  const BannerErrorCallback = error => {
    ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };
  const renderCtegory = ({item}) => {
    // console.log(item[0]?.image);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CategoryHome', {item: item});
        }}
        style={{
          // flexGrow: 1,
          // maxWidth: SIZES.width / 4,
          width: SIZES.width / 4.2,
          // marginStart: 10,
          // marginEnd: 10,
          marginVertical: 8,
          // paddingStart: 5,
          alignItems: 'center',
          alignSelf: 'flex-start',
          // backgroundColor: 'red',
        }}>
        <View
          style={[
            styles.itemImage,
            {
              backgroundColor: theme?.colors?.colorimageback,
              // alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          {/*{item?.image != undefined || null ? (*/}

          <VegUrbanImageLoader
            source={item?.image}
            styles={[
              {
                width: 45,
                borderRadius: 5,
                height: 45,
              },
            ]}
          />
          {/*) : null}*/}
        </View>
        <View style={{}}>
          <Text
            style={[
              styles.itemName,
              {
                color: theme.colors.white,
                fontFamily: FONTS?.bold,
              },
            ]}
            numberOfLines={1}>
            {item?.category_name}
            {/*{item?.name}*/}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          // backgroundColor: theme.colors.bg_color,
          backgroundColor: theme.colors?.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 15,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // paddingBottom: 10,
            flexGrow: 1,
          }}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={{
                borderRadius: 50,
                height: 35,
                width: 35,
                marginStart: 15,
              }}
              source={{
                // uri: 'https://cdn-icons-png.flaticon.com/128/3024/3024605.png',
                uri: image
                  ? image
                  : 'https://cdn-icons-png.flaticon.com/128/3024/3024605.png',
              }}
            />
          </TouchableOpacity>

          <View
            style={{
              marginStart: 10,
            }}>
            <VegUrbanCommonToolBar
              title={greeting}
              style={{
                backgroundColor: theme.colors.bg_color_onBoard,
              }}
              textStyle={{
                color: theme.colors.white,
                fontSize: 14,
                fontFamily: FONTS?.regular,
              }}
            />

            {userData?.name ? (
              <Text
                style={{
                  fontSize: 16,
                  color: theme.colors.white,
                  fontFamily: FONTS?.bold,
                  marginTop: -5,
                  maxWidth: SIZES.width / 2 + 20,
                }}
                numberOfLines={1}>
                {userData?.name}
              </Text>
            ) : null}
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Ionicons
            name="notifications-outline"
            size={25}
            color={theme?.colors?.white}
            style={[styles.locationArrow, {}]}
            onPress={() => {
              navigation.navigate('Notification');
            }}
          />
          <Fontisto
            name="heart"
            size={20}
            color={theme?.colors?.white}
            style={[styles.locationArrow, {}]}
            onPress={() => {
              navigation.navigate('WishList');
            }}
          />
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme?.colors?.white, theme?.colors?.white]}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Search');
          }}
          style={[
            styles.inputWrapper,
            {
              backgroundColor: theme?.colors?.bg,
              borderWidth: 0.5,
              borderColor: theme?.colors?.grey,
            },
          ]}>
          <AntDesign name={'search1'} size={23} color={theme?.colors?.grey} />
          <TextInput
            editable={false}
            style={[
              styles.input,
              {
                color: theme?.colors?.white,
                textAlign: I18nManager.isRTL ? 'right' : 'left',
              },
            ]}
            placeholder={'Search'}
            placeholderTextColor={theme?.colors?.gray}
          />
        </TouchableOpacity>
        {bannerData?.length > 0 ? (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HomeSwiper');
              }}
              activeOpacity={0.5}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginVertical: 12,
                alignItems: 'center',
              }}>
              <Text
                style={[
                  GlobalStyle.locationText,
                  {
                    color: theme.colors.white,
                    fontSize: 20,
                    fontFamily: FONTS?.bold,
                  },
                ]}>
                {t('Special Offers')}
              </Text>
              <View
                style={{
                  flex: 1,
                }}
              />
              <Text
                style={[
                  GlobalStyle.locationText,
                  {
                    color: theme.colors.white,
                    fontSize: 16,
                    fontFamily: FONTS?.medium,
                  },
                ]}>
                {t('See All')}
              </Text>
            </TouchableOpacity>
            <View style={GlobalStyle.sliderMainContainer}>
              <SwiperFlatList
                autoplay={true}
                autoplayDelay={3}
                autoplayLoop={true}
                data={bannerData}
                autoplayLoopKeepAnimation={true}
                paginationDefaultColor={theme?.colors?.colorPrimar}
                paginationActiveColor={theme?.colors?.colorPrimary}
                showPagination={true}
                paginationStyleItemActive={styles.paginationStyleItem}
                paginationStyleItemInactive={styles.paginationendStyleItem}
                renderItem={({item}) =>
                  item?.image != 'null' ? (
                    <View style={GlobalStyle.sliderMainWrapper}>
                      <ImageBackground
                        source={{
                          uri: item?.image,
                        }}
                        // resizeMode={'stretch'}
                        style={[styles.sliderImage]}
                      />
                    </View>
                  ) : null
                }
              />
            </View>
          </>
        ) : null}

        <View style={[GlobalStyle.flexRowAlignCenter, {}]}>
          <View
            style={{
              flex: 1,
            }}
          />
        </View>
        <View
          style={{
            width: SIZES.width,
          }}>
          <FlatList
            numColumns={4}
            contentContainerStyle={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 10,
              paddingTop: 10,
            }}
            data={categoryData}
            renderItem={renderCtegory}
          />
        </View>
        <View
          style={[
            GlobalStyle.flexRowAlignCenter,
            {
              alignItems: 'center',
            },
          ]}>
          <Text
            style={[
              GlobalStyle.headingText,
              {
                color: theme?.colors?.white,
                fontSize: 20,
                // marginTop: 25,
                alignItems: 'center',
                fontFamily: FONTS?.bold,
              },
            ]}>
            {t('Most Popular')}
          </Text>
          <View
            style={{
              flex: 1,
            }}
          />
          <Text
            onPress={() => {
              navigation.navigate('FlashSale');
            }}
            style={[
              GlobalStyle.locationText,
              {
                color: theme.colors.white,
                fontSize: 16,
                marginEnd: 20,
                fontFamily: FONTS?.regular,
              },
            ]}>
            {t('See All')}
          </Text>
        </View>

        <TabOfferScreen
          fetchMoreData={() => {
            ShowConsoleLogMessage('hi end reached');
          }}
        />

        <View style={GlobalStyle.paddingVertical10} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  locationArrow: {
    marginEnd: 10,
    padding: 5,
  },

  sliderImage: {
    width: SIZES.width - 40,
    height: 150,
    overflow: 'hidden',
    borderRadius: 20,
    // marginTop: -40
  },
  paginationStyleItem: {
    height: 5,
    width: 16,
    borderRadius: 5,
    // marginBottom:20,
    marginTop: -35,
  },
  paginationendStyleItem: {
    height: 8,
    width: 8,
    borderRadius: 5,
    // marginBottom:20,
    marginTop: -35,
  },

  image: {
    width: SIZES.width - 20,
    marginTop: 3,
    height: 130,
    borderRadius: 3,
    alignSelf: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    // paddingHorizontal: 5,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 3,
    marginTop: 5,
    // borderWidth:0.1
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    paddingStart: 5,
    marginStart: 5,
  },
  itemName: {
    // fontFamily: 'OpenSans-SemiBold',
    fontSize: 15,
    color: COLORS.black,
    fontFamily: 'Urbanist-Black',
    marginTop: 10,
    // alignItems:'center'
    textAlign: 'center',
  },
  itemImage: {
    width: 65,
    height: 65,
    alignItems: 'center',
    borderRadius: 50,
  },
});
