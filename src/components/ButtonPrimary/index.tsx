import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface ButtonPrimaryProps {
  title: string;
  onPress: () => void;
}

export function ButtonPrimary({ title, onPress }: ButtonPrimaryProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

