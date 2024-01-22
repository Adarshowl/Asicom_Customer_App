import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity ,View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../constants/Colors';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';


const VegUrbanCommonBtn = ({
  height,
  width,
  borderRadius,
  textSize,
  textColor,
  text,
  marginTop,
  backgroundColor,
  image,
  onPress,
  iconPosition,
  icon,  paddingHorizontal,
  marginHorizontal,
  textStyle,
}) => {


  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };


  return (
    // <LinearGradient
    //   colors={[COLORS.red, COLORS.colorAccent]}
    //   start={{x: 0, y: 0}}
    //   end={{x: 1, y: 1}}
    //   activeOpacity={0.6}
    //   style={{
    // width: width,
    // height: height,
    // borderRadius: borderRadius,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: marginTop || 0,
    // marginStart: marginStart,
    // flexDirection: 'row',
    // borderWidth: borderWidth || 0,
    // borderColor: borderColor,
    // paddingHorizontal: 10,
    //   }}>
    <TouchableOpacity
      activeOpacity={0.2}
      onPress={() => {
        onPress();
      }}
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: marginTop || 0,
        // flexDirection: 'row',
        backgroundColor: backgroundColor,
        paddingHorizontal: paddingHorizontal,
        marginHorizontal: marginHorizontal,

        // borderColor: getBorderColor(),
        flexDirection: getFlexDirection(),

      }}>
      {/* {image && (
        <Image
          source={image}
          style={{
            width: 25,
            height: 25,
            marginHorizontal: 10,
            alignSelf: 'center',
          }}
        />
      )} */}
      <View>{icon && icon}</View>

      <Text
        style={[
          textStyle,
          {
            color: textColor,
            fontSize: textSize || 16,
            // marginStart: -10,
          },
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
    // </LinearGradient>
  );
};

export default VegUrbanCommonBtn;

const styles = StyleSheet.create({});
