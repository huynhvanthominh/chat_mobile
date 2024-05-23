import React from 'react';
import {View} from 'react-native';
import {styles} from './style';
import {SIZE} from '../../ styles';

interface IProps {
  children: React.ReactNode;
}

export default function AuthLayout({children}: IProps): React.JSX.Element {
  return (
    <View style={[SIZE.H_100, SIZE.W_100]}>
      <View style={[styles.container]}>{children}</View>
    </View>
  );
}
