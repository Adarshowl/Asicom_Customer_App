import React, {useContext} from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import {FONTS, SIZES} from '../constants/themes';
import {useSelector} from 'react-redux';
import themeContext from '../constants/themeContext';

const VegUrbanProgressBar = () => {
  const loading = useSelector(state => state?.state?.loading);
  const theme = useContext(themeContext);

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View
          style={[
            styles.activityIndicatorWrapper,
            {
              backgroundColor: theme?.colors?.bg,
            },
          ]}>
          <ActivityIndicator
            animating={true}
            color={theme?.colors?.colorPrimary}
            size="large"
            style={styles.activityIndicator}
          />
          <Text
            style={[
              FONTS.body3,
              {
                flex: 1,
                marginStart: 20,
                color: theme?.colors?.white,
              },
            ]}>
            {/*{STRING.loading}*/}
            Please wait...
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default VegUrbanProgressBar;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    width: SIZES.width - 60,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 75,
  },
});
