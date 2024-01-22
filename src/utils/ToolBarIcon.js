import React from 'react';
import {I18nManager, TouchableOpacity} from 'react-native';
import GlobalStyle from '../styles/GlobalStyle';

const ToolBarIcon = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props?.onPress}
      style={[GlobalStyle.toolbarLastIconBg, props?.style]}>
      <props.title
        name={props?.iconName}
        size={props?.icSize}
        color={props?.icColor}
        style={{transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}
      />
    </TouchableOpacity>
  );
};
export default ToolBarIcon;
