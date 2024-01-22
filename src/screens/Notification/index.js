import {
  FlatList,
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import {SIZES, STRING} from '../../constants';

import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import {showProgressBar} from '../../redux/actions';
import {useIsFocused} from '@react-navigation/native';
import {getUserNotificationList} from '../../redux/actions/CartApi';
import SwipeDelete from './SwipeDelete';

const Notification = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [notificationList, setNotificationList] = useState([]);

  const dispatch = useDispatch();
  const loginCount = useSelector(state => state?.state?.count);
  const userToken = useSelector(state => state?.state?.userToken);

  const BannerErrorCallback = error => {
    ShowConsoleLogMessage('Banner call back called');
    dispatch(showProgressBar(false));
    // ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };
  const addressSuccessCallback = async data => {
    // ShowConsoleLogMessage(JSON.stringify(data?.response));
    dispatch(showProgressBar(false));
    setNotificationList(data?.data);
  };

  const addressErrorCallback = async data => {
    dispatch(showProgressBar(false));
    setNotificationList([]);
    // setTimeout(() => {
    //   ShowToastMessage(data?.message || 'Something went wrong.');
    // }, 100);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (loginCount == 1) {
      if (isFocused) {
        dispatch(showProgressBar(true));
        dispatch(() => {
          getUserNotificationList(
            dispatch,
            navigation,
            userToken,
            addressSuccessCallback,
            addressErrorCallback,
            BannerErrorCallback,
          );
        });
      }
    } else {
    }
  }, [isFocused]);

  const theme = useContext(themeContext);

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
          title={STRING.notifications}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
            marginStart: 20,
            fontFamily: FONTS?.bold,
          }}
        />
        {/*<MaterialCommunityIcons*/}
        {/*  name={'dots-horizontal-circle-outline'}*/}
        {/*  size={26}*/}
        {/*  // color={COLORS.colorPrimary}*/}
        {/*  style={{*/}
        {/*    marginEnd: 10,*/}
        {/*  }}*/}
        {/*  color={theme?.colors?.textColor}*/}
        {/*/>*/}
      </View>
      <FlatList
        data={notificationList}
        style={{
          flex: 1,
        }}
        keyExtractor={item => item?._id.toString()}
        renderItem={({item, index}) => {
          return (
            <SwipeDelete
              item={item}
              navigation={navigation}
              onDelete={() => {
                // onCatRemoveClick(item?.id);
              }}
            />
          );
        }}
        ListEmptyComponent={() => {
          return (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.headingtext,
                {
                  color: theme?.colors?.white,
                  flexGrow: 1,
                  textAlign: 'center',
                  alignSelf: 'center',
                  marginTop: SIZES.width / 2,
                  fontFamily: FONTS.regular,
                },
              ]}>
              No notifications found!
            </Text>
          );
        }}
      />

      {/*<FlatList*/}
      {/*  data={notificationList}*/}
      {/*  style={{*/}
      {/*    flex: 1,*/}
      {/*  }}*/}
      {/*  keyExtractor={item => item?._id?.toString()}*/}
      {/*  renderItem={({item}) => (*/}
      {/*    <View style={styles.notificationCategory}>*/}
      {/*      <Text*/}
      {/*        style={[*/}
      {/*          styles.categoryTitle,*/}
      {/*          {*/}
      {/*            color: theme?.colors?.textColor,*/}
      {/*          },*/}
      {/*        ]}>*/}
      {/*        {item.user_type}*/}
      {/*      </Text>*/}
      {/*    </View>*/}
      {/*  )}*/}
      {/*  ListEmptyComponent={() => {*/}
      {/*    return (*/}
      {/*      <Text*/}
      {/*        numberOfLines={1}*/}
      {/*        ellipsizeMode="tail"*/}
      {/*        style={[*/}
      {/*          styles.headingtext,*/}
      {/*          {*/}
      {/*            color: theme?.colors?.white,*/}
      {/*            flexGrow: 1,*/}
      {/*            textAlign: 'center',*/}
      {/*            alignSelf: 'center',*/}
      {/*            marginTop: SIZES.width / 2,*/}
      {/*            fontFamily: FONTS.regular,*/}
      {/*          },*/}
      {/*        ]}>*/}
      {/*        No notifications found!*/}
      {/*      </Text>*/}
      {/*    );*/}
      {/*  }}*/}
      {/*/>*/}
    </SafeAreaView>
  );
};

export default Notification;
const styles = StyleSheet.create({
  notificationCategory: {
    marginBottom: 0,
    marginTop: 10,
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 18,
    // color: COLORS?.black,
    fontFamily: FONTS?.medium,
  },
  headingtext: {
    fontFamily: FONTS?.bold,
    fontSize: 18,
    color: COLORS.black,
  },
  descText: {
    fontFamily: FONTS?.regular,
    fontSize: 15,
    marginTop: 3,
    color: COLORS.black,
  },
  notificationItem: {
    // backgroundColor:COLORS?.black,
    padding: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    elevation: 1,
  },
  wrapper: {
    elevation: 5,

    // backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 5,
    flexDirection: 'row',
  },
  imagestyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 5,
    marginLeft: 10,
  },
});
