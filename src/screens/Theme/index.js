import {
  Image,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../../assets/i18n/i18n';
import {EventRegister} from 'react-native-event-listeners';
import themeContext from '../../constants/themeContext';
import {Switch} from 'react-native-elements';

const Theme = ({navigation}) => {
  const theme = useContext(themeContext);
  const [favData, setFavData] = useState([
    {name: 'Light', code: 'light', selected: false},
    {name: 'Dark Mode', code: 'dark', selected: false},
  ]);
  const onItemClick = idx => {
    let a = favData.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        AsyncStorage.setItem(STRING.app_theme, temp?.code + '');
        STRING.APP_THEME = temp?.code + '';

        EventRegister.emit(
          STRING.app_theme,
          temp?.code == 'dark' ? true : false,
        );
        temp.selected = true;
      } else {
        temp.selected = false;
      }
      return temp;
    });

    setFavData(a);
  };
  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem(STRING.app_theme, (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            if (value == 'true') {
              setLightMode(true);
            } else {
              setLightMode(false);
            }
          } else {
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
        style={[
          styles.wrapper,
          {
            backgroundColor: theme?.colors?.bg_color,
          },
        ]}
        activeOpacity={0.9}
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
            {item?.name}
          </Text>
          <Text style={[styles.textSymbol, {color: theme?.colors?.white}]}>
            {item?.symbol}
          </Text>
        </View>
        <View style={styles.divLine} />
      </TouchableOpacity>
    );
  };

  const [lightMode, setLightMode] = useState(false);
  const [checked, setChecked] = useState(false);

  const toggleSwitch = () => {
    setChecked(!checked);
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
          title={STRING.theme + ' Changer'}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
          }}
        />
      </View>

      {/*<FlatList*/}
      {/*  style={{*/}
      {/*    paddingStart: 5,*/}
      {/*    paddingEnd: 5,*/}
      {/*  }}*/}
      {/*  ListHeaderComponent={() => {*/}
      {/*    return <View style={{}} />;*/}
      {/*  }}*/}
      {/*  ListHeaderComponentStyle={{*/}
      {/*    paddingTop: 8,*/}
      {/*  }}*/}
      {/*  showsVerticalScrollIndicator={false}*/}
      {/*  data={favData}*/}
      {/*  renderItem={renderItem}*/}
      {/*/>*/}

      <Image
        source={{
          uri: lightMode
            ? 'https://cdn-icons-png.flaticon.com/128/702/702814.png'
            : 'https://cdn-icons-png.flaticon.com/128/566/566461.png',
        }}
        style={{
          height: 100,
          width: 100,
          alignSelf: 'center',
          marginVertical: 50,
        }}
      />

      <Text
        style={[
          styles.textSymbol,
          {
            color: theme?.colors?.white,
            alignSelf: 'center',
            marginVertical: 20,
          },
        ]}>
        Lights are {lightMode ? 'off!!' : 'on!!'}
      </Text>
      <Switch
        style={{
          alignSelf: 'center',
        }}
        value={!lightMode}
        onValueChange={value => {
          setLightMode(prev => !prev);
          EventRegister.emit(STRING.app_theme, lightMode ? false : true);
          AsyncStorage.setItem(
            STRING.app_theme,
            lightMode ? false + '' : true + '',
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Theme;

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
