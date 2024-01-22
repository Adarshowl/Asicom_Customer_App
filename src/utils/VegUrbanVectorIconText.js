import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const VegUrbanVectorIconText = props => {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        props.wrapperStyle,
      ]}
      activeOpacity={0.8}
      onPress={props?.onPress}>
      <props.title
        name={props?.name}
        size={props?.size}
        color={props?.color}
        style={props?.style}
        onPress={props?.onPress}
      />
      <Text style={props?.textStyle}>{props?.text}</Text>
    </TouchableOpacity>
  );
};

export default VegUrbanVectorIconText;

const styles = StyleSheet.create({});

