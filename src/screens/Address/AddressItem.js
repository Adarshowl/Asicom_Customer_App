import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useContext} from 'react';
import {COLORS} from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';

const AddressItem = ({item, show, onSelect}) => {
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.wrapper,
        {
          backgroundColor: theme.colors.bg_color,
        },
      ]}
      onPress={onSelect}>
      <MaterialCommunityIcons
        // name={'circle-outline'}
        name={item?.selected ? 'circle-slice-8' : 'circle-outline'}
        size={25}
        color={theme.colors.colorPrimary}
        onPress={onSelect}
      />
      <View style={styles.innerWrapper}>
        <View style={[GlobalStyle.flexRowAlignCenter, styles.innerWrapper]}>
          <Text
            style={[
              styles.textName,
              {
                color: theme.colors.colorPrimary,
              },
            ]}
            numberOfLines={2}>
            {item?.name}
          </Text>
          <View
            style={{
              justifyContent: 'flex-end',
              flexDirection: 'row',
              flex: 1,
            }}>
            <Text
              style={[
                styles.homeDefText,
                {
                  backgroundColor: theme.colors.colorPrimary,
                },
              ]}
              numberOfLines={2}>
              {item?.type}
            </Text>
            {item?.def ? (
              <Text
                style={[
                  styles.homeDefText,
                  {
                    marginStart: 10,
                    backgroundColor: theme.colors.colorPrimary,
                  },
                ]}
                numberOfLines={2}>
                Default
              </Text>
            ) : null}
            <MaterialIcons
              name={'edit'}
              color={theme?.colors?.grey}
              size={20}
              style={{
                // marginHorizontal: 5,
                marginStart: 5,
              }}
            />
            <MaterialIcons
              name={'delete'}
              color={theme?.colors?.grey}
              size={20}
              style={{
                marginHorizontal: 10,
              }}
            />
          </View>
        </View>
        <View
          style={[
            {
              paddingTop: 5,
              marginStart: 5,
            },
            GlobalStyle.flexRowAlignCenter,
          ]}>
          <Text
            style={[
              styles.addressText,
              {
                color: theme.colors.white,
              },
            ]}>
            {item?.address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(AddressItem);

const styles = StyleSheet.create({
  imageStyle: {
    // height: 120,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
    resizeMode: 'center',
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
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
  innerWrapper: {
    flex: 1,
  },
  textName: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 15,
    color: COLORS.colorPrimary,
    marginStart: 5,
    flexWrap: 'wrap',
    // flexGrow: 1,
    maxWidth: 180,
  },
  homeDefText: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 12,
    color: COLORS.white,
    backgroundColor: COLORS.colorPrimary,
    marginStart: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    textAlignVertical: 'center',
  },
  addressText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: COLORS.black,
  },
});
