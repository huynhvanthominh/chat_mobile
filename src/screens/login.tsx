import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, Input, Space, Text } from '../components';
import { DISPLAY, SIZE } from '../ styles';
import { useAppDispatch, useAppSelector } from '../libs/redux/hooks';
import { getMe_action, login_action } from '../libs/redux/auth/auth.action';
import { ILoginRequest } from '../interfaces/auth.interface';
import { useSignalR } from '../hooks/signalR.hook';

interface IProps {
  navigation: any;
}
export default function Login({ navigation }: IProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const [payload, setPayload] = useState<ILoginRequest>({
    username: '',
    password: '',
  });
  const registerOnClick = () => {
    navigation.navigate('register');
  };

  const loginOnClick = () => {
    dispatch(login_action(payload));
  };

  useEffect(() => {
    if (authState.token) {
      dispatch(getMe_action());
    }
    if (authState.login.error) {
      Alert.alert('Error', authState.login.error)
    }
  }, [authState.login, authState.token])

  useEffect(() => {
    if (authState.user) {
      navigation.navigate('root');
    }
  }, [authState.user])
  return (
    <View style={[SIZE.W_80]}>
      <View style={[DISPLAY.flex_row, DISPLAY.justify_center]}>
        <Text h1>Login</Text>
      </View>
      <View>
        <Input placeholder="Username" onChangeText={e => setPayload({
          ...payload,
          username: e
        })} />
      </View>
      <View>
        <Input placeholder="Password" secureTextEntry={true}
          onChangeText={(e) => setPayload({
            ...payload,
            password: e
          })} />
      </View>
      <View style={[DISPLAY.flex_row, SIZE.W_100]}>
        <Button
          title="Login"
          containerStyle={[SIZE.W_50]}
          onPress={() => loginOnClick()}
        />
        <Space size={1} />
        <Button
          title={'Register'}
          containerStyle={[SIZE.W_50]}
          onPress={() => registerOnClick()}
        />
      </View>
    </View>
  );
}
