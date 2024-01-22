import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {I18nManager, Image, StyleSheet, Text, View} from 'react-native';
import {images, SIZES, STRING} from '../../../constants';
import {COLORS} from '../../../constants/Colors';
import GlobalStyle from '../../../styles/GlobalStyle';
import themeContext from '../../../constants/themeContext';
import {ShowConsoleLogMessage} from '../../../utils/Utility';
import Onboarding from 'react-native-onboarding-swiper';
import {useTranslation} from 'react-i18next';
import {FONTS} from '../../../constants/Fonts';

const OnBoarding = ({navigation}) => {
  const theme = useContext(themeContext);
  useEffect(() => {
    AsyncStorage.setItem(STRING.onBoardComplete, 'true');
    AsyncStorage.setItem(STRING.isFirstTime, 'true');
  }, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef();
  const {t} = useTranslation();

  ShowConsoleLogMessage('active index -> ' + activeIndex);
  const [data, setData] = useState([
    {
      // backgroundColor: theme?.colors?.bg_color,
      backgroundColor: theme?.colors?.bg_color_onBoard,

      image: <Image source={images.intro_a} style={styles.image} />,
      title: t('We provides high quality products just for you'),
      // subtitle: t('discover_text'),
      // subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsum',
      titleStyles: {
        color: theme?.colors?.colorPrimary,
        fontFamily: FONTS?.bold,
        textAlign: 'center',
        fontSize: 40,
        marginTop: -110,
        // marginBottom:70
        marginVertical: 0,
      },
      subTitleStyles: {
        color: theme?.colors?.textColor,
        fontFamily: 'OpenSans-Regular',
        textAlign: 'center',
        fontSize: 14,
        marginTop: -50,
        paddingHorizontal: 20,
      },
    },
    {
      backgroundColor: theme?.colors?.bg_color_onBoard,
      image: <Image source={images.intro_b} style={styles.image} />,

      title: t("Let's fulfill your daily needs with evaira right now!"),
      // subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsum',

      // subtitle: t('shop_text'),
      titleStyles: {
        color: theme?.colors?.colorPrimary,
        // fontFamily: 'OpenSans-SemiBold',
        fontFamily: FONTS?.bold,

        textAlign: 'center',
        fontSize: 38,

        // fontSize: 26,
        marginTop: -110,
        // marginBottom:70
        marginVertical: 0,
      },
      subTitleStyles: {
        color: theme?.colors?.textColor,
        fontFamily: 'OpenSans-Regular',

        textAlign: 'center',
        fontSize: 14,
        marginTop: -50,
        paddingHorizontal: 20,
      },
    },
    {
      image: <Image source={images.intro_c} style={styles.image} />,

      backgroundColor: theme?.colors?.bg_color_onBoard,
      title: t('Your satisfaction is our number one priority'),
      // subtitle: t('offers_text'),
      // subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsum',

      titleStyles: {
        color: theme?.colors?.colorPrimary,
        // fontFamily: 'OpenSans-Medium',
        fontFamily: FONTS?.bold,

        textAlign: 'center',
        fontSize: 38,
        marginTop: -110,
        // marginBottom:70
        marginVertical: 0,
      },
      subTitleStyles: {
        color: theme?.colors?.textColor,
        fontFamily: 'OpenSans-Regular',

        // fontFamily: 'OpenSans-Regular',
        textAlign: 'center',
        fontSize: 14,
        marginTop: -50,
        paddingHorizontal: 20,
      },
    },
  ]);

  const renderItems = ({item}) => {
    return (
      <View
        style={[
          styles.itemBg,
          {
            backgroundColor: theme?.colors?.bg_color_onBoard,
          },
        ]}>
        <Image source={item.image} style={styles.image} />
        <Text
          style={[
            styles.heading,
            {
              color: theme?.colors?.textColor,
            },
          ]}>
          {item?.heading}
        </Text>
        <Text
          style={[
            styles.desc,
            {
              color: theme?.colors?.textColor,
            },
          ]}>
          {item?.desc}
        </Text>
      </View>
    );
  };

  const renderDotItems = ({item, index}) => {
    return (
      <View
        style={[
          styles.dot,
          {
            backgroundColor: item?.selected
              ? theme?.colors?.colorPrimary
              : theme?.colors?.toolbar_icon_bg,
          },
        ]}
      />
    );
  };

  const onScroll = useCallback(event => {
    if (I18nManager.isRTL) {
      const slideSize = event.nativeEvent.layoutMeasurement.width;
      const index = event.nativeEvent.contentOffset.x / slideSize;
      const roundIndex = Math.round(index);
      console.log('index:', index);
      console.log('roundIndex:', roundIndex);
      setActiveIndex(roundIndex);
      activateColor(roundIndex);
    } else {
      const slideSize = event.nativeEvent.layoutMeasurement.width;
      const index = event.nativeEvent.contentOffset.x / slideSize;
      const roundIndex = Math.round(index);
      // console.log('roundIndex:', roundIndex);
      setActiveIndex(roundIndex);
      activateColor(roundIndex);
    }
  }, []);

  const handleSkipBtnClick = () => {
    navigation.navigate('Login');
    // navigation.replace('MainContainer');
  };

  const handleNextBtnClick = () => {
    let active = activeIndex + 1;
    activateColor(active);
    if (active < data.length) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: active,
      });
      setActiveIndex(activeIndex + 1);
    } else {
      navigation.navigate('Login');
      // navigation.replace('MainContainer');
    }
  };

  const activateColor = index => {
    let arr = data.map((item, idx) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        if (index == 0) {
          temp.selected = true;
        } else {
          temp.selected = !temp?.selected;
        }
      } else {
        temp.selected = false;
      }
      return temp;
    });
    setData(arr);
  };

  const Next = ({isLight, ...props}) => (
    <Text
      style={[
        FONTS.body4,
        GlobalStyle.skipNextText,
        {
          color: theme.colors?.colorPrimary,
          fontFamily: FONTS?.regular,
        },
      ]}
      {...props}>
      {t('Next')}
    </Text>
  );

  const Square = ({isLight, selected}) => {
    // let backgroundColor;
    // if (isLight) {
    //   backgroundColor: selected
    //     ? theme?.colors?.colorPrimary
    //     : theme?.colors?.toolbar_icon_bg;
    // } else {
    //   backgroundColor: selected
    //     ? theme?.colors?.colorPrimary
    //     : theme?.colors?.toolbar_icon_bg;
    // }
    return (
      <View
        style={{
          width: 5,
          height: 6,
          margin: 3,
          borderRadius: 15,
          // marginHorizontal: 3,
          backgroundColor: selected
            ? theme?.colors?.colorPrimary
            : theme?.colors?.toolbar_icon_bg,
        }}
      />
    );
  };

  return (
    <View
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme.colors.bg_color,
          // flex:1
          // marginTop: StatusBar.currentHeight || 0, // Add the height of the status bar
        },
      ]}>
      {/*<Onboarding pages={data} />*/}
      <Onboarding
        // containerStyle={{
        //   marginVertical: 10,
        //   width: 70,
        //   height:900
        //   // backgroundColor: 'white',
        // }}
        bottomBarColor={
          theme?.colors?.white11

          // COLORS?.white
        }
        bottomBarHeight={60}
        bottomBar={{
          backgroundColor: COLORS?.white,
        }}
        pages={data}
        // imageContainerStyles={styles.image}
        titleStyles={{
          color: theme?.colors?.textColor,
          fontFamily: FONTS?.medium,
          // textAlign: 'center',
          fontSize: 22,
          // marginTop: 5,
        }}
        subTitleStyles={{
          color: theme?.colors?.textColor,
          fontFamily: 'OpenSans-Regular',
          textAlign: 'center',
          fontSize: 17,
          // marginTop: 10,
        }}
        onSkip={() => {
          navigation.navigate('Login');
        }}
        SkipButtonComponent={() => {
          return (
            <View style={{}}>
              <Text
                style={[
                  FONTS.regular,
                  GlobalStyle.skipNextText,
                  {
                    color: theme.colors?.colorPrimary,
                    fontFamily: FONTS?.regular,
                  },
                ]}
                onPress={handleSkipBtnClick}>
                {t('Skip')}
              </Text>
            </View>
          );
        }}
        NextButtonComponent={Next}
        DotComponent={Square}
        DoneButtonComponent={() => {
          return (
            <Text
              style={[
                FONTS.body4,
                GlobalStyle.skipNextText,
                {
                  color: theme.colors?.colorPrimary,
                  fontFamily: FONTS?.regular,
                },
              ]}
              onPress={handleSkipBtnClick}>
              {t('get_started')}
            </Text>
          );
        }}
        footerStyle={{backgroundColor: 'white'}} // Set the footer background color to white
      />
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  image: {
    // width: SIZES.width - 10,
    height: '60%',
    resizeMode: 'contain',
    paddingHorizontal: 10,
    // alignSelf: 'center',
    width: '90%',
    marginBottom: 0,
    paddingBottom: 0,
  },
  dot: {
    width: 9,
    height: 9,
    margin: 10,
    borderRadius: 15,
  },
  heading: {
    fontFamily: 'OpenSans-SemiBold',
    textAlign: 'center',
    fontSize: 22,
    color: COLORS.black,
    marginTop: 5,
  },
  desc: {
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    fontSize: 17,
    color: COLORS.black,
    marginTop: 10,
  },
  itemBg: {
    marginBottom: 5,
    width: SIZES.width,
    alignItems: 'center',
  },
});
