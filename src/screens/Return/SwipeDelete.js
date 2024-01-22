import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import icons from '../../constants/icons';
import moment from 'moment';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/Fonts';
import themeContext from '../../constants/themeContext';

const SwipeDelete = ({item, navigation, onDelete}) => {
  const theme = useContext(themeContext);

  const renderRightActions = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.deleteButton}
      onPress={() => {
        onDelete();
      }}>
      {/*<MaterialCommunityIcons name={'delete'} color={COLORS.white} size={25} />*/}
      <Image
        source={icons.delete_icon}
        resizeMode={'cover'}
        style={{
          height: 25,
          tintColor: COLORS.black,
        }}
      />
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: theme?.colors?.bg_color,

        elevation: 10,
      }}
      // childrenContainerStyle={{
      //   borderRadius: 10,
      //   backgroundColor: 'white',
      // }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('NotificationDetails', {item: item});
        }}
        style={styles.item}>
        {/*<Ionicons*/}
        {/*  name={'notifications'}*/}
        {/*  style={{*/}
        {/*    padding: 15,*/}
        {/*    borderRadius: 50,*/}
        {/*    backgroundColor: COLORS.black,*/}
        {/*  }}*/}
        {/*  size={20}*/}
        {/*  color={COLORS.white}*/}
        {/*/>*/}
        <Image
          source={icons.notification}
          style={{
            height: 30,
            tintColor: theme?.colors?.white,
            width: 30,
            margin: 10,
          }}
        />
        <View
          style={{
            marginStart: 10,
            flex: 1,
          }}>
          <Text
            style={[
              styles.title,
              {
                color: theme?.colors?.white,
              },
            ]}
            numberOfLines={2}>
            {item?.module}
          </Text>
          <Text
            style={[
              styles.desc,
              {
                color: theme?.colors?.white,
              },
            ]}
            numberOfLines={2}>
            {item?.message}
          </Text>
        </View>
      </TouchableOpacity>
      <Text
        style={[
          styles.desc,
          {
            position: 'absolute',
            right: 8,
            top: 2,
            fontSize: 9,
            color: theme?.colors?.white,
          },
        ]}
        numberOfLines={2}>
        {moment(item?.created_at).format('LLL')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    // fontFamily:,
    fontFamily: FONTS.semi_old,
    color: COLORS.black,
  },
  desc: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.grey,
  },
  deleteButton: {
    backgroundColor: '#FFCACA',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    margin: 10,
    borderRadius: 10,
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SwipeDelete;
