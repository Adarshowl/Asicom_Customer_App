import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import {SIZES, STRING} from '../../constants';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import {ShowToastMessage} from '../../utils/Utility';
import themeContext from '../../constants/themeContext';

const Offers = ({navigation}) => {
  const theme = useContext(themeContext);
  const onFavClick = idx => {
    let a = favData.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        temp.fav = !temp.fav;
      }
      // ShowToastMessage('HI CLIXK' + temp.fav);

      return temp;
    });

    setFavData(a);
  };

  const [favData, setFavData] = useState([
    {
      title: '1st order',
      dis: '50',
      above: `on order above ${STRING.APP_CURRENCY}340`,
      code: '45FS#5',
    },
    {
      title: '2nd order',
      dis: '30',
      above: `on order above ${STRING.APP_CURRENCY}150`,
      code: '20GD#5',
    },
    {
      title: '3rd order',
      dis: '20',
      above: `on order above ${STRING.APP_CURRENCY}120`,
      code: '1354GF',
    },
    {
      title: 'New order',
      dis: '10',
      above: `on order above ${STRING.APP_CURRENCY}125`,
      code: 'FFF455',
    },

    {
      title: '1st order',
      dis: '50',
      above: `on order above ${STRING.APP_CURRENCY}340`,
      code: '45FS#5',
    },
    {
      title: '2nd order',
      dis: '30',
      above: `on order above ${STRING.APP_CURRENCY}150`,
      code: '20GD#5',
    },
    {
      title: '3rd order',
      dis: '20',
      above: `on order above ${STRING.APP_CURRENCY}120`,
      code: '1354GF',
    },
    {
      title: 'New order',
      dis: '10',
      above: `on order above ${STRING.APP_CURRENCY}125`,
      code: 'FFF455',
    },

    {
      title: '1st order',
      dis: '50',
      above: `on order above ${STRING.APP_CURRENCY}340`,
      code: '45FS#5',
    },
    {
      title: '2nd order',
      dis: '30',
      above: `on order above ${STRING.APP_CURRENCY}150`,
      code: '20GD#5',
    },
    {
      title: '3rd order',
      dis: '20',
      above: `on order above ${STRING.APP_CURRENCY}120`,
      code: '1354GF',
    },
    {
      title: 'New order',
      dis: '10',
      above: `on order above ${STRING.APP_CURRENCY}125`,
      code: 'FFF455',
    },
  ]);

  const [show, setShow] = useState(false);
  const [showAfter, setShowAfter] = useState({});
  const [text, setText] = useState('Copy Code');

  const closeSignUpModal = () => {
    setShow(!show);
    setText('Copy Code');
  };

  const renderOfferModal = () => {
    return (
      <Modal
        visible={show}
        animationType="slide"
        style={{flexGrow: 1}}
        transparent={true}
        onRequestClose={() => {
          closeSignUpModal();
        }}>
        <View
          style={[
            GlobalStyle.signupModalBg,
            {
              backgroundColor: '#00000090',
            },
          ]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            style={GlobalStyle.signupModalBgTrans}></TouchableOpacity>
          <View
            style={[
              GlobalStyle.loginModalBg,
              {
                paddingHorizontal: 0,
                maxHeight: SIZES.height * 0.7,
                padding: 0,
              },
            ]}>
            <View
              style={{
                height: 170,
                width: '100%',
                backgroundColor: COLORS.colorPrimary,
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                padding: 20,
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontFamily: 'OpenSans-Bold',
                  color: COLORS.white,
                }}>
                Flat {showAfter?.dis}% OFF
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'OpenSans-Medium',
                  color: COLORS.white,
                }}>
                {showAfter?.above}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 15,
                  borderRadius: 5,
                  marginTop: 20,
                  paddingHorizontal: 10,
                  backgroundColor: '#00000040',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'OpenSans-Medium',
                    color: COLORS.white,
                  }}>
                  Code: {showAfter?.code}
                </Text>
                <Text
                  onPress={() => {
                    setText('Copied');
                    ShowToastMessage('Copied Successful');
                    closeSignUpModal();
                  }}
                  style={{
                    fontSize: 16,
                    fontFamily: 'OpenSans-Medium',
                    color: COLORS.colorPrimary,
                    backgroundColor: COLORS.white,
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 25,
                  }}>
                  {text}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: 16,
                fontFamily: 'OpenSans-Medium',
                color: COLORS.grey,
                marginStart: 20,
                marginTop: 20,
              }}>
              {STRING.terms_conditions}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'OpenSans-Medium',
                color: COLORS.grey,
                marginStart: 20,
                marginEnd: 10,
                marginTop: 20,
              }}>
              1.In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before final copy is available.
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'OpenSans-Medium',
                color: COLORS.grey,
                marginStart: 20,
                marginEnd: 10,
                marginTop: 10,
              }}>
              2.In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content.
            </Text>
          </View>
        </View>
      </Modal>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.itemWrapper}
          activeOpacity={0.8}
          onPress={() => {
            setShowAfter(item);
            closeSignUpModal();
          }}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'OpenSans-Bold',
              color: COLORS.colorPrimary,
            }}>
            {item?.dis}
          </Text>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'OpenSans-Medium',
                color: COLORS.colorPrimary,
              }}>
              %
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'OpenSans-Medium',
                color: COLORS.colorPrimary,
              }}>
              OFF
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'OpenSans-Bold',
                color: COLORS.black,
              }}>
              {item?.title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'OpenSans-Regular',
                color: COLORS.grey,
              }}>
              {item?.above}
            </Text>
          </View>
          <View
            style={{
              marginStart: 'auto',
              marginEnd: 'auto',
            }}>
            <View style={styles.lineHeight} />
            <View style={styles.lineHeight} />
            <View style={styles.lineHeight} />
            <View style={styles.lineHeight} />
          </View>
          <View
            style={{
              marginStart: 'auto',
              marginEnd: 3,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'OpenSans-Regular',
                color: COLORS.black,
              }}>
              Use Code:
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'OpenSans-Medium',
                color: COLORS.white,
                backgroundColor: COLORS.colorPrimary,
                textAlign: 'center',
                textAlignVertical: 'center',
                borderRadius: 50,
                marginTop: 5,
                paddingHorizontal: 10,
              }}>
              {item?.code}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 15,
            backgroundColor: theme?.colors?.bg_color,

            position: 'absolute',
            top: 18,
            left: 5,
          }}></View>
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 15,
            backgroundColor: theme?.colors?.bg_color,

            position: 'absolute',
            top: 36,
            left: 5,
          }}></View>

        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 15,
            backgroundColor: theme?.colors?.bg_color,

            position: 'absolute',
            top: 54,
            left: 5,
          }}></View>

        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 15,
            backgroundColor: theme?.colors?.bg_color,

            position: 'absolute',
            top: 18,
            right: 5,
          }}></View>
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 15,
            backgroundColor: theme?.colors?.bg_color,

            position: 'absolute',
            top: 36,
            right: 5,
          }}></View>

        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 15,
            backgroundColor: theme?.colors?.bg_color,

            position: 'absolute',
            top: 54,
            right: 5,
          }}></View>

        <View
          style={{
            height: 15,
            width: 15,
            borderRadius: 15,
            backgroundColor: theme?.colors?.bg_color,

            position: 'absolute',
            right: 107,
            top: 2.5,
          }}></View>
        <View
          style={{
            height: 15,
            width: 15,
            borderRadius: 15,
            backgroundColor: theme?.colors?.bg_color,
            position: 'absolute',
            right: 107,
            bottom: 2.5,
          }}></View>
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
            backgroundColor: theme?.colors?.bg_color_onBoard,
          },
        ]}>
        <ToolBarIcon
          title={Ionicons}
          iconName={'chevron-back'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            marginEnd: 10,
            backgroundColor: theme?.colors?.toolbar_icon_bg,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar
          title={STRING.offers}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
          }}
        />
      </View>

      <FlatList
        style={{
          paddingStart: 5,
          paddingEnd: 5,
        }}
        ListHeaderComponent={() => {
          return <View style={{}} />;
        }}
        ListHeaderComponentStyle={{
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
        data={favData}
        // renderItem={({item, index}) => (
        //   <FavoriteProductItem
        //     item={item}
        //     onFavClick={() => onFavClick(index)}
        //   />
        // )}
        renderItem={renderItem}
      />
      {renderOfferModal()}
    </SafeAreaView>
  );
};

export default Offers;

const styles = StyleSheet.create({
  no_wish: {
    marginHorizontal: 15,
    marginTop: 20,
    fontFamily: 'OpenSans-Bold',
    color: COLORS.gray,
    fontSize: 18,
  },
  no_wish_item: {
    marginHorizontal: 15,
    marginTop: 15,
    fontFamily: 'OpenSans-Medium',
    color: COLORS.gray,
    fontSize: 16,
  },
  lineHeight: {
    width: 1,
    height: 5,
    backgroundColor: COLORS.colorPrimary,
    margin: 3,
  },
  itemWrapper: {
    flex: 1,
    margin: 10,
    padding: 10,
    // backgroundColor: COLORS.color1,
    backgroundColor: COLORS.color1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: 120,
    borderRadius: 5,
    resizeMode: 'center',
  },
  itemName: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 13,
    color: COLORS.black,
    marginTop: 5,
  },
  itemPrice: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 13,
    color: COLORS.black,
  },
  itemOriPrice: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.gray,
    marginStart: 5,
  },
  offerText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 11,
    color: COLORS.bitter_sweet,
    backgroundColor: COLORS.pale_pink,
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 3,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});
