import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  I18nManager
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import { STRING } from '../../constants';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ShowToastMessage } from '../../utils/Utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import themeContext from '../../constants/themeContext';

import '../../assets/i18n/i18n';
import RNRestart from 'react-native-restart';
import { FONTS } from '../../constants/Fonts';

const Language = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const theme = useContext(themeContext);
  const [show, setShow] = useState("")

  // const [currentLanguage, setLanguage] = useState('en');

  const [favData, setFavData] = useState([
    { name: 'English', code: 'English(US)', selected: true },
    { name: 'English', code: 'English(UK)', selected: false },

    { name: 'Hindi', code: 'Hindi', selected: false },
    { name: 'Chinese', code: 'Chinese', selected: false },
    { name: 'Japanese', code: 'Japanese', selected: false },
    { name: 'German', code: 'German', selected: false },
    { name: 'French', code: 'French', selected: false },
    { name: 'Russian', code: 'Russian', selected: false },
    { name: 'Arabic', code: 'Arabic', selected: false },
    { name: 'malay', code: 'malay', selected: false },
    { name: 'Thai', code: 'Thai', selected: false },
    { name: 'Turkish', code: 'Turkish', selected: false },
    { name: 'Koreon', code: 'Koreon', selected: false },
    { name: 'French', code: 'French', selected: false },
    { name: 'Indonesian', code: 'Indonesian', selected: false },
    { name: 'Arabic', code: 'Arabic', selected: false },
  ]);


  const [selectedLanguage, setSelectedLanguage] = useState('')


  const onItemClick = (index) => {
    const updatedLanguages = favData.map((item, i) => ({
      ...item,
      selected: i === index,
    }));

    setFavData(updatedLanguages);
    setSelectedLanguage(updatedLanguages[index].code);
   
  
    navigation.replace('Profile', { selectedLanguage: updatedLanguages[index].code });
  };



  const renderItem = ({ item, index }) => {

    console.log(selectedLanguage)
    
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.wrapper, {
          backgroundColor: theme?.colors?.bg_color_onBoard

        }]}
        onPress={() => {
          onItemClick(index);
          // navigation.goBack('Profile', { selectedLanguage });
        }}
      >
        <View style={[styles.innerWrapper, {
          // backgroundColor:theme?.colors?.bg_color_onBoard
        }]}>
          <Text style={[styles.textName, {
            color: theme?.colors?.white
          }]}>{item?.name}</Text>
          <Text style={[styles.textSymbol, {
            color: theme?.colors?.textColor
          }]}>{item?.symbol}</Text>

          <MaterialCommunityIcons
            name={item?.selected ? 'circle-slice-8' : 'circle-outline'}
            size={22}
            color={theme?.colors?.colorPrimary}
            onPress={() => {
              onItemClick(index);
            }}
            style={{
              marginEnd:10
            }}

          />
        </View>
        {/* <View style={styles.divLine} /> */}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme.colors.bg_color_onBoard,
        },
      ]}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            backgroundColor: theme.colors.bg_color_onBoard,
            // marginTop: 5
          },
        ]}>

        <Ionicons
          name="ios-arrow-back"
          // color={COLORS.black}
          color={theme.colors.textColor}

          size={25}
          style={[
            styles.backIcon,
            {
              opacity: !show ? 1 : 0.0,
              transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
              marginStart: 10
            },
          ]}
          onPress={() => {
            navigation.goBack();
            // ShowToastMessage('Coming Soon!');
          }}
        />
        {/* <VegUrbanCommonToolBar 
        title={STRING.language + ' Changer'}

        style={{
          marginStart:20,
          backgroundColor: theme.colors.bg_color_onBoard,


        }}
         /> */}
        <VegUrbanCommonToolBar
          title={STRING.language}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            // backgroundColor: theme.colors.bg_color,
            // fontWeight: 'bold',
          }}
          textStyle={{
            color: theme.colors.textColor,
            fontSize: 18,
            marginStart: 20,
            fontFamily: FONTS?.bold

            // fontWeight: 'bold'
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

export default Language;

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
    justifyContent: 'space-between',
    marginVertical:10,
    
  },
  textName: {
    fontFamily: FONTS?.medium,
    fontSize: 18,
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
