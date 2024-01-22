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
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import {icons, SIZES} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import TabOfferScreen from '../Flash/TabOfferScreen';
import '../../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';
import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';
import {
  getDateDiff,
  getGreeting,
  ShowConsoleLogMessage,
  ShowToastMessage,
} from '../../utils/Utility';
import {useDispatch, useSelector} from 'react-redux';
import {
  getHomeBanner,
  getHomeFlashDeal,
  getHomeProduct,
  getItemCategory,
  updateCartDataLength,
} from '../../redux/actions/HomeApi';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import {getSavedCartProduct, getSavedImage} from '../../utils/RealmUtility';
import {
  getFavoriteProductList,
  getUserCartProduct,
} from '../../redux/actions/CartApi';
import CountDown from 'react-native-countdown-component';
import {decode, encode} from 'base-64';
import {IMAGE_BASE_URL} from '../../network/ApiEndPoints';

const Home = ({navigation}) => {
  const theme = useContext(themeContext);
  const greeting = getGreeting();
  const dispatch = useDispatch();
  const userData = useSelector(state => state?.state?.userData);
  const userImage = useSelector(state => state?.state?.userImage);
  const userToken = useSelector(state => state?.state?.userToken);
  const loginCount = useSelector(state => state?.state?.count);
  const bannerData = useSelector(state => state?.homeReducer?.data);
  const categoryData = useSelector(state => state?.homeReducer?.categoryData);
  const {t, i18n} = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [flashDeal, setFlashDeal] = useState([]);
  const [counterTime, setCounterTime] = useState(0);
  // ShowConsoleLogMessage(userToken);

  const [catData, setCatData] = useState([]);

  useEffect(() => {
    try {
      if (!global?.btoa) {
        global.btoa = encode;
      }

      if (!global?.atob) {
        global.atob = decode;
      }
    } catch (e) {
      ShowConsoleLogMessage(e);
    }
  }, []);

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
    getFlashDeal();
    getProducts();
  };
  const onLocationBarClick = () => {
    navigation.navigate('DeliveryAddress');
  };

  const getFromLocal = () => {
    getSavedCartProduct()
      .then(res => {
        if (res?.length > 0) {
          dispatch(updateCartDataLength(res?.length));
        } else {
          dispatch(updateCartDataLength(0));
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  const getOnline = () => {
    dispatch(() => {
      getUserCartProduct(
        dispatch,
        navigation,
        userToken,
        data => {
          dispatch(updateCartDataLength(data?.response?.length));
        },
        data => {
          dispatch(updateCartDataLength(0));
        },
        BannerErrorCallback,
      );
    });
  };

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
    getFlashDeal();
    getProducts();
    getFavProducts();

    if (loginCount == 1) {
      getOnline();
    } else {
      getFromLocal();
    }
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

  const getFlashDeal = () => {
    dispatch(() =>
      getHomeFlashDeal(
        dispatch,
        navigation,
        successFlashDealCallBack,
        errorFlashDealCallBack,
        BannerErrorCallback,
      ),
    );
  };

  const successFlashDealCallBack = async data => {
    // ShowConsoleLogMessage(
    //   'successFlashDealCallBack flash call' + Object.values(data?.data).length,
    // );

    const counter = getDateDiff(data?.data?.enddate);

    // ShowConsoleLogMessage(
    //   'successFlashDealCallBack flash call enddate -> ' + data?.data?.enddate,
    // );
    // ShowConsoleLogMessage(
    //   'successFlashDealCallBack flash call counter-> ' + counter,
    // );
    setCounterTime(counter);
    if (data?.data?.isExpire == 'Expired') {
      setCounterTime(0);
    }
    setFlashDeal([data?.data]);
  };
  const errorFlashDealCallBack = async data => {
    setFlashDeal([]);
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
            source={IMAGE_BASE_URL + item?.image}
            styles={[
              {
                // width: 45,
                width: 65,
                height: 65,
                // borderRadius: 5,
                borderRadius: 50,
                resizeMode: 'center',
                // height: 45,
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
                fontFamily: FONTS?.regular,
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
            {!image ? (
              <Image
                style={{
                  borderRadius: 50,
                  height: 35,
                  width: 35,
                  marginStart: 15,
                  tintColor: theme?.colors?.white,
                }}
                // source={{
                //   uri: 'https://cdn-icons-png.flaticon.com/128/3024/3024605.png',
                // }}
                source={icons.profile}
              />
            ) : (
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
            )}
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
          {/*<Ionicons*/}
          {/*  name="notifications-outline"*/}
          {/*  size={25}*/}
          {/*  color={theme?.colors?.white}*/}
          {/*  style={[styles.locationArrow, {}]}*/}
          {/*  onPress={() => {*/}
          {/*    navigation.navigate('Notification');*/}
          {/*  }}*/}
          {/*/>*/}
          <TouchableOpacity
            style={styles.locationArrow}
            onPress={() => {
              navigation.navigate('Notification');
            }}>
            <Image
              source={icons.notification}
              style={{
                height: 25,
                width: 25,
                tintColor: theme?.colors?.white,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.locationArrow}
            onPress={() => {
              navigation.navigate('WishList');
            }}>
            <Image
              source={icons.like}
              style={{
                height: 25,
                width: 25,
                tintColor: theme?.colors?.white,
              }}
            />
          </TouchableOpacity>
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
          {/*<AntDesign name={'search1'} size={20} color={theme?.colors?.grey} />*/}
          <Image
            source={icons.search}
            style={{
              height: 18,
              tintColor: theme?.colors?.white,
              width: 18,
            }}
          />
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
                    fontSize: 18,
                    fontFamily: FONTS?.semi_old,
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
                    fontSize: 14,
                    fontFamily: FONTS?.regular,
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

        <View
          style={[
            GlobalStyle.flexRowAlignCenter,
            {
              marginTop: 10,
              alignItems: 'center',
            },
          ]}>
          <Text
            style={[
              GlobalStyle.headingText,
              {
                color: theme?.colors?.white,
                fontSize: 18,
                fontFamily: FONTS?.semi_old,
                alignItems: 'center',
              },
            ]}>
            {t('Categories')}
          </Text>
          <View
            style={{
              flex: 1,
            }}
          />
          <Text
            onPress={() => {
              navigation.navigate('AllCategories');
            }}
            style={[
              GlobalStyle.locationText,
              {
                color: theme.colors.white,
                marginEnd: 20,
                fontSize: 14,
                fontFamily: FONTS?.regular,
              },
            ]}>
            {t('See All')}
          </Text>
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
            data={
              categoryData?.length > 9
                ? categoryData?.slice(0, 8)
                : categoryData
              // categoryData
            }
            renderItem={renderCtegory}
          />
        </View>
        {/*<FlatList*/}
        {/*  data={flashDeal}*/}
        {/*  numColumns={2}*/}
        {/*  style={{*/}
        {/*    flex: 1,*/}
        {/*    marginHorizontal: 8,*/}
        {/*  }}*/}
        {/*  showsVerticalScrollIndicator={false}*/}
        {/*  renderItem={({item, index}) => {*/}
        {/*    return (*/}
        {/*      <Text>{item?.title}</Text>*/}
        {/*      // <FlashDealProductItem navigation={navigation} item={item} />*/}
        {/*    );*/}
        {/*  }}*/}
        {/*/>*/}
        {flashDeal?.length > 0 && flashDeal[0]?.isExpire != 'Expired' ? (
          <>
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
                    // marginTop: 25,
                    alignItems: 'center',
                    fontSize: 18,
                    fontFamily: FONTS?.semi_old,
                  },
                ]}>
                Flash Deal
              </Text>
              <View
                style={{
                  flex: 1,
                }}
              />
              {/*<CountdownTimer targetDate={flashDeal[0]?.enddate} />*/}
              {counterTime > 0 ? (
                <CountDown
                  digitStyle={{
                    // backgroundColor: theme?.colors?.colorPrimary,
                    padding: 1,
                  }}
                  until={counterTime}
                  // timeLabels={false}
                  // timeToShow={['D', 'H', 'M', 'S']}
                  timeToShow={['D', 'H', 'M', 'S']}
                  size={9}
                  showSeparator={true}
                  separatorStyle={{
                    // color: theme?.colors?.text,
                    color: '#884D31',
                    marginBottom: 2,
                  }}
                  digitTxtStyle={{
                    color: '#884D31',
                    fontFamily: FONTS.medium,
                  }}
                  timeLabelStyle={{
                    color: theme?.colors?.text,
                    fontSize: 0,
                    backgroundColor: theme?.colors?.colorPrimary,
                    // paddingHorizontal: 2,
                    borderRadius: 2,
                    marginStart: 2,
                  }}
                />
              ) : null}
              <View
                style={{
                  // flex: 1,
                  marginEnd: 20,
                }}
              />
            </View>
            {/*<FlatList*/}
            {/*  data={flashDeal}*/}
            {/*  numColumns={2}*/}
            {/*  style={{*/}
            {/*    flex: 1,*/}
            {/*    marginHorizontal: 8,*/}
            {/*  }}*/}
            {/*  showsVerticalScrollIndicator={false}*/}
            {/*  renderItem={({ item, index }) => {*/}
            {/*    return (*/}
            {/*      <Text>{item?.title}</Text>*/}
            {/*      // <FlashDealProductItem navigation={navigation} item={item} />*/}
            {/*    );*/}
            {/*  }}*/}
            {/*/>*/}

            <View style={GlobalStyle.sliderMainContainer}>
              <SwiperFlatList
                autoplay={true}
                autoplayDelay={3}
                autoplayLoop={true}
                data={flashDeal}
                autoplayLoopKeepAnimation={true}
                paginationDefaultColor={theme?.colors?.grey}
                paginationActiveColor={theme?.colors?.colorPrimary}
                showPagination={false}
                paginationStyleItemActive={styles.paginationStyleItem}
                paginationStyleItemInactive={styles.paginationendStyleItem}
                renderItem={({item}) =>
                  item?.homepage_image != 'null' ? (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('FlashDealSale', {item: item});
                      }}
                      style={GlobalStyle.sliderMainWrapper}>
                      <ImageBackground
                        source={{
                          uri: IMAGE_BASE_URL + item?.homepage_image,
                        }}
                        style={[styles.sliderImage]}
                      />
                      {/*<Text>{item?.title}</Text>*/}
                    </TouchableOpacity>
                  ) : null
                }
              />
            </View>
          </>
        ) : null}

        <View
          style={[
            GlobalStyle.flexRowAlignCenter,
            {
              marginTop: 10,
              alignItems: 'center',
            },
          ]}>
          <Text
            style={[
              GlobalStyle.headingText,
              {
                color: theme?.colors?.white,
                alignItems: 'center',
                fontSize: 18,
                fontFamily: FONTS?.semi_old,
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
                marginEnd: 20,
                fontSize: 14,
                fontFamily: FONTS?.regular,
              },
            ]}>
            {t('See All')}
          </Text>
        </View>

        <TabOfferScreen />

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
    marginTop: 7,
    // marginTop: -35,
  },
  paginationendStyleItem: {
    height: 8,
    width: 8,
    borderRadius: 5,
    // marginBottom:20,
    // marginTop: -35,
    marginTop: 5,
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
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 5,
    height: 40,
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
    fontFamily: FONTS.regular,
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
