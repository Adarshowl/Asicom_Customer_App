import {
  FlatList,
  I18nManager,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import {icons, STRING} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';
import {FONTS} from '../../constants/Fonts';
import SerchList from './SerchList';
import {useDispatch, useSelector} from 'react-redux';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import {showProgressBar} from '../../redux/actions';
import {getSearchProduct} from '../../redux/actions/HomeApi';

const Search = ({navigation}) => {
  const theme = useContext(themeContext);

  const dispatch = useDispatch();
  const [showCartEmpty, setShowCartEmpty] = useState(false);
  const userToken = useSelector(state => state?.state?.userToken);

  const {t} = useTranslation();
  const [show, setShow] = useState(false);

  // const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState('');
  const handleSearch = text => {
    setSearchInput(text);
  };
  const handleSubmit = item => {
    dispatch(showProgressBar(true));

    dispatch(() => {
      getSearchProduct(
        dispatch,
        navigation,
        searchInput,
        successCallback,
        errorCallback,
        BannerErrorCallback,
      );
    });
  };
  const successCallback = async data => {
    dispatch(showProgressBar(false));

    let a = data?.response?.map(item => {
      return {...item, fav: false};
    });
    setData(a);

    setShowCartEmpty(data?.response?.length <= 0);
  };

  const errorCallback = async data => {
    setShowCartEmpty(true);
    setData([]);
    dispatch(showProgressBar(false));
    setTimeout(() => {
      ShowToastMessage(data?.message || 'Something went wrong.');
    }, 100);
  };

  const BannerErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    // ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };
  // const [favData, setFavData] = useState([
  //   {
  //     name: 'Sonia Headphone',
  //     image: 'https://cdn-icons-png.flaticon.com/128/7819/7819061.png',
  //     // price: '120.00',
  //     // old: '100.00',
  //     // rate: '2',
  //     // qty: '2 kg',
  //     // sold: '1.2k',
  //     fav: true,
  //   },
  //   {
  //     name: 'Mini Leather Bag',
  //     image: 'https://cdn-icons-png.flaticon.com/128/1040/1040254.png',
  //     // price: '130.00',
  //     // old: '80.00',
  //     // qty: '1 kg',
  //     // rate: '1',
  //     // sold: '1.5k',
  //     fav: true,
  //   },
  //   {
  //     name: 'Puma Casual Shoes',
  //     image: 'https://cdn-icons-png.flaticon.com/128/3345/3345843.png',
  //     // old: '80.00',
  //     // qty: '1 kg',
  //     // rate: '1',
  //     // sold: '1.5k',
  //     fav: true,
  //   },
  //   {
  //     name: 'Fujifilm Camera',
  //     image: 'https://cdn-icons-png.flaticon.com/128/9592/9592226.png',
  //     fav: true,
  //   },
  //
  //   {
  //     name: 'Zonio SuperWatch',
  //     image: 'https://cdn-icons-png.flaticon.com/128/2976/2976655.png',
  //
  //     fav: true,
  //   },
  //   {
  //     name: 'Gucci Leather Bag',
  //     image: 'https://cdn-icons-png.flaticon.com/128/1040/1040254.png',
  //     fav: true,
  //   },
  // ]);

  const [data, setData] = useState([]);
  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          styles.Wrapper,
          {
            // backgroundColor: "#F8F9F9",
            // backgroundColor: theme.colors.bg_color_onBoard,
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
            navigation.navigate('ProductDetail', {item: item});
          }}>
          <ImageBackground
            style={[
              styles.itemImage,
              {
                // backgroundColor:"#F2F4F4",
                backgroundColor: theme?.colors?.colorimageback,
                alignItems: 'center',
                // alignSelf: 'center',
                justifyContent: 'center',
              },
            ]}>
            <View style={{position: 'absolute', top: 8, right: 0}}>
              <ToolBarIcon
                title={Octicons}
                iconName={item.fav ? 'heart' : 'heart-fill'}
                icSize={14}
                icColor={
                  item.fav ? theme?.colors?.hearttext : theme?.colors?.hearttext
                }
                style={{
                  backgroundColor: theme?.colors?.heart,
                  borderRadius: 30,
                  width: 25,
                  height: 25,
                }}
                onPress={() => {
                  // Toggle the favorite status of the item
                  const updatedData = [...favData];
                  updatedData[index].fav = !item.fav;
                  setFavData(updatedData);
                }}
              />
            </View>
            <Image
              style={{
                width: 100,
                height: 100,
                alignItems: 'center',
                // alignSelf: 'center',
                // resizeMode: 'center',
                // marginTop: 30
              }}
              // style={styles.itemImage}
              source={{
                uri: item?.image,
              }}
            />
          </ImageBackground>
        </TouchableOpacity>
        <Text
          style={[
            styles.itemName,
            {
              color: theme.colors.textColor,
              marginTop: 10,
              fontFamily: FONTS?.bold,
              // fontWeight:'bold'
              // color: theme.colors.textColor,
              // alignItems:'center'
              // alignSelf: 'flex-start',
            },
          ]}
          numberOfLines={1}>
          {item?.name}
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
            4.3
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
              11.3k sold
            </Text>
          </View>
        </View>
        <Text style={[styles.itemPrice, {color: theme.colors.white}]}>
          {STRING.APP_CURRENCY}120.00
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
            elevation: 0,
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
          title={STRING.search}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
            fontFamily: FONTS?.semi_old,
            marginLeft: 15,
            fontSize: 18,
          }}
        />
      </View>

      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme?.colors?.bg,
            borderWidth: 0.2,
            borderColor: theme?.colors?.grey,
          },
        ]}>
        {/*<AntDesign name={'search1'} size={23} color={theme?.colors?.grey} />*/}

        <Image
          source={icons.search}
          style={{
            height: 20,
            width: 20,
            tintColor: theme?.colors?.white,
          }}
        />
        <TextInput
          style={[
            styles.input,
            {
              color: theme?.colors?.white,
              textAlign: I18nManager.isRTL ? 'right' : 'left',
            },
          ]}
          value={searchInput}
          onChangeText={text => handleSearch(text)}
          placeholder={'Search by name'}
          onSubmitEditing={handleSubmit}
          keyboardType={'default'}
          placeholderTextColor={theme?.colors?.gray}
        />

        {/*<Octicons*/}
        {/*  name={'arrow-switch'}*/}
        {/*  size={20}*/}
        {/*  color={theme?.colors?.grey}*/}
        {/*/>*/}
      </View>

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
            No result found please try different keyword.
          </Text>
        </View>
      ) : (
        <FlatList
          style={{
            flex: 1,
            marginHorizontal: 8,
          }}
          showsVerticalScrollIndicator={false}
          data={data} // Use either filtered data or original data based on the search status
          renderItem={({item, index}) => (
            <SerchList
              item={item}
              onFavPress={() => {
                const updatedData = [...data];
                updatedData[index].fav = !item.fav;
                setData(updatedData);
              }}
              theme={theme}
              userToken={userToken}
              dispatch={dispatch}
            />
          )}
          numColumns={2}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    // paddingHorizontal: 5,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 3,
    marginTop: 5,
    // borderWidth:0.1
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: FONTS.medium,
    paddingStart: 5,
    marginStart: 5,
  },
});
