import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { fontSizes } from '@/utils/styleVariables';

export function RoundedButton({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) {
  return (
    <TouchableOpacity
      style={[styles(size).radius, style]}
      onPress={props.onPress}
    >
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = (size: number) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#fff',
      borderWidth: 2,
    },
    text: { color: '#fff', fontSize: fontSizes.md },
  });
