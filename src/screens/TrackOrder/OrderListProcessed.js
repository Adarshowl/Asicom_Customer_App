import {FlatList, View} from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import {OrderProcessData} from '../../utils/data';
import TrackOrderItem from './TrackOrderItem';
import React, {useContext} from 'react';
import themeContext from '../../constants/themeContext';

const OrderListProcessed = () => {
  const theme = useContext(themeContext);

  return (
    <View
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      <FlatList
        style={{
          paddingStart: 10,
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
        showsVerticalScrollIndicator={false}
        data={OrderProcessData}
        renderItem={({item, index}) => <TrackOrderItem item={item} />}
      />
    </View>
  );
};
export default OrderListProcessed;
