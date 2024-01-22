import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  I18nManager,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import {useDispatch} from 'react-redux';
import VegUrbanImageLoader from '../../utils/VegUrbanImageLoader';
import {FONTS} from '../../constants/Fonts';
import themeContext from '../../constants/themeContext';
import {COLORS} from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import {getItemCategory} from '../../redux/actions/HomeApi';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import {showProgressBar} from '../../redux/actions';
import {IMAGE_BASE_URL} from '../../network/ApiEndPoints';

const AllCategories = ({navigation}) => {
  const [categoryData, setCategoryData] = useState([]);
  const dispatch = useDispatch();

  const theme = useContext(themeContext);
  // console.log(categoryData.length);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    dispatch(showProgressBar(true));
    dispatch(() =>
      getItemCategory(
        dispatch,
        navigation,
        successCallback,
        errorCallback,
        BannerErrorCallback,
        true,
      ),
    );
  };

  const successCallback = async data => {
    // ShowConsoleLogMessage('successCallback called after');
    dispatch(showProgressBar(false));
    setCategoryData(data?.response);
  };

  const errorCallback = async data => {
    setCategoryData([]);

    dispatch(showProgressBar(false));
  };

  const BannerErrorCallback = error => {
    ShowToastMessage(error);
    ShowConsoleLogMessage(error);
  };

  const renderCtegory = ({item}) => {
    // console.log(item[0]?.image);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CategoryHome', {item: item});
        }}
        style={{
          flexGrow: 1,

          marginVertical: 8,
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'red',
        }}>
        <View
          style={[
            styles.itemImage,
            {
              backgroundColor: theme?.colors?.colorimageback,
              // alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          {/*{item?.image != undefined || null ? (*/}

          <VegUrbanImageLoader
            source={IMAGE_BASE_URL + item?.image}
            styles={[
              {
                width: 45,
                borderRadius: 5,
                height: 45,
              },
            ]}
          />
          {/*) : null}*/}
        </View>
        <View style={{}}>
          <Text
            style={[
              styles.itemName,
              {
                color: theme.colors.white,
                fontFamily: FONTS?.regular,
                marginTop: 0,
                marginStart: 15,
              },
            ]}
            numberOfLines={1}>
            {item?.category_name}
            {/*{item?.name}*/}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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
        <Ionicons
          name="ios-arrow-back"
          // color={COLORS.black}
          color={theme.colors.textColor}
          size={25}
          style={[
            styles.backIcon,
            {
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
          title="Categories"
          style={{
            backgroundColor: theme.colors.bg_color_onBoard,
            marginStart: 10,
          }}
          textStyle={{
            color: theme.colors.textColor,
            fontWeight: 'bold',
            fontSize: 20,
          }}
        />
      </View>
      <FlatList
        // numColumns={4}
        contentContainerStyle={{
          padding: 10,
          paddingHorizontal: 20,
        }}
        data={categoryData}
        renderItem={renderCtegory}
        ItemSeparatorComponent={() => {
          return <View style={styles.divLine} />;
        }}
      />
    </SafeAreaView>
  );
};

export default AllCategories;

const styles = StyleSheet.create({
  itemName: {
    fontSize: 15,
    color: COLORS.black,
    textAlign: 'center',
  },
  itemImage: {
    width: 65,
    height: 65,
    alignItems: 'center',
    borderRadius: 50,
  },

  divLine: {
    height: 0.5,
    width: '95%',
    backgroundColor: COLORS.gray,
    alignSelf: 'center',
    marginVertical: 5,
    marginTop: 10,
  },
});
