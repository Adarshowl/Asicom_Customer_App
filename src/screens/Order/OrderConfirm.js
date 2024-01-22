import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import {COLORS} from '../../constants/Colors';
import {STRING} from '../../constants';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';
import Lottie from 'lottie-react-native';
import themeContext from '../../constants/themeContext';

const OrderConfirm = ({navigation}) => {
  const theme = useContext(themeContext);
  return (
    <View
      style={[
        GlobalStyle.mainContainerBgColor,
        GlobalStyle.alignJustifyCenter,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      {/*<Ionicons*/}
      {/*  name="checkmark-circle"*/}
      {/*  size={130}*/}
      {/*  color={COLORS.colorPrimary}*/}
      {/*/>*/}
      <Lottie
        source={require('../../assets/animation/successful_order.json')}
        autoPlay
        loop={false}
        style={{
          height: 200,
        }}
      />
      <Text
        style={[
          styles.order_placed,
          {
            color: theme?.colors?.textColor,
          },
        ]}>
        {STRING.order_placed1}
      </Text>
      <Text
        style={[
          styles.success_order,
          {
            color: theme?.colors?.textColor,
            marginBottom: 30,
          },
        ]}>
        {STRING.success_order}
      </Text>

      <VegUrbanCommonBtn
        height={40}
        width={'60%'}
        borderRadius={30}
        textSize={16}
        text={STRING.continue_shopping}
        textColor={theme?.colors?.text}
        backgroundColor={theme?.colors?.bg}
        marginTop={20}
        onPress={() => {
          navigation.replace('MainContainer', {
            params: {
              screen: 'Home',
            },
          });
        }}
        textStyle={{
          fontFamily: 'OpenSans-Regular',
          // fontWeight:'bold'
        }}
      />

      <VegUrbanCommonBtn
        height={40}
        width={'60%'}
        borderRadius={30}
        textSize={16}
        marginTop={20}
        text={STRING.summary}
        // textColor={theme?.colors?.textColor}
        textColor={theme?.colors?.text}
        backgroundColor={theme?.colors?.colorPrimary}
        onPress={() => {
          navigation.replace('TrackOrder');
        }}
        textStyle={{
          fontFamily: 'OpenSans-Regular',
          // fontWeight:'bold'
        }}
      />
    </View>
  );
};
export default OrderConfirm;

const styles = StyleSheet.create({
  order_placed: {
    color: COLORS.black,
    fontSize: 22,
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    marginTop: 10,
  },
  success_order: {
    color: COLORS.grey,
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    marginTop: 10,
  },
});
