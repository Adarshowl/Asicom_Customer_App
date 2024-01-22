import {StyleSheet} from 'react-native';
import React from 'react';

const VegUrbanVectorIcon = props => {
  return (
    <props.title
      name={props?.name}
      size={props?.size}
      color={props?.color}
      style={props?.style}
      onPress={props?.onPress}
    />
  );
};

export default VegUrbanVectorIcon;

const styles = StyleSheet.create({});
