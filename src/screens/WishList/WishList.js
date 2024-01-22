import {
  FlatList,
  I18nManager,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {useIsFocused} from '@react-navigation/native';
import {showProgressBar} from '../../redux/actions';
import {
  addToFavoriteProduct,
  getFavoriteProductList,
} from '../../redux/actions/CartApi';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Octicons from 'react-native-vector-icons/Octicons';
import {icons, SIZES} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {
  getSavedFavoriteProduct,
  removeFromFavoriteRealm,
} from '../../utils/RealmUtility';
import {getHomeProduct} from '../../redux/actions/HomeApi';
import {IMAGE_BASE_URL} from '../../network/ApiEndPoints';

const WishList = ({navigation}) => {
  const theme = useContext(themeContext);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const loginCount = useSelector(state => state?.state?.count);
  const userToken = useSelector(state => state?.state?.userToken);
  const [favoriteData, setFavoriteData] = useState([]);
  const [favoriteData1, setFavoriteData1] = useState([]);
  const [showCartEmpty, setShowCartEmpty] = useState(false);
  const [showCartEmpty1, setShowCartEmpty1] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (loginCount == 1) {
      if (isFocused) {
        dispatch(showProgressBar(true));
        dispatch(() => {
          getFavoriteProductList(
            dispatch,
            navigation,
            userToken,
            successCallback,
            errorCallback,
            BannerErrorCallback,
          );
        });
      }
    } else {
      getSavedFavoriteProduct().then(res => {
        if (res?.length > 0) {
          setFavoriteData1(res);
          // ShowConsoleLogMessage(res[0]?.fav);
          // ShowConsoleLogMessage(res[1]?.fav);
          // ShowConsoleLogMessage(res[2]?.fav);
        } else {
          setShowCartEmpty(true);
          setFavoriteData([]);
        }
      });
    }
  }, [isFocused]);

  useEffect(() => {
    // let a = favoriteData1?.map(item => {
    //   return {...item, fav: true};
    // });
    //
    // setFavoriteData(a);

    // favoriteData1?.forEach(item => {
    //   item.fav = true;
    // });
    setFavoriteData(favoriteData1);
  }, [favoriteData1]);

  const successCallback = async data => {
    dispatch(showProgressBar(false));
    // ShowConsoleLogMessage(data?.response);
    setFavoriteData(data?.response);
    setShowCartEmpty(data?.response?.length <= 0);
  };

  const errorCallback = async data => {
    setShowCartEmpty(true);
    setFavoriteData([]);
    dispatch(showProgressBar(false));
    setLoading(false);
    // setTimeout(() => {
    //   ShowToastMessage(data?.message || 'Something went wrong.');
    // }, 100);
  };

  const BannerErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    // ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={[styles.Wrapper, {}]}>
        <TouchableOpacity
          style={[styles.itemWrapper, {}]}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('ProductDetail', {
              item,
              isFavorite: !item.fav,
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
              source={
                item?.product_id?.thumbnail_image
                  ? IMAGE_BASE_URL + item?.product_id?.thumbnail_image
                  : IMAGE_BASE_URL + item?.thumbnail_image
              }
              styles={{
                width: 150,
                height: 160,
                borderRadius: 15,
              }}
            />
            <View style={{position: 'absolute', top: 8, right: 0}}>
              <ToolBarIcon
                title={Octicons}
                iconName={'heart-fill'}
                icSize={14}
                icColor={
                  item?.fav
                    ? theme?.colors?.hearttext
                    : theme?.colors?.hearttext
                }
                style={{
                  backgroundColor: theme?.colors?.heart,
                  borderRadius: 30,
                  width: 25,
                  height: 25,
                }}
                onPress={() => {
                  const updatedData = [...favoriteData];
                  updatedData.splice(index, 1);
                  setFavoriteData(updatedData);
                  // ShowConsoleLogMessage(
                  //   item?._id + ' ---- ' + item?.product_id?._id,
                  // );
                  if (loginCount == 1) {
                    if (item?.product_id?._id != undefined) {
                      // ShowConsoleLogMessage('if part');
                      dispatch(() => {
                        addToFavoriteProduct(
                          dispatch,
                          navigation,
                          userToken,
                          item?.product_id?._id + '',
                          () => {},
                          () => {},
                          () => {},
                        );
                        removeFromFavoriteRealm(item?.product_id?._id + '');

                        dispatch(() =>
                          getHomeProduct(
                            dispatch,
                            navigation,
                            () => {},
                            () => {},
                            () => {},
                          ),
                        );
                      });
                    } else {
                      // ShowConsoleLogMessage('else part');

                      dispatch(() => {
                        addToFavoriteProduct(
                          dispatch,
                          navigation,
                          userToken,
                          item?._id + '',
                          () => {},
                          () => {},
                          () => {},
                        );
                        removeFromFavoriteRealm(item?._id);

                        dispatch(() =>
                          getHomeProduct(
                            dispatch,
                            navigation,
                            () => {},
                            () => {},
                            () => {},
                          ),
                        );
                      });
                    }
                  } else {
                    removeFromFavoriteRealm(item?._id);
                    dispatch(() =>
                      getHomeProduct(
                        dispatch,
                        navigation,
                        () => {},
                        () => {},
                        () => {},
                      ),
                    );
                  }
                }}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <Text
          style={[
            styles.itemName,
            {
              color: theme.colors.textColor,
              marginTop: 10,
              fontFamily: FONTS?.bold,
              paddingBottom: 5,
            },
          ]}
          numberOfLines={1}>
          {item?.product_id?.product_name || item?.product_name}
        </Text>
        {/*<Text*/}
        {/*  style={[styles.itemPrice, {color: theme.colors.white, marginTop: 5}]}>*/}
        {/*  {STRING.APP_CURRENCY}*/}
        {/*  {item?.product_id?.amount || item?.amount}*/}
        {/*</Text>*/}
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
          title="Wish List"
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
        {loginCount == 1 ? (
          showCartEmpty ? null : (
            // <AntDesign
            //   name={'search1'}
            //   size={26}
            //   // color={COLORS.colorPrimary}
            //   style={{
            //     marginEnd: 20,
            //   }}
            //   color={theme?.colors?.textColor}
            // />
            <TouchableOpacity
              style={styles.locationArrow}
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Image
                source={icons.search}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: theme?.colors?.white,
                }}
              />
            </TouchableOpacity>
          )
        ) : null}
      </View>
      {/*{loginCount == 1 ? (*/}
      <View
        style={{
          flex: 1,
        }}>
        {showCartEmpty ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}>
            <Text
              style={[
                GlobalStyle.bothSideText,
                {
                  color: theme?.colors?.white,
                  fontSize: 18,
                  fontFamily: FONTS?.medium,
                  textAlign: 'center',
                  marginBottom: 20,
                },
              ]}>
              No product in wish list
            </Text>
            <VegUrbanCommonBtn
              height={40}
              width={'100%'}
              borderRadius={20}
              textSize={16}
              textColor={theme?.colors?.text}
              text={'Shop Now'}
              backgroundColor={theme?.colors?.colorPrimary}
              onPress={() => {
                // navigation.navigate('Home');
                navigation.goBack();
              }}
              textStyle={{
                fontFamily: FONTS?.bold,
              }}
            />
          </View>
        ) : (
          <FlatList
            style={{
              paddingStart: 10,
              paddingEnd: 5,
            }}
            ListHeaderComponent={() => {
              return <View style={{}} />;
            }}
            ListHeaderComponentStyle={{
              paddingTop: 5,
            }}
            showsVerticalScrollIndicator={false}
            data={favoriteData}
            extraData={favoriteData}
            numColumns={2}
            renderItem={renderItem}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default WishList;

const styles = StyleSheet.create({
  locationArrow: {
    marginEnd: 10,
    padding: 5,
  },
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
    alignItems: 'center',
    resizeMode: 'stretch',
  },
  itemName: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    color: COLORS.black,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: FONTS?.regular,
  },
  itemOriPrice: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.gray,
    marginStart: 5,
  },
  offerText: {},
});
