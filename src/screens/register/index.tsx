import React from 'react';
import { View } from 'react-native';
import { DISPLAY, SIZE } from '../../ styles';
import { Button, Input, Space, Text } from '../../components';

interface IProps {
    navigation: any;
}
export default function Regsister({navigation}: IProps): React.JSX.Element {

    const loginOnClick = () => {
        navigation.navigate('login');
    }
  return (
    <View style={[SIZE.W_80]}>
      <View style={[DISPLAY.flex_row, DISPLAY.justify_center]}>
        <Text h1>Register</Text>
      </View>
      <View>
        <Input placeholder="Username" />
      </View>
      <View>
        <Input placeholder="Password" secureTextEntry={true} />
      </View>
      <View>
        <Input placeholder="Confirm Password" secureTextEntry={true} />
      </View>
      <View style={[DISPLAY.flex_row, SIZE.W_100]}>
        <Button title={'Register'} containerStyle={[SIZE.W_50]} />
        <Space size={1} />
        <Button title="Login" containerStyle={[SIZE.W_50]} onPress={() => loginOnClick()}/>
      </View>
    </View>
  );
}
