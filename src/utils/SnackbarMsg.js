import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../constants/Fonts';
import {useSelector} from 'react-redux';
import {ShowConsoleLogMessage} from './Utility';

const SnackbarMsg = () => {
  const [animation] = useState(new Animated.Value(0));

  const show = useSelector(state => state?.state?.showSnack);
  const message = useSelector(state => state?.state?.snackMessage);
  ShowConsoleLogMessage(show);
  useEffect(() => {
    (async function () {
      if (show === true) {
        // Slide in animation
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();

        // Slide out animation after 3 seconds
        setTimeout(() => {
          Animated.timing(animation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 5000);
      }
    })();
  }, [show]);

  const translateAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {transform: [{translateY: translateAnimation}]},
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Text style={styles.title} numberOfLines={2}>
            {message}dasd
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    // left: 0,
    // right: 0,
    // bottom: 0,
    // backgroundColor: '#222222',
    backgroundColor: '#ff4440',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: FONTS.medium,
    fontFamily: FONTS.medium,
    color: '#fff',
  },
});

export default SnackbarMsg;
