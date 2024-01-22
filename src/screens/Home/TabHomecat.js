import React, {useContext, useState} from 'react';
import {
  FlatList,
  I18nManager,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../constants/Colors';
import {STRING} from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import themeContext from '../../constants/themeContext';
import ToolBarIcon from '../../utils/ToolBarIcon';
import {FONTS} from '../../constants/Fonts';
import Octicons from 'react-native-vector-icons/Octicons';

const TabHomecat = () => {
  const [show, setShow] = useState(false);

  const theme = useContext(themeContext);
  const isRTL = I18nManager.isRTL;

  // const item = route.params.item;
  const navigation = useNavigation();
  const [favData, setFavData] = useState([
    {
      name: 'vebesa Long shirt',
      image:
        'https://images.meesho.com/images/products/272690304/2qs2u_512.webp',
      // price: '120.00',
      // old: '100.00',
      // rate: '2',
      // qty: '2 kg',
      // sold: '1.2k',
      fav: true,
    },
    {
      name: 'Weralla cordgors',
      image: 'https://m.media-amazon.com/images/I/61XikI9CHCL._SL1500_.jpg',
      // price: '130.00',
      // old: '80.00',
      // qty: '1 kg',
      // rate: '1',
      // sold: '1.5k',
      fav: true,
    },
    {
      name: 'Viyara Ma Biazar',
      image:
        'https://i.etsystatic.com/19023169/r/il/32d566/1707048000/il_fullxfull.1707048000_htfn.jpg',
      // old: '80.00',
      // qty: '1 kg',
      // rate: '1',
      // sold: '1.5k',
      fav: true,
    },
    {
      name: 'Maco Blue Suit',
      image:
        'https://rukminim2.flixcart.com/image/850/1000/xif0q/kids-t-shirt/m/i/u/3-4-years-dcr0005-cars-original-imagpv5pfbgpjkwb.jpeg?q=90',
      fav: true,
    },

    {
      name: 'Black jacket',
      image:
        'https://src1.ilogo.in/images/products/8471/custom-boys-t-shirts.webp',

      fav: true,
    },
    {
      name: 'Black Turtleneck',
      image:
        'https://rukminim1.flixcart.com/image/300/300/kklhbbk0/kids-t-shirt/0/e/t/15-16-years-boys-t-as7-skechite-original-imafzwtyxyg2gcgq.jpeg',
      fav: true,
    },
  ]);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          styles.Wrapper,
          {
            // backgroundColor: theme.colors.bg_color,
            // backgroundColor: theme.colors.mainContainerBgColor,
          },
        ]}>
        <TouchableOpacity
          style={[
            styles.itemWrapper,
            {
              // backgroundColor: theme.colors.bg_color_onBoard,
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
                backgroundColor: theme?.colors?.bg,
                alignItems: 'center',
                // alignSelf: 'center',
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
                width: 120,
                height: 120,
                alignItems: 'center',
                alignSelf: 'center',
                resizeMode: 'center',
                marginTop: 30,
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
              backgroundColor: theme?.colors?.bg,
              paddingHorizontal: 15,
              borderRadius: 5,
              padding: 5,
              marginTop: 5,
            }}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: FONTS.semi_old,
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
    <View
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          // height: 350,
          backgroundColor: theme.colors.bg_color_onBoard,
          // flex:1,
          // marginHorizontal: 10,
          borderRadius: 5,

          // marginBottom:40
        },
      ]}>
      <FlatList
        style={{
          flex: 1,
          marginHorizontal: 8,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={favData}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
};
export default TabHomecat;

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    borderRadius: 5,
  },
  Wrapper: {
    marginTop: 10,
    flex: 1,
    // margin: 5,
    marginVertical: 2,
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
    fontFamily: FONTS?.bold,
    fontSize: 16,
    color: COLORS.black,
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: FONTS?.regular,

    // color: COLORS.grey,
    // textAlign: 'center',
    // marginTop: 5,
  },
  itemOriPrice: {
    fontFamily: FONTS?.regular,
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.gray,
    marginStart: 5,
  },
  offerText: {},
});
