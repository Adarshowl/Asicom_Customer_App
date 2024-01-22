import React, {useContext} from 'react';
import {FlatList, View} from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import TrackOrderItem from './TrackOrderItem';
import themeContext from '../../constants/themeContext';

const TrackOrderScreen = ({route}) => {
  const theme = useContext(themeContext);
  return (
    <View
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme.colors.bg_color_onBoard,
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
        data={[1, 2, 3, 4]}
        renderItem={({item, index}) => <TrackOrderItem />}
      />
    </View>
  );
};
export default TrackOrderScreen;
