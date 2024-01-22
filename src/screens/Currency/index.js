import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import {STRING} from '../../constants';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ShowToastMessage} from '../../utils/Utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import themeContext from '../../constants/themeContext';

const Currency = ({navigation}) => {
  const theme = useContext(themeContext);
  const onFavClick = idx => {
    let a = favData.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        temp.fav = !temp.fav;
      }
      // ShowToastMessage('HI CLIXK' + temp.fav);

      return temp;
    });

    setFavData(a);
  };

  const [favData, setFavData] = useState([
    {code: 'USD', symbol: '$', selected: false},
    {code: 'EUR', symbol: '€', selected: false},
    {code: 'JPY', symbol: '¥', selected: false},
    {code: 'GBP', symbol: '£', selected: false},
  ]);
  const onItemClick = idx => {
    let a = favData.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        temp.selected = !temp.selected;
        STRING.APP_CURRENCY = temp?.symbol;
        ShowToastMessage(`App curreny changed to ${temp?.code}`);
        AsyncStorage.setItem(STRING.app_cur, temp?.symbol + '');
        RNRestart.restart();
      } else {
        temp.selected = false;
      }
      return temp;
    });

    setFavData(a);
  };

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem(STRING.app_cur, (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            STRING.APP_CURRENCY = value;
            let a = favData.map((item, index) => {
              let temp = Object.assign({}, item);
              console.log(temp?.code == value);
              if (temp?.symbol == value) {
                temp.selected = !temp.selected;
              }
              return temp;
            });

            setFavData(a);
          } else {
            STRING.APP_CURRENCY = '$';
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };
  useEffect(() => {
    getUserFromStorage();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          styles.wrapper,
          {
            backgroundColor: theme?.colors?.bg_color,
          },
        ]}
        onPress={() => {
          onItemClick(index);
        }}>
        <View style={styles.innerWrapper}>
          <MaterialCommunityIcons
            name={item?.selected ? 'circle-slice-8' : 'circle-outline'}
            size={22}
            color={theme?.colors?.colorPrimary}
          />
          <Text
            style={[
              styles.textName,
              {
                color: theme?.colors?.white,
              },
            ]}>
            {item?.code}
          </Text>
          <Text
            style={[
              styles.textSymbol,
              {
                color: theme?.colors?.white,
              },
            ]}>
            {item?.symbol}
          </Text>
        </View>
        <View style={styles.divLine} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme?.colors?.bg_color_onBoard,
          },
        ]}>
        <ToolBarIcon
          title={Ionicons}
          iconName={'chevron-back'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            marginEnd: 10,
            backgroundColor: theme?.colors?.toolbar_icon_bg,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar
          title={STRING.currency + ' Changer'}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
          }}
        />
      </View>

      <FlatList
        style={{
          paddingStart: 5,
          paddingEnd: 5,
        }}
        ListHeaderComponent={() => {
          return <View style={{}} />;
        }}
        ListHeaderComponentStyle={{
          paddingTop: 8,
        }}
        showsVerticalScrollIndicator={false}
        data={favData}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default Currency;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
  innerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  textName: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: COLORS.black,
    flex: 1,
    marginStart: 15,
  },
  textSymbol: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    color: COLORS.black,
    marginStart: 15,
    marginEnd: 15,
  },
  image: {
    height: 25,
    width: 50,
    resizeMode: 'center',
  },
  divLine: {
    backgroundColor: COLORS.gray,
    height: 0.5,
    width: '100%',
    marginTop: 15,
  },
});
