import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import {STRING} from '../../constants';
import TransactionItem from './TransactionItem';
import themeContext from '../../constants/themeContext';

const Transaction = ({navigation}) => {
  const theme = useContext(themeContext);
  const [data, setData] = useState([
    {
      id: '100',
      status: 'Success',
      amount: '150',
      message: 'how to scroll to bottom of scrollview in React native 0.63?',
      mode: 'Online',
      time: '16-10-2023 01:56 Pm',
    },
    {
      id: '101',
      status: 'Pending',
      amount: '100',
      message: 'React Native Scroll To Bottom',
      mode: 'COD',
      time: '17-10-2023 02:56 Pm',
    },

    {
      id: '102',
      status: 'Success',
      amount: '1005',
      message: 'React Native Scroll To NOT',
      mode: 'CASH',
      time: '23-10-2023 03:56 Pm',
    },
    {
      id: '103',
      status: 'Pending',
      amount: '50',
      message: 'To Bottom',
      mode: 'Cheque',
      time: '20-10-2023 04:56 Pm',
    },
  ]);

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
          },
        ]}>
        <ToolBarIcon
          title={Ionicons}
          iconName={'chevron-back'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            backgroundColor: theme.colors.toolbar_icon_bg,
            marginEnd: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <VegUrbanCommonToolBar
          title={STRING.transaction_history}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
          }}
        />
      </View>
      {/*<View*/}
      {/*  style={[*/}
      {/*    GlobalStyle.flexRowAlignCenter,*/}
      {/*    {*/}
      {/*      marginVertical: 15,*/}
      {/*    },*/}
      {/*  ]}>*/}
      {/*  <Text style={styles.no_transaction_text}>*/}
      {/*    {STRING.no_transaction_history_found}*/}
      {/*  </Text>*/}
      {/*  <Text style={styles.no_transaction_yet_text}>*/}
      {/*    {STRING.you_have_not_any_transactional_history_yet}*/}
      {/*  </Text>*/}
      {/*</View>*/}
      <FlatList
        style={{
          paddingStart: 10,
          paddingEnd: 5,
        }}
        ListHeaderComponent={() => {
          return <View style={{}} />;
        }}
        ListHeaderComponentStyle={{
          paddingTop: 10,
        }}
        ListFooterComponent={() => {
          return <View style={{}} />;
        }}
        ListFooterComponentStyle={{
          paddingBottom: 10,
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
        renderItem={({item, index}) => <TransactionItem item={item} />}
      />
    </SafeAreaView>
  );
};

export default Transaction;
const styles = StyleSheet.create({
  no_transaction_text: {
    marginHorizontal: 15,
    marginTop: 20,
    fontFamily: 'OpenSans-Medium',
    color: COLORS.gray,
    fontSize: 20,
  },
  no_transaction_yet_text: {
    marginHorizontal: 15,
    marginTop: 15,
    fontFamily: 'OpenSans-Medium',
    color: COLORS.gray,
    fontSize: 15,
  },
});
