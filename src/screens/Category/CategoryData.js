import {FlatList, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import CategoryItem from './CategoryList';
import GlobalStyle from '../../styles/GlobalStyle';
import {images, STRING} from '../../constants';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import ToolBarIcon from '../../utils/ToolBarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import themeContext from '../../constants/themeContext';
import CategoryDataList from './CategoryDataList';

const CategoryData = ({navigation}) => {
  const theme = useContext(themeContext);
  
  const catData = [
      {
        name: 'Herbs',
        image:
        "data:image/jpeg;base64,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",
          // 'https://st.adda247.com/https://adda247jobs-wp-assets-adda247.s3.ap-south-1.amazonaws.com/jobs/wp-content/uploads/sites/2/2021/10/11134956/maxresdefault-3.jpg',
          price: '120.00',
          old: '100.00',
          rate: '2',
          qty: '2 kg',
          sold: '1.2k',
        },
      {
        name: 'Vegetable',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0-r56nCQswGPwztEThVqiywwSfXdmEqNN2A&usqp=CAU',
          price: '120.00',
          old: '100.00',
          rate: '2',
          qty: '2 kg',
          sold: '1.2k',
        },
      
      {
        name: 'Fruits',
        image:
          'data:image/png;base64,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',
          price: '120.00',
          old: '100.00',
          rate: '2',
          qty: '2 kg',
          sold: '1.2k',
        },
      {
        name: 'Beveroges',
        image:
          'https://styles.redditmedia.com/t5_2syhw/styles/communityIcon_jmytdxqtdew71.png',
          price: '120.00',
          old: '100.00',
          rate: '2',
          qty: '2 kg',
          sold: '1.2k',
        },
      {
        name: 'Grocery',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6d3xd_gRbHu_vQagOPf66yafHXNWBR618gw&usqp=CAU',
          price: '120.00',
          old: '100.00',
          rate: '2',
          qty: '2 kg',
          sold: '1.2k',
        },
      {
        name: 'Edible Oil',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8UirXee4cFGsZBzOJgcXMQBZaPvQmG1wi_w&usqp=CAU',
          price: '120.00',
          old: '100.00',
          rate: '2',
          qty: '2 kg',
          sold: '1.2k',
        }
    ];
  

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
        <Image source={images.app_logo} style={GlobalStyle.toolbarAppIcon} />
        <VegUrbanCommonToolBar
          title={STRING.hi_user}
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
          }}
          textStyle={{
            color: theme.colors.textColor,
          }}
        />
        <ToolBarIcon
          title={Ionicons}
          iconName={'search'}
          icSize={20}
          icColor={COLORS.colorPrimary}
          style={{
            marginEnd: 0,
            backgroundColor: theme.colors.toolbar_icon_bg,
          }}
          onPress={() => {
            navigation.navigate('Search');
          }}
        />
        <ToolBarIcon
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
        />
      </View>
      <FlatList
        style={{
          marginTop: 10,
        //   alignSelf: 'center',
        }}
        data={catData}
        // numColumns={1}
        renderItem={({item, index}) => <CategoryDataList item={item} />}
      />
    </SafeAreaView>
  );
};

export default CategoryData;

const styles = StyleSheet.create({});
