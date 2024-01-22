import {
  Animated,
  FlatList,
  I18nManager,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import themeContext from '../../constants/themeContext';
import {
  getHomeProduct,
  getItemByCategoryName,
  getSubCatByCategoryName,
  getSubCatByCategoryNameBySubCatName,
} from '../../redux/actions/HomeApi';
import {useDispatch, useSelector} from 'react-redux';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import {showProgressBar} from '../../redux/actions';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Octicons from 'react-native-vector-icons/Octicons';
import {addToFavoriteProduct} from '../../redux/actions/CartApi';
import {
  doSaveOfferOfflineRealm,
  getSavedFavoriteProductString,
  removeFromFavoriteRealm,
} from '../../utils/RealmUtility';
import {FONTS} from '../../constants/Fonts';
import {SIZES, STRING} from '../../constants';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import {COLORS} from '../../constants/Colors';
import {IMAGE_BASE_URL} from '../../network/ApiEndPoints';

const CategoryHome = ({navigation, route}) => {
  const theme = useContext(themeContext);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [subCatData, setSubCatData] = useState([]);
  const dispatch = useDispatch();
  const userToken = useSelector(state => state?.state?.userToken);
  const loginCount = useSelector(state => state?.state?.count);
  const [showCartEmpty, setShowCartEmpty] = useState(false);

  const [receivedItem, setReceivedItem] = useState(null);

  useEffect(() => {
    let {item} = route?.params;
    setReceivedItem(item);
    getCategory(item?._id);
  }, []);

  useEffect(() => {
    let is_product_save = '';
    (async () => {
      is_product_save = await getSavedFavoriteProductString();
      // ShowConsoleLogMessage(is_product_save);

      // const savedProductIds = is_product_save?.split(',')?.map(id => id.trim());
      // const savedProductIds = is_product_save?.replaceAll(',', '');
      let a = productData?.map(item => {
        return {...item, fav: is_product_save?.includes(item?._id)};
      });
      setData(a);
    })();
  }, [productData]);

  const getCategory = name => {
    dispatch(showProgressBar(true));

    dispatch(() =>
      getItemByCategoryName(
        dispatch,
        navigation,
        name,
        successCallback,
        errorCallback,
        BannerErrorCallback,
      ),
    );

    dispatch(() =>
      getSubCatByCategoryName(
        dispatch,
        navigation,
        name,
        subCatSuccessCallback,
        subCatErrorCallback,
        BannerErrorCallback,
      ),
    );
  };
  const BannerErrorCallback = error => {
    setShowCartEmpty(true);
    dispatch(showProgressBar(false));

    ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };

  const successCallback = async data => {
    dispatch(showProgressBar(false));
    // ShowConsoleLogMessage(data);
    setProductData(data?.data);
    setShowCartEmpty(data?.data?.length <= 0);
  };

  const errorCallback = async data => {
    setProductData([]);
    setShowCartEmpty(true);
    dispatch(showProgressBar(false));
    // setTimeout(() => {
    //   ShowToastMessage(data?.message || 'Something went wrong.');
    // }, 100);
  };

  const subCatSuccessCallback = async data => {
    dispatch(showProgressBar(false));
    // ShowConsoleLogMessage(data);
    let newItem = {
      sub_category_name: 'All',
      selected: true,
    };
    let b = data?.data?.map(item => {
      return {...item, selected: false};
    });
    let a = [newItem, ...b];
    setSubCatData(a);
  };

  const subCatErrorCallback = async data => {
    setSubCatData([]);
    dispatch(showProgressBar(false));
    // setTimeout(() => {
    //   ShowToastMessage(data?.message || 'Something went wrong.');
    // }, 100);
  };

  const onSubCatItemClick = name => {
    let a = subCatData.map(item => {
      let temp = Object.assign({}, item);
      if (temp.sub_category_name == name) {
        temp.selected = true;
        if (name == 'All') {
          dispatch(showProgressBar(true));

          dispatch(() =>
            getItemByCategoryName(
              dispatch,
              navigation,
              receivedItem?._id,
              successCallback,
              errorCallback,
              BannerErrorCallback,
            ),
          );
        } else {
          dispatch(showProgressBar(true));

          dispatch(() =>
            getSubCatByCategoryNameBySubCatName(
              dispatch,
              navigation,
              receivedItem?._id,
              name,
              successCallback,
              errorCallback,
              BannerErrorCallback,
            ),
          );
        }
      } else {
        temp.selected = false;
      }
      return temp;
    });
    setSubCatData(a);
  };

  const renderSubCatItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={route.id}
        accessibilityRole="button"
        onPress={() => {
          onSubCatItemClick(item?.sub_category_name);
        }}
        // onPress={onPress}
        style={{
          // width:"10%",
          // maxWidth: 100,
          justifyContent: 'center',
          alignItems: 'center',
          height: 45,
          // backgroundColor: isFocused
          //   ? theme?.colors?.all
          //   :theme?.colors?.btntextColor,
          backgroundColor: item?.selected
            ? theme?.colors?.categorycolor
            : theme?.colors?.btntextColor,

          // : theme?.colors?.bg,
          borderRadius: 20,
          borderColor: theme?.colors?.grey,
          color: theme?.colors?.black,
          borderWidth: 1,
          paddingHorizontal: 15,
          marginStart: 10,
          // elevation:5
        }}>
        <Animated.Text
          numberOfLines={1}
          style={{
            fontSize: 15,
            color: item?.selected ? 'white' : theme?.colors?.white,
            fontFamily: FONTS?.bold,
          }}>
          {item?.sub_category_name}
        </Animated.Text>
      </TouchableOpacity>
    );
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
              // data,
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
                width: 150,
                height: 160,
                borderRadius: 15,
              }}
            />
            <View style={{position: 'absolute', top: 8, right: 0}}>
              <ToolBarIcon
                title={Octicons}
                iconName={item?.fav ? 'heart-fill' : 'heart'}
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
                  const updatedData = [...data];
                  updatedData[index].fav = !item.fav;
                  setData(updatedData);
                  // ShowConsoleLogMessage(updatedData[index].fav);
                  if (loginCount == 1) {
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
                      if (updatedData[index].fav) {
                        doSaveOfferOfflineRealm(
                          item?._id,
                          item?.thumbnail_image
                            ? IMAGE_BASE_URL + item?.thumbnail_image
                            : '',
                          item?.product_name,
                          item?.amount,
                        );
                      } else {
                        removeFromFavoriteRealm(item?._id);
                      }
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
                    if (updatedData[index].fav) {
                      doSaveOfferOfflineRealm(
                        item?._id,
                        item?.thumbnail_image
                          ? IMAGE_BASE_URL + item?.thumbnail_image
                          : '',
                        item?.product_name,
                        item?.amount,
                      );
                    } else {
                      removeFromFavoriteRealm(item?._id);
                    }
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
            },
          ]}
          numberOfLines={1}>
          {item?.product_name}
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
                fontFamily: FONTS?.bold,
                color: theme?.colors?.textColor,
              }}>
              {item?.sold} sold
            </Text>
          </View>
        </View>
        <Text style={[styles.itemPrice, {color: theme.colors.white}]}>
          {STRING.APP_CURRENCY}
          {item?.amount}
        </Text>
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
          }}
        />

        <Text
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
            color: theme.colors.textColor,
            fontFamily: FONTS.semi_old,
            fontSize: 20,
            flex: 1,
            marginEnd: 10,
          }}
          numberOfLines={2}>
          {route?.params?.item?.category_name}
        </Text>
        <AntDesign
          name={'search1'}
          size={26}
          style={{
            marginEnd: 10,
          }}
          onPress={() => {
            navigation.navigate('Search');
          }}
          color={theme?.colors?.textColor}
        />
      </View>
      {subCatData?.length > 0 ? (
        <View>
          <FlatList
            style={{
              height: 65,
              marginTop: 10,
            }}
            showsVerticalScrollIndicator={false}
            data={subCatData}
            extraData={subCatData}
            horizontal={true}
            renderItem={renderSubCatItem}
          />
        </View>
      ) : null}

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
            No products found
          </Text>
          <VegUrbanCommonBtn
            height={40}
            width={'100%'}
            borderRadius={20}
            textSize={16}
            textColor={theme.colors?.text}
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
        <>
          <FlatList
            style={{
              marginHorizontal: 8,
            }}
            showsVerticalScrollIndicator={false}
            data={data}
            extraData={data}
            renderItem={renderItem}
            numColumns={2}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default CategoryHome;

const styles = StyleSheet.create({
  Wrapper: {
    marginTop: 10,
    flexGrow: 1,
    marginVertical: 2,
    maxWidth: SIZES.width / 2 - 10,
    paddingBottom: 5,
    padding: 5,
    borderRadius: 10,
  },
  itemWrapper: {
    flex: 1,
    borderRadius: 5,
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

/**

 */
