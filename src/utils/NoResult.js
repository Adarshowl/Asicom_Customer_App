import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import GlobalStyle from '../styles/GlobalStyle';
import BunchDealCommonBtn from './BunchDealCommonBtn';
import {images, STRING} from '../constants';
import {COLORS} from '../constants/Colors';
import {FONTS} from '../constants/themes';

const NoResult = ({onReloadBtn}) => {
  return (
    <View
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          alignItems: 'center',
          backgroundColor: '#e6e6e6',
          // backgroundColor: 'red',
        },
      ]}>
      <Text
        style={{
          fontSize: 22,
          fontFamily: 'OpenSans-Regular',
          marginTop: 60,
          color: '#666666',
        }}>
        No Feed, yet
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'OpenSans-Regular',
          marginTop: 10,
          color: '#999999',
        }}>
        Try a refresh the page
      </Text>

      <BunchDealCommonBtn
        text={'RELOAD'}
        backgroundColor={COLORS.colorAccent}
        width={200}
        height={40}
        borderRadius={30}
        marginTop={40}
        textStyle={FONTS.body3}
        onPress={onReloadBtn}
        textColor={COLORS.white}
      />
      <Image
        source={images.bg_no_item_cactus}
        style={{
          flex: 1,
          width: '100%',
          height: '50%',
          marginTop: 25,
        }}
      />
    </View>
  );
};

export default NoResult;

const styles = StyleSheet.create({});
