import {FlatList, SafeAreaView, View} from 'react-native';
import React, {useContext, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import FaqItem from './FaqItem';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';

const FAQ = ({navigation}) => {
  const theme = useContext(themeContext);
  const {t} = useTranslation();

  const [data, setData] = useState([
    {
      ques: 'Is it possible to keep a ScrollView scrolled to the bottom?',
      ans: 'For anyone writing function component that can use hook,',
      selected: true,
    },
    {
      ques: 'React Native Scroll To Bottom',
      ans: 'simple and elegant. perfectly does what i wanted! thank you',
      selected: false,
    },
    {
      ques: 'how to scroll to bottom of scrollview in React native 0.63?',
      ans: 'Use onContentSizeChange to keep track of the bottom Y of the scroll view (height)',
      selected: false,
    },
  ]);
  const onFavClick = idx => {
    let a = data.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        temp.selected = !temp.selected;
      }
      // ShowToastMessage('HI CLIXK' + temp.fav);

      return temp;
    });

    setData(a);
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
            backgroundColor: theme?.colors?.toolbar_icon_bg,
            marginEnd: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar
          title={t('faq')}
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
          paddingStart: 0,
          paddingEnd: 0,
        }}
        ListHeaderComponent={() => {
          return <View style={{}} />;
        }}
        ListHeaderComponentStyle={{
          paddingTop: 0,
        }}
        ListFooterComponent={() => {
          return <View style={{}} />;
        }}
        ListFooterComponentStyle={{
          paddingBottom: 0,
        }}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => (
          <FaqItem
            item={item}
            onClick={() => {
              onFavClick(index);
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default FAQ;
