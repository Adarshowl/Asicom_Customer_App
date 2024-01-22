import React, {memo, useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {STRING} from '../../constants';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import {FONTS} from '../../constants/Fonts';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import {useNavigation} from '@react-navigation/native';
import {IMAGE_BASE_URL} from '../../network/ApiEndPoints';

const CartItem = ({
  item,
  onAdd,
  onMinus,
  onDelete,
  onSaveLater,
  fromSave,
  onSaveRemove,
}) => {
  // console.log(
  //   "items?.is_flash_deal == 'Active' ==amount ",
  //   parseInt(item?.product_id?.amount) +
  //     ' -- flash amount' +
  //     parseInt(item?.product_id?.flash_offer_percentage) +
  //     ' ---- ',
  // );
  // console.log(
  //   ((parseInt(item?.product_id?.amount) *
  //     parseInt(item?.product_id?.flash_offer_percentage)) /
  //     100) *
  //     parseInt(item?.quantity),
  // );
  // ShowConsoleLogMessage(parseInt(item?.product_id?.flash_offer_percentage));

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const fa =
    ((parseInt(item?.product_id?.amount) *
      parseInt(item?.product_id?.flash_offer_percentage)) /
      100) *
    parseInt(item?.quantity);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductDetail', {item: item});
      }}
      // activeOpacity={0.8}
      style={[
        styles.wrapper,
        {
          // backgroundColor: '#F2F3F4',
          elevation: 5,
          backgroundColor: theme?.colors?.bg,
          // backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          GlobalStyle.flexRowAlignCenter,
          {
            paddingVertical: 5,
            alignItems: 'center',
            backgroundColor: theme?.colors?.bg,
          },
        ]}>
        {/*<ImageBackground*/}
        {/*  style={[*/}
        {/*    styles.itemImage,*/}
        {/*    {*/}
        {/*      backgroundColor: theme?.colors?.colorimageback,*/}
        {/*      alignItems: 'center',*/}
        {/*      justifyContent: 'center',*/}
        {/*    },*/}
        {/*  ]}>*/}
        <VegUrbanImageLoader
          source={
            item?.product_id?.thumbnail_image
              ? IMAGE_BASE_URL + item?.product_id?.thumbnail_image
              : IMAGE_BASE_URL + item?.thumbnail_image
          }
          styles={[
            {
              width: 90,
              height: 90,
              alignSelf: 'center',
              margin: 8,
              // resizeMode:'contain',
              borderRadius: 5,
              // marginTop: 30
            },
          ]}
        />
        {/*</ImageBackground>*/}
        <View style={styles.innnerWrapper}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                styles.textName,
                {
                  alignSelf: 'flex-start',
                  color: theme?.colors?.white,
                  marginEnd: 5,
                },
              ]}
              numberOfLines={1}>
              {item?.product_id?.product_name || item?.product_name}
              {/*{item?.product_id?.product_name || item?.product_name}*/}
            </Text>
            <MaterialIcons
              name="delete-outline"
              size={22}
              color={theme?.colors?.textColor}
              style={{
                marginEnd: 10,
              }}
              onPress={toggleModal}
            />
            <DeleteConfirmationModal
              visible={isModalVisible}
              onCancel={toggleModal}
              onConfirm={() => {
                // Handle delete action here
                toggleModal();
                onDelete();
              }}
              item={item}
            />
          </View>
          <View
            style={[
              {
                flexWrap: 'wrap',
                marginTop: 5,
              },
              GlobalStyle.flexRowAlignCenter,
            ]}>
            <View
              style={{
                borderRadius: 20,
                width: 12,
                height: 12,
                backgroundColor: item?.color || theme?.colors?.gray,
                // marginEnd: 10,
                marginTop: 8,
                marginBottom: 8,
              }}
            />
            <Text
              style={[
                styles.discountPrice,
                {
                  // color: COLORS?.black,
                  color: theme?.colors?.white,
                  // color: theme?.colors?.,
                  marginLeft: 5,
                },
              ]}>
              Color
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
            <Text
              style={[
                styles.discountPrice,
                {
                  color: theme?.colors?.white,
                },
              ]}>
              Size = {item?.size}
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
            <Text
              style={[
                styles.discountPrice,
                {
                  color: theme?.colors?.white,
                },
              ]}>
              Qty = {item?.quantity}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {item?.product_id?.is_flash_deal == 'Active' ? (
              <Text
                style={[
                  styles.finalPriceText,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.colorPrimary,
                    marginTop: 5,
                  },
                ]}>
                {STRING.APP_CURRENCY}{' '}
                {parseInt(
                  parseInt(item?.product_id?.amount) *
                    parseInt(item?.quantity) -
                    fa,
                )}
                {/*{parseInt(item?.product_id?.amount) -*/}
                {/*  ((parseInt(item?.product_id?.amount) **/}
                {/*    parseInt(item?.product_id?.flash_offer_percentage)) /*/}
                {/*    100) **/}
                {/*    parseInt(item?.quantity)}*/}
              </Text>
            ) : (
              <Text
                style={[
                  styles.finalPriceText,
                  {
                    alignSelf: 'flex-start',
                    color: theme?.colors?.colorPrimary,
                    marginTop: 5,
                  },
                ]}>
                {STRING.APP_CURRENCY} {item?.amount}
              </Text>
            )}
            <View
              style={[
                GlobalStyle.flexRowAlignCenter,
                {
                  // marginHorizontal: 15,
                  alignSelf: 'center',
                  // flex: 1,
                  // width: '40%',
                  marginTop: 5,
                  backgroundColor: theme.colors.addtocart,

                  // backgroundColor: "#E5E8E8",
                  borderRadius: 20,
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  paddingVertical: 2,
                },
              ]}>
              <AntDesign
                name="minus"
                size={18}
                color={theme?.colors?.textColor}
                style={{
                  // backgroundColor: 'red',
                  padding: 3,
                }}
                onPress={() => {
                  onMinus();
                  // setCount(prev => (prev > 1 ? prev - 1 : prev));
                }}
              />
              <Text
                numberOfLines={1}
                style={[
                  styles.qtyText,
                  {
                    color: theme.colors.white,
                    paddingHorizontal: 10,
                  },
                ]}>
                {item?.quantity}
              </Text>
              <AntDesign
                name="plus"
                size={18}
                style={{
                  // backgroundColor: 'red',
                  padding: 3,
                }}
                color={theme?.colors?.textColor}
                onPress={() => {
                  onAdd();
                  // setCount(prev => prev + 1);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(CartItem);
const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
  },
  itemImage: {
    width: 100,
    height: 100,
    alignItems: 'center',
    borderRadius: 10,
  },
  qtyText: {
    fontFamily: FONTS?.regular,
    fontSize: 16,
    color: COLORS.black,
    textAlign: 'center',
  },
  image: {
    height: 90,
    width: '28%',
    // margin:6,
    marginTop: 5,
    resizeMode: 'stretch',
    borderRadius: 5,
  },
  innnerWrapper: {
    flex: 1,
    marginStart: 10,
    marginTop: 0,
  },
  textName: {
    fontFamily: FONTS?.semi_old,
    fontSize: 16,
    color: COLORS.black,
  },
  discountPrice: {
    // fontFamily: 'OpenSans-SemiBold',
    fontFamily: FONTS?.medium,

    fontSize: 13,
    color: COLORS.black,
  },
  finalPriceText: {
    fontFamily: FONTS?.bold,
    fontSize: 16,
    color: COLORS.colorPrimary,
    marginTop: 3,
  },
});
