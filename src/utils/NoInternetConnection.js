import React from 'react';
import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import {icons, SIZES, STRING} from '../constants';
import {COLORS} from '../constants/Colors';
import {FONTS} from '../constants/themes';
import BunchDealCommonBtn from './BunchDealCommonBtn';

const NoInternetConnection = props => {
  return (
    <Modal
      visible={props?.show}
      animationType="slide"
      transparent={true}
      statusBarTranslucent
      onRequestClose={() => closePropertyList()}
      style={{flexGrow: 1}}>
      <View style={styles.wrapper}>
        <Image source={icons.no_internet_found} style={styles.image} />
        <Text style={[FONTS.body2, styles.text]}>{STRING.whoops}</Text>
        <Text style={[FONTS.body4, styles.data]}>
          {STRING.network_not_available}
        </Text>

        <BunchDealCommonBtn
          text={STRING.retry}
          backgroundColor={COLORS.colorPrimary}
          width={200}
          height={50}
          borderRadius={30}
          marginTop={40}
          textStyle={FONTS.body3}
          onPress={() => {}}
          textColor={COLORS.white}
        />
      </View>
    </Modal>
  );
};

export default NoInternetConnection;

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    resizeMode: 'cover',
  },
  text: {
    color: COLORS.colorPrimary,
    marginTop: 5,
    fontSize: 20,
  },
  data: {
    color: COLORS.editTextBorder,
    marginTop: 15,
    fontSize: 16,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.height,
    width: SIZES.width,
    // backgroundColor: 'blue',
  },
});
