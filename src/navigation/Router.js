import {StyleSheet} from 'react-native';
import React from 'react';
import BottomTabNav from './bottom_tab_nav';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        header: 'none',
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Home" component={BottomTabNav} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
