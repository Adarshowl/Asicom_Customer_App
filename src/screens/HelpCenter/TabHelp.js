import React, { useContext ,useState} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { tabData } from '../../utils/data';
import TabOfferScreen from './TabOfferScreen';
import { Animated, ScrollView, TouchableOpacity, View } from 'react-native';
import { SIZES } from '../../constants';
import themeContext from '../../constants/themeContext';
import { COLORS } from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';
import HelpCenter from './HelpCenter'


const Tab = createMaterialTopTabNavigator();

const CAMERA_TAB_ITEM_WIDTH = SIZES.width * 0.1;
const NORMAL_TAB_ITEM_WIDTH = SIZES.width / 2;

const MyTabBar = ({ state, descriptors, navigation, position }) => {
  const theme = useContext(themeContext);
  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: 5,
      }}>
      <ScrollView

        style={{
           flex: 1,
      
         }}
        contentContainerStyle={{
          paddingLeft: 5,
          paddingRight: 10,
          // paddingBottom: 10,
          // paddingTop: 5,
          // marginBottom:30,


          
        }}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;
          const tabBarItemWidth = NORMAL_TAB_ITEM_WIDTH;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({
                name: route.name,
                merge: true,
              });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // const inputRange = state.routes.map((_, i) => i);

          // const opacity = position.interpolate({
          //   inputRange,
          //   outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
          // });


          const [selectedCategories, setSelectedCategories] = useState([]);
          const toggleCategory = (categoryId) => {
            // Check if the category is already selected
            const isCategorySelected = selectedCategories.includes(categoryId);
        
            // Toggle the category selection
            if (isCategorySelected) {
              setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
            } else {
              setSelectedCategories([...selectedCategories, categoryId]);
            }
          };

          return (
            <TouchableOpacity
              key={route.id}
              accessibilityRole="button"
              
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={() => toggleCategory(route.id)}

              // onPress={onPress}
              onLongPress={onLongPress}
              style={{
                // width:"10%",
                maxWidth: 100,
                justifyContent: 'center',
                alignItems: 'center',
                height: 45,
                // backgroundColor: isFocused
                //   ? theme?.colors?.all
                //   :theme?.colors?.btntextColor,
              
                  backgroundColor: selectedCategories.includes(route.id)
                  ? theme?.colors?.all
                    :theme?.colors?.btntextColor,
              
                // : theme?.colors?.bg,
                borderRadius: 20,
                borderColor:theme?.colors?.grey,
                color: theme?.colors?.black,
                borderWidth:1,
                paddingHorizontal: 18,
                marginStart:8,
                marginBottom: 10,
                marginTop: 10,
                // elevation:5
              }}>
              <Animated.Text
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  color: selectedCategories.includes(route.id)
                    ? "white"
                    : theme?.colors?.textColor,
                    fontFamily: FONTS?.bold

                }}>
                {/* {label.toUpperCase()} */}
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
const TabHelp = () => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        tabBarAndroidRipple: { borderless: false },
        swipeEnabled: true,
        tabBarScrollEnabled: true,
      }}>
      {tabData.map(item => (
        <Tab.Screen
          key={item.id}
          name={item.name}
          children={HelpCenter}
          initialParams={{ item: item }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabHelp;
