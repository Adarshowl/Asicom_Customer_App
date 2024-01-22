import React, {useContext, useState} from 'react';

import {TouchableOpacity, View} from 'react-native';
import themeContext from '../constants/themeContext';

const CustomSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  icon1,
  icon2,
  onSelectSwitch,
  selectionColor,
  bgColor,
}) => {
  const theme = useContext(themeContext);
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View>
      <View
        style={{
          height: 25,
          width: 50,
          backgroundColor: theme.colors.bg_color,
          borderRadius: 25,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2,
          marginHorizontal: 10,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,
            backgroundColor: theme.colors.bg_color,

            // backgroundColor: getSelectionMode == 1 ? selectionColor : 'white',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/*<Text*/}
          {/*  style={{*/}
          {/*    color: getSelectionMode == 1 ? 'white' : selectionColor,*/}
          {/*  }}>*/}
          {/*  {option1}*/}
          {/*</Text>*/}
          {icon1}
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,
            backgroundColor: theme.colors.bg_color,

            // backgroundColor: getSelectionMode == 2 ? selectionColor : 'white',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/*<Text*/}
          {/*  style={{*/}
          {/*    color: getSelectionMode == 2 ? 'white' : selectionColor,*/}
          {/*  }}>*/}
          {/*  /!*{option2}*!/*/}
          {/*</Text>*/}
          {icon2}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;
