import {
  FlatList,
  I18nManager,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {SIZES, STRING} from '../../constants';
import {FONTS} from '../../constants/Fonts';

import Feather from 'react-native-vector-icons/Feather';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GlobalStyle from '../../styles/GlobalStyle';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import themeContext from '../../constants/themeContext';
import {useRoute} from '@react-navigation/native';

const TrackListOld = ({navigation}) => {
  const theme = useContext(themeContext);
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const item = route.params?.item;
  console.log(item);

  const [step, setStep] = useState(1);
  const [deliveryStatus, setDeliveryStatus] = useState('Pending');
  const [packetInTruck, setPacketInTruck] = useState(false);

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setPacketInTruck(true);
      setStep(3);
    } else if (step === 3) {
      setDeliveryStatus('Delivered');
      setStep(4);
    }
  };

  const dotData = Array.from({length: 6}, (_, index) => ({key: `${index}`}));
  const data = [
    {
      order: 'Order In Transit - Dec 17',
      title: '32 Manchester Ave Ringgold GA 30736',
      time: '12:00 PM ',
    },
    {
      order: 'Order ..Customer Part - Dec 16',
      title: '32 Manchester Ave Ringgold GA 30736',
      time: '14:40 PM ',
    },
    {
      order: 'Order ...Shipped - Dec 15',
      title: '32 Manchester Ave Ringgold GA 30736',
      time: '11:00 PM ',
    },
    {
      order: 'Order Isin Packing  - Dec 15',
      title: '32 Manchester Ave Ringgold GA 30736',
      time: '10:20 PM ',
    },
    {
      order: 'Verified Payments  - Dec 15',
      title: '32 Manchester Ave Ringgold GA 30736',
      time: '12:00 PM ',
    },
  ];

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
          title="Track Order"
          // title={route?.params?.item?.name + ''}

          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
          }}
          textStyle={{
            color: theme.colors.textColor,
            fontSize: 20,
          }}
        />
        <AntDesign
          name={'search1'}
          size={26}
          // color={COLORS.colorPrimary}
          style={{
            marginEnd: 10,
          }}
          color={theme?.colors?.colorPrimary}
        />
        {/* <ToolBarIcon
           title={Ionicons}
           iconName={'person'}
           icSize={20}
           icColor={COLORS.colorPrimary}
           style={{
             backgroundColor: theme?.colors?.toolbar_icon_bg,
             marginEnd: 10,
           }}
           onPress={() => {
             navigation.navigate('Profile');
           }}
         /> */}
      </View>

      <View
        // activeOpacity={0.8}
        style={[
          styles.wrapperOrder,
          {
            // backgroundColor: '#F2F3F4',
            elevation: 2,

            backgroundColor: theme?.colors?.bg,
          },
        ]}>
        <View
          style={[
            GlobalStyle.flexRowAlignCenter,
            {
              paddingVertical: 5,
              alignItems: 'center',
            },
          ]}>
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
            <Image
              style={{
                width: 60,
                height: 60,

                alignSelf: 'center',
                margin: 8,
                // resizeMode:'contain',
                // borderRadius: 10,
                // marginTop: 30
              }}
              // style={styles.itemImage}
              source={{
                uri: item?.image,
              }}
            />
          </ImageBackground>
          <View style={styles.innnerWrapperOrder}>
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
                  },
                ]}
                numberOfLines={1}>
                {item?.name}
              </Text>
            </View>
            <View
              style={[
                {
                  flexWrap: 'wrap',
                  marginTop: 10,
                },
                GlobalStyle.flexRowAlignCenter,
              ]}>
              <View
                style={{
                  borderRadius: 20,
                  width: 15,
                  height: 15,
                  backgroundColor: theme?.colors?.gray,
                  marginEnd: 10,
                  marginTop: 5,
                  marginBottom: 5,
                }}
              />
              <Text
                style={[
                  styles.discountPrice,
                  {
                    color: theme?.colors?.white,
                    // color: theme?.colors?.,
                    marginRight: 5,
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
                Size = S
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
                Qty = 1
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles.finalPriceText,
                  {
                    // alignSelf: 'flex-start',
                    color: theme?.colors?.colorPrimary,
                    marginTop: 8,
                    fontWeight: 'bold',
                  },
                ]}>
                {STRING.APP_CURRENCY} 200.00
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
            alignSelf: 'center',
          }}>
          <View style={styles.container}>
            <MaterialIcons
              name="backpack"
              size={30}
              color={theme?.colors?.colorPrimary}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <ImageBackground
                style={{
                  backgroundColor: theme?.colors?.colorPrimary,
                  width: 23,
                  height: 23,
                  alignItems: 'center',
                  borderRadius: 50,
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color={theme?.colors?.btnTextColor}
                />
              </ImageBackground>
              <Text
                style={{
                  fontSize: 35,
                  textAlign: 'center',
                  marginBottom: 22,
                  color: theme?.colors?.grey,
                }}>
                ......
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.container,
              {
                // marginTop: 8
              },
            ]}>
            <Feather
              name="truck"
              size={30}
              color={theme?.colors?.colorPrimary}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <ImageBackground
                style={{
                  backgroundColor: theme?.colors?.colorPrimary,
                  width: 23,
                  height: 23,
                  alignItems: 'center',
                  borderRadius: 50,
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color={theme?.colors?.btnTextColor}
                />
              </ImageBackground>
              <Text
                style={{
                  fontSize: 35,
                  textAlign: 'center',
                  marginBottom: 22,
                  color: theme?.colors?.grey,
                }}>
                ......
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.container,
              {
                // marginTop: 8
              },
            ]}>
            <FontAwesome5
              name="people-carry"
              size={30}
              color={theme?.colors?.grey}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <ImageBackground
                style={{
                  backgroundColor: theme?.colors?.grey,
                  width: 23,
                  height: 23,
                  alignItems: 'center',
                  borderRadius: 50,
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color={theme?.colors?.btnTextColor}
                />
              </ImageBackground>
              <Text
                style={{
                  fontSize: 35,
                  textAlign: 'center',
                  marginBottom: 22,
                  color: theme?.colors?.grey,
                }}>
                ......
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.container,
              {
                // marginTop: 8
              },
            ]}>
            {/* <Image
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/2908/2908227.png'
                            }}
                            style={{
                                width: 30,
                                height: 30,

                                // marginBottom: 5
                            }}
                        /> */}
            <AntDesign
              name="CodeSandbox"
              size={30}
              color={theme?.colors?.grey}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <ImageBackground
                style={{
                  backgroundColor: theme?.colors?.grey,
                  width: 23,
                  height: 23,
                  alignItems: 'center',
                  borderRadius: 50,
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color={theme?.colors?.btnTextColor}
                />
              </ImageBackground>
              <Text
                style={{
                  fontSize: 35,
                  textAlign: 'center',
                  marginBottom: 22,
                }}
              />

              {/* <Text style={styles.dotsss}>· · · · ·</Text> */}
            </View>
          </View>
        </View>

        <Text
          style={[
            styles.textName,
            {
              color: theme?.colors?.white,
              textAlign: 'center',
              marginTop: 10,
            },
          ]}>
          Packet In Delivery
        </Text>
        <View
          style={[
            styles.divLine,
            {
              width: '90%',
              backgroundColor: theme?.colors?.grey,
            },
          ]}
        />

        <View>
          <Text
            style={[
              styles.textName,
              {
                color: theme?.colors?.white,
                marginTop: 10,
                fontSize: 20,
                marginLeft: 12,
              },
            ]}>
            Order Status Details
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              // alignItems: 'center',
              marginTop: 10,
              flex: 1,
            }}>
            <View
              style={{
                marginHorizontal: 10,
              }}>
              <View style={{}}>
                <View
                  style={{
                    borderRadius: 50,
                    width: 26,
                    height: 26,
                    borderWidth: 1,
                    borderColor: theme?.colors?.grey,
                    alignItems: 'center',
                    // alignSelf:'center',
                    justifyContent: 'center',
                    marginBottom: -15,
                    // marginTop:8
                  }}>
                  <View
                    style={{
                      borderRadius: 50,
                      width: 12,
                      height: 12,
                      alignItems: 'center',
                      backgroundColor: theme?.colors?.colorPrimary,
                    }}
                  />
                </View>
                <FlatList
                  data={dotData}
                  renderItem={({item}) => (
                    <Text
                      style={{
                        fontSize: 40,
                        marginVertical: -20,
                        marginTop: -24,
                        marginLeft: 8,
                        color: theme?.colors?.grey,
                      }}>
                      .
                    </Text>
                  )}
                  //   ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Adjust the width to control the distance between dots
                />
              </View>
              <View style={{}}>
                <View
                  style={{
                    borderRadius: 50,
                    width: 26,
                    height: 26,
                    borderWidth: 1,
                    borderColor: theme?.colors?.grey,
                    alignItems: 'center',
                    // alignSelf:'center',
                    justifyContent: 'center',
                    marginBottom: -15,
                  }}>
                  <View
                    style={{
                      borderRadius: 50,
                      width: 12,
                      height: 12,
                      alignItems: 'center',
                      backgroundColor: theme?.colors?.colorPrimary,
                    }}
                  />
                </View>
                <FlatList
                  data={dotData}
                  renderItem={({item}) => (
                    <Text
                      style={{
                        fontSize: 40,
                        marginVertical: -20,
                        marginTop: -24,
                        marginLeft: 8,
                        color: theme?.colors?.grey,
                      }}>
                      .
                    </Text>
                  )}
                  //   ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Adjust the width to control the distance between dots
                />
              </View>
              <View style={{}}>
                <View
                  style={{
                    borderRadius: 50,
                    width: 26,
                    height: 26,
                    borderWidth: 1,
                    borderColor: theme?.colors?.grey,
                    alignItems: 'center',
                    // alignSelf:'center',
                    justifyContent: 'center',
                    marginBottom: -15,
                  }}>
                  <View
                    style={{
                      borderRadius: 50,
                      width: 12,
                      height: 12,
                      alignItems: 'center',
                      backgroundColor: theme?.colors?.colorPrimary,
                    }}
                  />
                </View>
                <FlatList
                  data={dotData}
                  renderItem={({item}) => (
                    <Text
                      style={{
                        fontSize: 40,
                        marginVertical: -20,
                        marginTop: -24,
                        marginLeft: 8,
                        color: theme?.colors?.grey,
                      }}>
                      .
                    </Text>
                  )}
                  //   ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Adjust the width to control the distance between dots
                />
              </View>
              <View style={{}}>
                <View
                  style={{
                    borderRadius: 50,
                    width: 26,
                    height: 26,
                    borderWidth: 1,
                    borderColor: theme?.colors?.grey,
                    alignItems: 'center',
                    // alignSelf:'center',
                    justifyContent: 'center',
                    marginBottom: -15,
                  }}>
                  <View
                    style={{
                      borderRadius: 50,
                      width: 12,
                      height: 12,
                      alignItems: 'center',
                      backgroundColor: theme?.colors?.colorPrimary,
                    }}
                  />
                </View>
                <FlatList
                  data={dotData}
                  renderItem={({item}) => (
                    <Text
                      style={{
                        fontSize: 40,
                        marginVertical: -20,
                        marginTop: -24,
                        marginLeft: 8,
                        color: theme?.colors?.grey,
                      }}>
                      .
                    </Text>
                  )}
                  //   ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Adjust the width to control the distance between dots
                />
                <View
                  style={{
                    borderRadius: 50,
                    width: 26,
                    height: 26,
                    borderWidth: 1,
                    borderColor: theme?.colors?.grey,
                    alignItems: 'center',
                    // alignSelf:'center',
                    justifyContent: 'center',
                    // marginBottom:-15,
                    // marginTop:8
                  }}>
                  <View
                    style={{
                      borderRadius: 50,
                      width: 12,
                      height: 12,
                      alignItems: 'center',
                      backgroundColor: theme?.colors?.colorPrimary,
                    }}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 1,
              }}>
              <View>
                <View style={{}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',

                      // alignItems:'center'
                    }}>
                    <Text
                      style={[
                        styles?.order,
                        {
                          color: theme?.colors?.white,
                        },
                      ]}>
                      Order In Transit - Dec 17
                    </Text>
                    <Text
                      style={[
                        styles?.date,
                        {
                          color: theme?.colors?.white,
                        },
                      ]}>
                      12.00PM
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles?.title,
                      {
                        color: theme?.colors?.white,
                      },
                    ]}>
                    32 Manchester Ave Ringgold GA 30736
                  </Text>
                </View>
              </View>
              <View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 15,
                      // alignItems:'center'
                    }}>
                    <Text
                      style={[
                        styles?.order,
                        {
                          color: theme?.colors?.white,
                        },
                      ]}>
                      Order ..Cutoms Part - Dec 16
                    </Text>
                    <Text
                      style={[
                        styles?.date,
                        {
                          color: theme?.colors?.white,
                        },
                      ]}>
                      14.00PM
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles?.title,
                      {
                        color: theme?.colors?.white,
                      },
                    ]}>
                    4 Everygreen Street Lake Zunch60047
                  </Text>
                </View>
              </View>
              <View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 15,
                      // alignItems:'center'
                    }}>
                    <Text
                      style={[
                        styles?.order,
                        {
                          color: theme?.colors?.white,
                        },
                      ]}>
                      Order ..Shipped - Dec 15
                    </Text>
                    <Text
                      style={[
                        styles?.date,
                        {
                          color: theme?.colors?.white,
                        },
                      ]}>
                      01.30AM
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles?.title,
                      {
                        color: theme?.colors?.white,
                      },
                    ]}>
                    89 Glen Ridge St Ganesville WV 26003
                  </Text>
                </View>
              </View>
              <View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 15,
                      // alignItems:'center'
                    }}>
                    <Text
                      style={[
                        styles?.order,
                        {
                          color: theme?.colors?.white,
                        },
                      ]}>
                      Order In Packing - Dec 15
                    </Text>
                    <Text
                      style={[
                        styles?.date,
                        {
                          color: theme?.colors?.white,
                        },
                      ]}>
                      11.25PM
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles?.title,
                      {
                        color: theme?.colors?.white,
                      },
                    ]}>
                    89 GHillcreft Wheelinh WV 30736
                  </Text>
                </View>
              </View>
              <View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 15,
                      // alignItems:'center'
                    }}>
                    <Text
                      style={[
                        styles?.order,
                        {
                          color: theme?.colors?.white,
                        },
                      ]}>
                      Verified Payments - Dec 15
                    </Text>
                    <Text
                      style={[
                        styles?.date,
                        {
                          color: theme?.colors?.white,
                        },
                      ]}>
                      10.00PM
                    </Text>
                  </View>
                  <Text style={styles?.title}>
                    32 Manchester Ave Ringgold GA 30736
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrackListOld;

