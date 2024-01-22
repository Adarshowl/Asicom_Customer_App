import React, {useContext, useEffect, useState} from 'react';
import {
  I18nManager,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import themeContext from '../../constants/themeContext';
import {updateNotificationById} from '../../redux/actions/CartApi';
import {useDispatch, useSelector} from 'react-redux';
import icons from '../../constants/icons';

const NotificationDetails = ({navigation, route}) => {
  const [data, setData] = useState({});
  const theme = useContext(themeContext);

  const dispatch = useDispatch();
  const userToken = useSelector(state => state?.state?.userToken);

  useEffect(() => {
    let {item} = route?.params;
    setData(item);
    update(item?._id);
  }, []);

  const update = id => {
    dispatch(() => {
      updateNotificationById(
        dispatch,
        navigation,
        userToken,
        id,
        () => {},
        () => {},
        () => {},
      );
    });
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
        <Ionicons
          name="ios-arrow-back"
          // color={COLORS.black}
          color={theme.colors.textColor}
          size={25}
          style={[
            styles.backIcon,
            {
              // opacity: !show ? 1 : 0.0,
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              marginStart: 10,
            },
          ]}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <VegUrbanCommonToolBar
          title={'Notification Details'}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
            marginStart: 20,
            fontFamily: FONTS?.bold,
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View
          style={{
            backgroundColor: theme?.colors?.bg_color,

            margin: 15,
            borderRadius: 10,
            elevation: 10,
          }}>
          <View activeOpacity={0.9} style={styles.item}>
            {/*<Ionicons*/}
            {/*  name={'notifications'}*/}
            {/*  style={{*/}
            {/*    padding: 15,*/}
            {/*    borderRadius: 50,*/}
            {/*    backgroundColor: COLORS.black,*/}
            {/*    alignSelf: 'flex-start',*/}
            {/*  }}*/}
            {/*  size={25}*/}
            {/*  color={COLORS.white}*/}
            {/*/>*/}
            <Image
              source={icons.notification}
              style={{
                height: 40,
                tintColor: theme?.colors?.white,
                width: 40,
                margin: 10,
              }}
            />
            <View
              style={{
                marginStart: 10,
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  styles.title,
                  {
                    color: theme?.colors?.white,
                  },
                ]}>
                {data?.module}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 0.5,
              backgroundColor: COLORS.light_gray,
              width: '100%',
              marginBottom: 10,
            }}
          />

          {data?.noti_image ? (
            <Image
              source={{uri: data?.noti_image}}
              style={{
                height: 300,
                width: '95%',
                alignSelf: 'center',
                resizeMode: 'contain',
                marginVertical: 15,
              }}
            />
          ) : null}

          {data?.message ? (
            <Text
              style={[
                styles.details,
                {
                  color: theme?.colors?.white,
                },
              ]}>
              {data?.message}
            </Text>
          ) : null}
          <Text
            style={[
              styles.desc,
              {
                position: 'absolute',
                right: 8,
                top: 2,
                fontSize: 9,

                color: theme?.colors?.white,
              },
            ]}
            numberOfLines={2}>
            {moment(data?.created_at).format('LLL')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default NotificationDetails;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  createProfile: {
    fontSize: 18,
    fontFamily: FONTS.medium,
    color: COLORS.white,
    lineHeight: 24,
  },

  item: {
    padding: 10,
    flexDirection: 'row',
  },
  title: {
    fontSize: 15,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  desc: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.grey,
  },
  details: {
    fontSize: 15,
    fontFamily: FONTS.regular,
    color: COLORS.grey,
    marginHorizontal: 10,
    paddingBottom: 10,
  },
});
