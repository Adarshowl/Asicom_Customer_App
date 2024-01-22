import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {memo, useContext} from 'react';
import {COLORS} from '../../constants/Colors';
import themeContext from '../../constants/themeContext';

const NotificationItem = ({item, show}) => {
  const theme = useContext(themeContext);
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.wrapper,
        {
          backgroundColor: theme?.colors?.bg_color,
        },
      ]}
      onPress={() => {}}>
      {show ? (
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/7225580/pexels-photo-7225580.jpeg?auto=compress&cs=tinysrgb&w=600',
          }}
          style={styles.image}
        />
      ) : null}
      <Text
        style={[
          styles.headingtext,
          {
            marginTop: show ? 5 : 0,
            color: theme?.colors?.white,
          },
        ]}>
        Morning 9 am to 12 pm
      </Text>
      <Text style={styles.descText}>Morning</Text>
    </TouchableOpacity>
  );
};

export default memo(NotificationItem);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  text: {
    maxHeight: 35,
    minHeight: 35,
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'OpenSans-Bold',
    color: COLORS.black,
    backgroundColor: COLORS.search_bg_grey,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  image: {
    flex: 1,
    height: 250,
  },
  headingtext: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: COLORS.black,
  },
  descText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: COLORS.grey,
  },
});
