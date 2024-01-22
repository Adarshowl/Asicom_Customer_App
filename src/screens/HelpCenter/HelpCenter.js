import React, {useContext, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  I18nManager,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import themeContext from '../../constants/themeContext';
import {FONTS} from '../../constants/Fonts';

const Tab = createMaterialTopTabNavigator();

const HelpCenter = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('FAQ');
  const handleFAQPress = () => {
    setSelectedTab('FAQ');

    navigation.navigate('TabHelp');
  };

  const [selected, setSelected] = useState('General');

  const tabs = ['General', 'Account', 'Payment', 'Subscription', 'Others'];

  const handleTabClick = tab => {
    setSelected(tab);
    // Add logic here to filter and display FAQ items based on the selected tab.
  };

  const [expandedItems, setExpandedItems] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);

  const toggleFAQItem = item => {
    if (expandedItems.includes(item)) {
      setExpandedItems(expandedItems.filter(i => i !== item));
    } else {
      setExpandedItems([...expandedItems, item]);
    }
  };

  const contactOptions = [
    {
      name: 'Customer Service',
      url: 'https://www.facebook.com/your-facebook-page',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ZKw8Q2sd0AlNMzqbzwAzZPOfiqmU79bP1g&usqp=CAU',
    },
    {
      name: 'Website',
      url: 'https://www.instagram.com/your-instagram-page',
      image:
        'https://w7.pngwing.com/pngs/727/737/png-transparent-biodegradation-computer-icons-symbol-website-logo-miscellaneous-symmetry-environmentally-friendly-thumbnail.png',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/your-whatsapp-number',
      image:
        'data:image/png;base64,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',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/your-facebook-page',
      image:
        'https://i.pinimg.com/originals/e7/34/a1/e734a153a525fbece9673d297c281167.png',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/your-instagram-page',
      image:
        'https://static.vecteezy.com/system/resources/previews/014/414/683/non_2x/instagram-black-logo-on-transparent-background-free-vector.jpg',
    },
    {
      name: 'Twitter',
      url: 'https://www.facebook.com/your-facebook-page',
      image:
        'https://toppng.com/uploads/preview/transparent-twitter-logo-white-11549680415asnkhtljtz.png',
    },
  ];

  const handleOptionPress = option => {
    setSelectedOption(option);
    Linking.openURL(option.url);
  };

  const faqData = [
    {
      question: 'What is FAQ 1?',
      answer: 'Answer to FAQ 1.',
    },
    {
      question: 'What is FAQ 2?',
      answer: 'Answer to FAQ 2.',
    },
    // Add more FAQ items as needed
  ];

  const theme = useContext(themeContext);
  const [show, setShow] = useState(false);
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
            backgroundColor: theme.colors.bg_color_onBoard,
          },
        ]}>
        {/* <Image source={images.app_logo} style={GlobalStyle.toolbarAppIcon} /> */}
        <Ionicons
          name="ios-arrow-back"
          // color={COLORS.black}
          color={theme.colors.textColor}
          size={25}
          style={[
            styles.backIcon,
            {
              opacity: !show ? 1 : 0.0,
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              marginStart: 10,
            },
          ]}
          onPress={() => {
            navigation.goBack();
            // ShowToastMessage('Coming Soon!');
          }}
        />
        {/* <ToolBarIcon
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
        /> */}
        <VegUrbanCommonToolBar
          title="Help Center"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
            fontFamily: FONTS?.bold,
          }}
          textStyle={{
            color: theme.colors.textColor,

            fontSize: 20,
          }}
        />
        <AntDesign
          name={'search1'}
          size={26}
          // color={COLORS.colorPrimary}
          style={{
            marginEnd: 10,
          }}
          color={theme?.colors?.black}
        />

        {/* <ToolBarIcon
          title={Ionicons}
          iconName={'person'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            marginEnd: 10,
            backgroundColor: theme.colors.toolbar_icon_bg,
          }}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        /> */}
      </View>

      {/* <Tab.Navigator>
                <Tab.Screen name="FAQ" component={FaqScreen} />
                <Tab.Screen name="Contact Us" component={ContactUsScreen} />
            </Tab.Navigator> */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          //   onPress={handleFAQPress}

          onPress={() => setSelectedTab('FAQ')}
          style={[
            styles.tab,
            {
              // backgroundColor: selectedTab === 'Ongoing' ? 'blue' : 'gray',
              borderBottomWidth: 2,
              borderBottomColor:
                selectedTab === 'FAQ'
                  ? theme?.colors?.colorPrimary
                  : theme?.colors?.bg,
            },
          ]}>
          <Text
            style={[
              styles.text,
              {
                color: theme?.colors?.textColor,
                fontFamily: FONTS?.medium,
              },
            ]}>
            FAQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          //   onPress={handleContactUsPress}

          onPress={() => setSelectedTab('Contact')}
          style={[
            styles.tab,
            {
              // backgroundColor: selectedTab === 'Ongoing' ? 'blue' : 'gray',
              borderBottomWidth: 2,
              borderBottomColor:
                selectedTab === 'Contact'
                  ? theme?.colors?.colorPrimary
                  : theme?.colors?.bg,
            },
          ]}>
          <Text
            style={[
              styles.text,
              {
                color: theme?.colors?.textColor,
                fontFamily: FONTS?.medium,
              },
            ]}>
            Contact us
          </Text>
        </TouchableOpacity>
      </View>
      {/* {selectedTab === 'FAQ' && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                style={{
                    flex:1,
                    // marginBottom:-300
                }}
                >
                    {tabs.map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleTabClick(tab)}
                            style={{
                                flex:1,
                                borderWidth:0.5,

                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderBottomWidth: selectedTab === tab ? 2 : 0, // Highlight selected tab
                                borderColor: selectedTab === tab ? 'blue' : 'transparent',
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )} */}

      {selectedTab === 'FAQ' && (
        <View
          style={{
            flexGrow: 1,
            // marginTop:-400
          }}>
          {faqData.map((item, index) => (
            // <View style={{
            //     flex:1,

            // }}>

            <TouchableOpacity
              key={index}
              onPress={() => toggleFAQItem(index)}
              style={{
                // flex:1,
                marginHorizontal: 15,
                borderRadius: 20,
                marginVertical: 10,
                backgroundColor: theme?.colors?.bg,
                paddingVertical: 20,
                paddingHorizontal: 20,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    fontFamily: FONTS?.bold,
                    color: theme?.colors?.textColor,
                    marginLeft: 10,
                    fontSize: 16,
                  }}>
                  {item.question}
                </Text>
                <AntDesign
                  name="caretdown"
                  size={16}
                  color={theme?.colors?.textColor}
                />
              </View>
              {expandedItems.includes(index) && (
                <View>
                  <View style={styles.divLine} />
                  <Text
                    style={{
                      color: theme?.colors?.textColor,
                      fontSize: 16.5,
                      marginLeft: 10,
                      marginTop: 5,
                      fontFamily: FONTS?.regular,
                    }}>
                    {item.answer}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            // </View>
          ))}
        </View>
      )}

      {selectedTab === 'Contact' && (
        <View>
          {contactOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('chat');
              }}
              // onPress={() => Linking.openURL(option.url)}
              style={{
                marginHorizontal: 15,
                borderRadius: 20,
                marginVertical: 10,
                backgroundColor: theme?.colors?.bg,
                paddingVertical: 15,
                paddingHorizontal: 20,
                flexDirection: 'row',
                // justifyContent:'center',
                alignItems: 'center',
              }}>
              {/* <FontAwesome
                            name="whatsapp"
                            size={25}
                            color={theme?.colors?.textColor}
                            /> */}
              <Image
                source={{
                  uri: option?.image,
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  resizeMode: 'stretch',
                }}
              />
              <Text
                style={{
                  fontFamily: FONTS?.bold,
                  color: theme?.colors?.textColor,
                  fontSize: 16,
                  marginLeft: 25,
                }}>
                {option.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

export default HelpCenter;
const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    // flex: 1,
    marginHorizontal: 20,
  },
  divLine: {
    height: 0.5,
    width: '90%',
    backgroundColor: COLORS.gray,
    alignSelf: 'center',
    marginVertical: 5,
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    color: COLORS?.black,
    // fontWeight:'bold'
  },
  tab: {
    padding: 10,
    width: '50%',
    alignItems: 'center',
    marginHorizontal: 20,
    // borderRadius: 5,
  },
});
