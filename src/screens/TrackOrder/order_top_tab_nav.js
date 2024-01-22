import React, {useContext,useState,useEffect,useRef} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {flashTabData} from '../../utils/data';
import {Animated, ScrollView, TouchableOpacity, View} from 'react-native';
import {SIZES} from '../../constants';
import OrderListAll from './OrderListAll';
import OrderListReceived from './OrderListReceived';
import OrderListProcessed from './OrderListProcessed';
import OrderListDelivered from './OrderListDelivered';
import OrderListCancelled from './OrderListCancelled';
import OrderListReturned from './OrderListReturned';
import OrderListShipped from './OrderListShipped';
import themeContext from '../../constants/themeContext';
import { COLORS } from '../../constants/Colors';

const Tab = createMaterialTopTabNavigator();

const CAMERA_TAB_ITEM_WIDTH = SIZES.width * 0.1;
const NORMAL_TAB_ITEM_WIDTH = SIZES.width / 2;

const MyTabBar = ({state, descriptors, navigation, position}) => {
  const [focused, setFocused] = useState(0); // Initialize focused state with the first tab
  const scrollViewRef = useRef(null); // Ref for ScrollView

  const handleTabFocusChange = (index) => {
    setFocused(index);

    // Calculate the width of a tab item
    const tabBarItemWidth = focused === index ? CAMERA_TAB_ITEM_WIDTH : NORMAL_TAB_ITEM_WIDTH;

    // Calculate the offset to center the focused tab within the ScrollView
    const offsetX = (index - 1) * tabBarItemWidth;

    // Scroll to the calculated offset
    scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
  };
  const theme = useContext(themeContext);
  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: 5,
        paddingVertical: 10,
      }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
              ref={scrollViewRef} // Set the ref for ScrollView

      >
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          // const isFocused = state.index === index;
          // const tabBarItemWidth = NORMAL_TAB_ITEM_WIDTH;
          const isFocused = state.index === index;
          const tabBarItemWidth = isFocused
            ? CAMERA_TAB_ITEM_WIDTH
            : NORMAL_TAB_ITEM_WIDTH; // Adjust tab item width for focused tab


          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

          //   if (!isFocused && !event.defaultPrevented) {
          //     navigation.navigate({
          //       name: route.name,
          //       merge: true,
          //     });
          //   }
          // };
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({
              name: route.name,
              merge: true,
            });
            handleTabFocusChange(index); // Update the focused tab when a new tab is pressed
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

          return (
            <TouchableOpacity
              key={route.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              
              style={{
                maxWidth: 100,
                justifyContent: 'center',
                alignItems: 'center',
                // height: 40,
                paddingVertical: 8,
                backgroundColor: isFocused
                  ? theme.colors.colorPrimary
                  : theme?.colors?.bg,
                  
                borderRadius: 5,
                paddingHorizontal: 15,
                // marginStart: 5,
                paddingEnd:15,
                marginHorizontal:8,
                // width: tabBarItemWidth, // Set the tab item width based on focus

              }}>
              <Animated.Text
              numberOfLines={1}
              ellipsizeMode='tail'
                style={{
                  color: isFocused
                    ? COLORS?.white
                    : theme.colors.colorPrimary,
                  fontFamily: 'OpenSans-Medium',
                  fontSize:14.2
                  // fontWeight:'bold'
                }}>
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
        {/* <TabBarIndicator state={state} /> */}
      </ScrollView>
    </View>
  );
};
const OrderTopTabNav = () => {
  const theme = useContext(themeContext);
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      style={{
        // backgroundColor: theme?.colors?.toolbar_icon_bg,
        backgroundColor:theme?.colors?.bg_color_onBoard,
      }}
      screenOptions={{
        tabBarAndroidRipple: {borderless: false},
        swipeEnabled: true,
        tabBarScrollEnabled: true,
      }}
      onIndexChange={index => scrollToTab(index)} // Automatically scroll to the focused tab

      >
        
      {/*{flashTabData.map(item => (*/}
      {/*  <Tab.Screen*/}
      {/*    key={item.id}*/}
      {/*    name={item.name}*/}
      {/*    children={TrackOrderScreen}*/}
      {/*    initialParams={{item: item}}*/}
      {/*  />*/}
      {/*))}*/}
      <Tab.Screen
        key={flashTabData[0].id}
        name={flashTabData[0].name}
        children={() => <OrderListAll />}
        initialParams={{item: flashTabData[0]}}
      />

      <Tab.Screen
        key={flashTabData[1].id}
        name={flashTabData[1].name}
        children={() => <OrderListReceived />}
        initialParams={{item: flashTabData[1]}}
      />
      <Tab.Screen
        key={flashTabData[2].id}
        name={flashTabData[2].name}
        children={() => <OrderListProcessed />}
        initialParams={{item: flashTabData[2]}}
      />
      <Tab.Screen
        key={flashTabData[3].id}
        name={flashTabData[3].name}
        children={() => <OrderListShipped />}
        initialParams={{item: flashTabData[3]}}
      />

      <Tab.Screen
        key={flashTabData[4].id}
        name={flashTabData[4].name}
        children={() => <OrderListDelivered />}
        initialParams={{item: flashTabData[4]}}
      />
      <Tab.Screen
        key={flashTabData[5].id}
        name={flashTabData[5].name}
        children={() => <OrderListCancelled />}
        initialParams={{item: flashTabData[5]}}
      />
      <Tab.Screen
        key={flashTabData[6].id}
        name={flashTabData[6].name}
        // style={{marginEnd:20}}
        children={() => <OrderListReturned />}
        initialParams={{item: flashTabData[3]}}
      />
    </Tab.Navigator>
  );
};

export default OrderTopTabNav;
