import React, { useContext, useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
  SafeAreaView,
  I18nManager
} from 'react-native';
import { Icon } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather'
import ToolBarIcon from '../../utils/ToolBarIcon';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import GlobalStyle from '../../styles/GlobalStyle';
import { STRING } from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/Colors';
import AntDesign from "react-native-vector-icons/AntDesign"
import themeContext from '../../constants/themeContext';
import { FONTS } from '../../constants/Fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Chat = ({navigation}) => {

  const theme = useContext(themeContext);
  const [show, setShow] = useState(false);
  const [chatUser] = useState({
    name: 'Robert Henry',
    profile_image: 'https://randomuser.me/api/portraits/men/0.jpg',
    last_seen: 'online',
  });

  const [currentUser] = useState({
    name: 'John Doe',
  });

  const [messages, setMessages] = useState([
    { sender: 'John Doe', message: 'Hey there!', time: '6:01 PM' },
    {
      sender: 'Robert Henry',
      message: 'Hello, how are you doing?',
      time: '6:02 PM',
    },
    {
      sender: 'John Doe',
      message: 'I am good, how about you?',
      time: '6:02 PM',
    },
    {
      sender: 'John Doe',
      message: `😊😇`,
      time: '6:02 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Can't wait to meet you.`,
      time: '6:03 PM',
    },
    {
      sender: 'John Doe',
      message: `That's great, when are you coming?`,
      time: '6:03 PM',
    },
    {
      sender: 'Robert Henry',
      message: `This weekend.`,
      time: '6:03 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Around 4 to 6 PM.`,
      time: '6:04 PM',
    },
    {
      sender: 'John Doe',
      message: `Great, don't forget to bring me some mangoes.`,
      time: '6:05 PM',
    },
    {
      sender: 'Robert Henry',
      message: `Sure!`,
      time: '6:05 PM',
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');

  function getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  function sendMessage() {
    if (inputMessage === '') {
      return setInputMessage('');
    }
    let t = getTime(new Date());
    setMessages([
      ...messages,
      {
        sender: currentUser.name,
        message: inputMessage,
        time: t,
      },
    ]);
    setInputMessage('');
  }

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon
              name='angle-left'
              type='font-awesome'
              size={30}
              color='#fff'
            />
          </TouchableOpacity>
          <Image
            style={styles.userProfileImage}
            source={{ uri: chatUser.profile_image }}
          />
          <View
            style={{
              paddingLeft: 10,
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>
              {chatUser.name}
            </Text>
            <Text style={{ color: '#fff', fontWeight: '300' }}>
              {chatUser.last_seen}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingRight: 10 }}
          onPress={() => {
            Alert.alert('Audio Call', 'Audio Call Button Pressed');
          }}
        >
          <Icon name='call' size={28} color='#fff' />
        </TouchableOpacity>
      ),
    });
  }, []);

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
                    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
                    marginStart: 10
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
            title="Customer Service"
            style={{
                backgroundColor: theme.colors.bg_color_onBoard,
                marginStart: 10,
                fontFamily: FONTS?.bold

            }}
            textStyle={{
                color: theme.colors.textColor,
                fontWeight: 'bold',
                fontSize: 20
            }}
        />
        <Feather
            name={'phone'}
            size={26}
            // color={COLORS.colorPrimary} 
            style={{
                marginEnd: 10
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

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <FlatList
          style={{ backgroundColor: theme?.colors?.bg_color_onBoard }}
          inverted={true}
          data={JSON.parse(JSON.stringify(messages)).reverse()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback>
              <View style={{ marginTop: 6 }}>
                <View
                  style={{
                    maxWidth: Dimensions.get('screen').width * 0.8,
                    backgroundColor: theme?.colors?.addtocart,
                    alignSelf:
                      item.sender === currentUser.name
                        ? 'flex-end'
                        : 'flex-start',
                    marginHorizontal: 10,
                    padding: 10,
                    borderRadius: 8,
                    borderBottomLeftRadius:
                      item.sender === currentUser.name ? 8 : 0,
                    borderBottomRightRadius:
                      item.sender === currentUser.name ? 0 : 8,
                  }}
                >
                  <Text
                    style={{
                      // color: '#fff',
                      fontSize: 16,
                      color:theme?.colors?.textColor,
                    }}
                  >
                    {item.message}
                  </Text>
                  <Text
                    style={{
                      // color: '#dfe4ea',
                      fontSize: 14,
                      alignSelf: 'flex-end',
                      color:theme?.colors?.textColor

                    }}
                  >
                    {item.time}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />

        <View style={{ paddingVertical: 10,backgroundColor:theme?.colors?.bg }}>
          <View style={[styles.messageInputView,{
            backgroundColor:theme?.colors?.addtocart
          }]}>
            <TextInput
              defaultValue={inputMessage}
              style={[styles.messageInput,{
                backgroundColor:theme?.colors?.addtocart,
                color:theme?.colors?.textColor

              }]}
              textStyle={{
                color:theme?.colors?.textColor
              }}
              placeholder='Message'
              placeholderTextColor={theme?.colors?.textColor}
              onChangeText={(text) => setInputMessage(text)}
              onSubmitEditing={() => {
                sendMessage();
              }}
            />
            <TouchableOpacity
              style={[styles.messageSendView,{
                color:theme?.colors?.textColor
              }]}
              onPress={() => {
                sendMessage();
              }}
            >
              <Icon name='send' type='material' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

export default Chat;

const styles = StyleSheet.create({
  headerLeft: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfileImage: { height: '100%', aspectRatio: 1, borderRadius: 100 },
  container: {
    flex: 1,
    backgroundColor: '#f2f2ff',
  },
  messageInputView: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 14,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingVertical:5,
    borderRadius:10,
    borderWidth:0.5,
    paddingHorizontal:15,
    

  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});