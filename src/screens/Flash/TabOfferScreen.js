import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../constants/Colors';
import {SIZES, STRING} from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import themeContext from '../../constants/themeContext';
import ToolBarIcon from '../../utils/ToolBarIcon';
import {FONTS} from '../../constants/Fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import {useDispatch, useSelector} from 'react-redux';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import {addToFavoriteProduct} from '../../redux/actions/CartApi';
import {
  doSaveOfferOfflineRealm,
  getSavedFavoriteProductString,
  removeFromFavoriteRealm,
} from '../../utils/RealmUtility';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import {getHomeProduct} from '../../redux/actions/HomeApi';
import {IMAGE_BASE_URL} from '../../network/ApiEndPoints';

const TabOfferScreen = () => {
  const theme = useContext(themeContext);
  const dispatch = useDispatch();
  const userToken = useSelector(state => state?.state?.userToken);
  const loginCount = useSelector(state => state?.state?.count);

  const [page, setPage] = useState(1); // Track the current page of data
  const [loadingMore, setLoadingMore] = useState(false); // Track whether more data is being loaded

  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const productData = useSelector(state => state?.homeReducer?.productData);

  useEffect(() => {
    // ShowConsoleLogMessage(productData?.length);
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

  const renderItem = ({item, index}) => {
    return (
      <View style={[styles.Wrapper, {}]}>
        <TouchableOpacity
          style={[styles.itemWrapper, {}]}
          activeOpacity={0.8}
          onPress={() => {
            ShowConsoleLogMessage(item?.flash_enddate);

            navigation.navigate('ProductDetail', {
              item,
              isFavorite: !item.fav,
              endDate: item?.flash_enddate,
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
                // flexGrow: 1,
                width: SIZES.width / 2.4,
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
              fontFamily: FONTS?.semi_old,
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
                fontFamily: FONTS?.medium,
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
    <View
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme.colors.bg_color_onBoard,
          borderRadius: 5,
        },
      ]}>
      <FlatList
        style={{
          flex: 1,
          marginHorizontal: 8,
        }}
        showsVerticalScrollIndicator={false}
        data={data}
        extraData={data}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
};
export default TabOfferScreen;

const styles = StyleSheet.create({
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
    // resizeMode: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
    // marginBottom: 10
  },
  itemName: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    color: COLORS.black,
    marginTop: 2,
    // alignItems:'center'
    // textAlign: 'center'
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: FONTS?.medium,

    // color: COLORS.grey,
    // textAlign: 'center',
    // marginTop: 5,
  },
  itemOriPrice: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.gray,
    marginStart: 5,
  },
  offerText: {
    // fontFamily: 'OpenSans-SemiBold',
    //   fontSize: 12,
    //   color: COLORS.bitter_sweet,
    //   backgroundColor: COLORS.pale_pink,
    //   position: 'absolute',
    //   left: 0,
    //   top: 0,
    //   padding: 5,
    //   paddingHorizontal: 10,
    //   borderTopRightRadius: 10, // Always apply this radius
    //   borderBottomRightRadius: 10, // Always apply this radius
    //   borderTopLeftRadius: isRTL ? 0 : 10, // Apply only in LTR mode
    //   borderBottomLeftRadius: isRTL ? 0 : 10,
  },
});