const styles = StyleSheet.create({
  order: {
    fontSize: 16,
    // fontWeight:'bold',
    color: COLORS?.black,
    fontFamily: FONTS?.regular,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    marginTop: 2,
    fontFamily: FONTS?.regular,
  },
  date: {
    fontSize: 14,
    fontFamily: FONTS?.regular,

    marginEnd: 5,
    marginTop: 3,
    // marginLeft:20
  },
  wrapper: {
    padding: 15,
    borderRadius: 3,
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    // marginVertical: 20,
    borderRadius: 12,
    // paddingBottom: 60

    // paddingVertical:5
  },
  container: {
    // flexDirection:'row',
    // alignItems: 'center',
    // padding: 8,
    // marginHorizontal: 0,
  },
  packetIcon: {
    width: 40,
    height: 40,
    backgroundColor: COLORS?.black,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  rightArrow: {
    width: 10, // Width of the right arrow
    height: 10, // Height of the right arrow
    borderRightWidth: 2, // Width of the right arrow line
    borderBottomWidth: 2, // Height of the right arrow line
    transform: [{rotate: '45deg'}], // To rotate it to form a right arrow
    borderColor: 'white', // Color of the right arrow
  },
  dots: {
    color: COLORS?.black,
    fontSize: 30, // Font size of the dots
    alignItems: 'center',
  },
  dotsss: {
    color: COLORS?.grey,
    fontSize: 30, // Font size of the dots
    alignItems: 'center',
  },
  amountwrapper: {
    padding: 15,
    borderRadius: 3,
    backgroundColor: COLORS.white,
    marginHorizontal: 18,
    // marginVertical: 20,
    borderRadius: 12,
    marginBottom: 30,
    // paddingBottom: 60

    // paddingVertical:5
  },
  month: {
    fontSize: 22,
    // fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  monthTitle: {
    fontSize: 14,
    // fontFamily: FONTS.regular,
    color: COLORS.grey,
    marginBottom: 2.5,
  },
  wrapperOrder: {
    padding: 8,
    borderRadius: 3,
    // margin: 2,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginVertical: 20,
    elevation: 10,
    borderRadius: 12,
    // paddingVertical:5
  },
  itemImage: {
    width: '30%',
    height: 100,
    borderRadius: 20,

    // resizeMode: 'center',
    // alignItems: 'center',
    // resizeMode: 'stretch',
    // marginBottom: 10
  },
  divLine: {
    height: 1,
    alignSelf: 'center',
    marginVertical: 5,
    marginTop: 20,
  },
  textlable: {
    fontSize: 16,
    color: COLORS?.black,
  },
  amounttext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS?.black,
  },
  modalBackground: {
    flex: 1,
    // alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    // borderRadius: 15,
    width: SIZES.width,

    display: 'flex',
    flexDirection: 'column',
    // paddingVertical: 8,
  },
  qtyText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
    flex: 0.3,
  },
  originalPrice: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 11,
    textDecorationLine: 'line-through',
    color: COLORS.black,
    marginStart: 8,

    textDecorationColor: COLORS.black,
  },
  deleteSaveText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 14,
    color: COLORS.red,
    textAlign: 'center',
    flex: 1,
    marginTop: 5,
  },
  image: {
    height: 90,
    width: '28%',
    // margin:6,
    marginTop: 5,
    resizeMode: 'stretch',
    borderRadius: 5,
    // paddingTop:10
    // resizeMode:'contain',
  },
  innnerWrapper: {
    flex: 1,
    marginStart: 10,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innnerWrapperOrder: {
    flex: 1,
    marginStart: 10,
    marginTop: 0,
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  textName: {
    fontFamily: FONTS?.bold,
    fontSize: 16,
    color: COLORS.black,
  },
  discountPrice: {
    // fontFamily: 'OpenSans-SemiBold',
    fontFamily: FONTS?.regular,

    fontSize: 13,
    color: COLORS.black,
  },
  // qtyText: {
  //   fontFamily: 'OpenSans-Regular',
  //   fontSize: 13,
  //   color: COLORS.black,
  // },
  finalPriceText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 17,
    color: COLORS.colorPrimary,
    marginTop: 3,
  },
  createProfile: {
    fontSize: 16,
    // fontFamily: FONTS.regular,
    color: COLORS.grey,
    lineHeight: 24,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    color: COLORS.black,
    // fontFamily: FONTS.semi_bold,
  },
});
