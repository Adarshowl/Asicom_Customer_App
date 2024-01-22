import React, {useContext} from 'react';
import {View} from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import {STRING} from '../../constants';
import OrderTopTabNav from './order_top_tab_nav';
import themeContext from '../../constants/themeContext';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';

const TrackOrder = ({navigation}) => {
  const theme = useContext(themeContext);
  return (
    <View
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
          title={STRING._title_order_track}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
          }}
        />
        <ToolBarIcon
          title={Ionicons}
          iconName={'cart'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            backgroundColor: theme?.colors?.toolbar_icon_bg,
            marginEnd: 10,
          }}
          onPress={() => {
            navigation.navigate('Cart');
          }}
        />
      </View>
      <OrderTopTabNav />
    </View>
  );
};

export default TrackOrder;
