import {FlatList, SafeAreaView, View} from 'react-native';
import React, {useContext, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import {STRING} from '../../constants';
import ReviewItem from './ReviewItem';
import themeContext from '../../constants/themeContext';

const Review = ({navigation}) => {
  const theme = useContext(themeContext);
  const [data, setData] = useState([
    {
      name: 'Arun',
      image:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '12-02-2023 2:56 PM',
      star: '4',
      message:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
    },
    {
      name: 'Aadarsh',
      image:
        'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '10-02-2023 2:56 PM',

      star: '3',
      message: 'What is the full Lorem Ipsum text?',
    },
    {
      name: 'Vishal',
      image:
        'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '13-02-2023 1:56 PM',

      star: '2',
      message:
        'Some versions of Microsoft Word also generate the text using the =lorem() function. Just type it in your Word document and you will get this paragraph: Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    },
    {
      name: 'Payal',
      image:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '14-05-2023 3:56 PM',

      star: '1',
      message: 'लोरेम इप्सम को इंग्लिश में क्या कहते हैं?',
    },

    {
      name: 'Gourav',
      image: 'https://vegurban.com/admin/upload/profile/1678876031.4014.jpg',
      date: '05-05-2023 4:56 PM',

      star: '5',
      message:
        'लोरेम इप्सम का क्या अर्थ है? लोरेम इप्सम, चित्रमय और शाब्दिक संदर्भ में, भराव पाठ को संदर्भित करता है जिसे दस्तावेज़ या दृश्य प्रस्तुति में रखा जाता है । लोरेम इप्सम लैटिन शब्द "डोलोरेम इप्सम" से लिया गया है जिसका मोटे तौर पर अनुवाद "स्वयं दर्द" के रूप में किया गया है। विज्ञापन।',
    },
  ]);
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
          title={STRING.customer_reviews}
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
          paddingTop: 10,
          paddingStart: 5,
          paddingEnd: 5,
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
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 0.5,
                backgroundColor: COLORS.light_gray,
                marginTop: 2,
              }}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => <ReviewItem item={item} />}
      />
    </SafeAreaView>
  );
};

export default Review;
