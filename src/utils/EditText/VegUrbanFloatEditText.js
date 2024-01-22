import React, {useContext} from 'react';
import {Animated, StyleSheet, TextInput, View} from 'react-native';
import {COLORS} from '../../constants/Colors';
import styles from './styles';
import themeContext from '../../constants/themeContext';

const VegUrbanFloatEditText = ({
  onChangeText,
  iconPosition,
  icon,
  style,
  value,
  label,
  error,
  star,
  keyBoardType,
  maxLength,
  showPass,
  boxWidth,
  ...props
}) => {
  const theme = useContext(themeContext);

  const [focused, setFocused] = React.useState(false);
  const [position, setPosition] = React.useState(
    new Animated.Value(value ? 1 : 0),
  );

  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };

  const getBorderColor = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused) {
      return theme.colors?.colorPrimary;
    } else {
      return theme.colors?.gray;
    }
  };

  const getBgColor = () => {
    if (error) {
      return COLORS.white;
    }

    if (focused) {
      return theme.colors?.bg_color_onBoard;
    } else {
      return theme.colors?.bg_color_onBoard;
    }
  };

  const returnAnimatedTitleStyles = () => {
    return {
      top: position.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 0],
      }),
      fontSize: focused ? 11.5 : value ? 11.5 : 16,
      color: focused
        ? theme.colors?.colorPrimary
        : value
        ? theme.colors?.white
        : theme.colors?.gray,
      fontFamily: 'OpenSans-SemiBold',
    };
  };

  return (
    <View
      style={[
        {backgroundColor: getBgColor()},
        {borderColor: getBorderColor()},
        {
          width: boxWidth || '97%',
          height: 55,
          marginVertical: 5,
          alignSelf: 'center',
          borderBottomWidth: 1.5,
        },
      ]}>
      <Animated.Text
        style={[
          Styles.titleStyles,
          returnAnimatedTitleStyles(),
          {
            left: iconPosition == 'left' ? 31 : 3,
          },
        ]}>
        {label}
      </Animated.Text>
      <View
        style={[
          styles.wrapper,
          {
            alignItems: icon ? 'center' : 'baseline',
            // alignItems:'center',
            flexDirection: getFlexDirection(),
          },
        ]}>
        <View>
          {icon ? (
            <View
              style={{
                width: 28,
                alignItems: 'center',
                justifyContent: 'center',
                marginStart: -3,
              }}>
              {icon}
            </View>
          ) : null}
        </View>
        <TextInput
          style={[
            styles.textInput,
            style,
            {
              color: theme.colors?.white,
            },
          ]}
          onChangeText={onChangeText}
          secureTextEntry={showPass}
          value={value}
          keyboardType={keyBoardType}
          maxLength={maxLength}
          onFocus={() => {
            setFocused(true);
            Animated.timing(position, {
              toValue: 1,
              duration: 150,
              useNativeDriver: false, // Add This line
            }).start();
          }}
          onBlur={() => {
            setFocused(false);
            if (!value) {
              Animated.timing(position, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false, // Add This line
              }).start();
            }
          }}
          {...props}
        />
      </View>
    </View>
  );
};

export default React.memo(VegUrbanFloatEditText);
const Styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 0.5,
    height: 60,
    marginVertical: 4,
  },
  textInput: {
    fontSize: 15,
    marginTop: 5,
    fontFamily: 'OpenSans-Medium',
    color: 'black',
  },
  titleStyles: {
    position: 'absolute',
    fontFamily: 'OpenSans-SemiBold',

    marginStart: 5,
    marginTop: 5,
    fontSize: 16,
    color: COLORS.gray,
  },
});
