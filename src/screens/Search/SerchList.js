import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {STRING} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../constants/Colors';
import {useTranslation} from 'react-i18next';
import {FONTS} from '../../constants/Fonts';
import {useNavigation} from '@react-navigation/native';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import {IMAGE_BASE_URL} from '../../network/ApiEndPoints';

const SerchList = ({item, onFavPress, theme, index, dispatch, userToken}) => {
  const navigation = useNavigation();
  // const theme = useContext(themeContext);
  const {t} = useTranslation();

  return (
    <View
      style={[
        {
          flex: 0.5,
        },
      ]}>
      <TouchableOpacity
        style={[
          styles.itemWrapper,
          {
            // backgroundColor: theme.colors.bg_color,
            // backgroundColor: theme.colors.mainContainerBgColor,
          },
        ]}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('ProductDetail', {
            item: item,
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
            source={IMAGE_BASE_URL + item?.thumbnail_image}
            styles={{
              width: 150,
              height: 160,
              borderRadius: 15,
            }}
          />
          {/*<View style={{position: 'absolute', top: 8, right: 0}}>*/}
          {/*  <ToolBarIcon*/}
          {/*    title={Octicons}*/}
          {/*    iconName={item?.fav ? 'heart-fill' : 'heart'}*/}
          {/*    icSize={14}*/}
          {/*    icColor={*/}
          {/*      item?.fav ? theme?.colors?.hearttext : theme?.colors?.hearttext*/}
          {/*    }*/}
          {/*    style={{*/}
          {/*      backgroundColor: theme?.colors?.heart,*/}
          {/*      borderRadius: 30,*/}
          {/*      width: 25,*/}
          {/*      height: 25,*/}
          {/*    }}*/}
          {/*    onPress={() => {*/}
          {/*      dispatch(() => {*/}
          {/*        onFavPress();*/}
          {/*        addToFavoriteProduct(*/}
          {/*          dispatch,*/}
          {/*          userToken,*/}
          {/*          item?._id + '',*/}
          {/*          () => {},*/}
          {/*          () => {},*/}
          {/*          () => {},*/}
          {/*        );*/}
          {/*      });*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</View>*/}
        </ImageBackground>
      </TouchableOpacity>
      <Text
        style={[
          styles.itemName,
          {
            color: theme.colors.textColor,
            marginTop: 10,
            fontFamily: FONTS?.semi_old,

            marginLeft: 7,

            // fontWeight:'bold'
            // color: theme.colors.textColor,
            // alignItems:'center'
            // alignSelf: 'flex-start',
          },
        ]}
        numberOfLines={1}>
        {item?.product_name}
      </Text>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginLeft: 5,
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
            // width: 0,
            // height: 13,
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
      <Text
        style={[
          styles.itemPrice,
          {
            color: theme.colors.white,
            marginLeft: 7,
            fontFamily: FONTS?.bold,
            paddingBottom: 10,
          },
        ]}>
        {STRING.APP_CURRENCY}
        {item?.amount}
      </Text>
    </View>
  );
};
export default SerchList;

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    borderRadius: 5,
    // marginVertical: 10,
    paddingBottom: 0,
    padding: 5,
    // alignItems: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  Wrapper: {
    marginTop: 10,
    flex: 1,
    // margin: 5,
    marginVertical: 2,
    // backgroundColor: COLORS.bg_color,
    // borderRadius: 5,
    // maxWidth: SIZES.width / 2 - 10,
    paddingBottom: 5,
    padding: 5,
    // alignItems: 'center',
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
});
