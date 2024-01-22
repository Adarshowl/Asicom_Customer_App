import {FlatList, View} from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import TrackOrderItem from './TrackOrderItem';
import React, {useContext} from 'react';
import {OrderData} from '../../utils/data';
import themeContext from '../../constants/themeContext';

const OrderListAll = () => {
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
        data={OrderData}
        renderItem={({item, index}) => <TrackOrderItem item={item} />}
      />
    </View>
  );
};
export default OrderListAll;
