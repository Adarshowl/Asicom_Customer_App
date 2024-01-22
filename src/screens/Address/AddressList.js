import React, {useContext, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import AddressItem from './AddressItem';
import {COLORS} from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GlobalStyle from '../../styles/GlobalStyle';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import themeContext from '../../constants/themeContext';
import {useTranslation} from 'react-i18next';

const AddressList = ({navigation, route}) => {
  const {t} = useTranslation();

  const theme = useContext(themeContext);
  const [addressList, setAddressList] = useState([
    {
      name: 'test 1',
      address: 'indore',
      type: 'Home',
      def: true,
      selected: false,
    },
    {
      name: 'Test 2',
      address: 'dewas',
      type: 'Other',
      def: false,
      selected: false,
    },
    {
      name: 'test 3',
      address: 'Ujjain',
      type: 'Home',
      def: true,
      selected: false,
    },
    {
      name: 'Test 4',
      address: 'Bhopal',
      type: 'Office',
      def: false,
      selected: false,
    },
  ]);

  const onItemClick = idx => {
    let a = addressList.map((item, index) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        temp.selected = !temp.selected;
      } else {
        temp.selected = false;
      }
      return temp;
    });

    setAddressList(a);
  };

  const showBar = route?.params?.showBar;
  return (
    <View
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: theme?.colors?.bg_color_onBoard,
        },
      ]}>
      {showBar ? (
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
              backgroundColor: theme?.colors?.toolbar_icon_bg,
              marginEnd: 10,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <VegUrbanCommonToolBar
            title={t('address')}
            style={{
              backgroundColor: theme.colors.bg_color_onBoard,
            }}
            textStyle={{
              color: theme.colors.textColor,
            }}
          />
        </View>
      ) : null}
      <FlatList
        style={{
          paddingStart: 5,
          paddingEnd: 5,
        }}
        ListHeaderComponent={() => {
          return <View style={{}} />;
        }}
        ListHeaderComponentStyle={{
          paddingTop: 15,
        }}
        showsVerticalScrollIndicator={false}
        data={addressList}
        renderItem={({item, index}) => {
          return (
            <AddressItem
              item={item}
              onSelect={() => {
                onItemClick(index);
              }}
            />
          );
        }}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('AddressAddUpdate');
        }}
        style={[
          GlobalStyle.floatingAddBtn,
          {
            backgroundColor: theme.colors.colorPrimary,
          },
        ]}>
        <AntDesign name={'plus'} color={COLORS.white} size={20} />
      </TouchableOpacity>
    </View>
  );
};
export default AddressList;
