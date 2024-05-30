import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, Input, Space, Text } from '../components';
import { DISPLAY, SIZE } from '../ styles';
import { useAppDispatch, useAppSelector } from '../libs/redux/hooks';
import { clearLogin_action, getMe_action, login_action } from '../libs/redux/auth/auth.action';
import { ILoginRequest } from '../interfaces/auth.interface';
import { useLoading } from '../hooks';

interface IProps {
  navigation: any;
}
export default function Login({ navigation }: IProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const loginState = authState.login;
  const { setLoading } = useLoading();
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
    setLoading(loginState.loading, 'Logging in...');
    if (loginState.error) {
      Alert.alert('Error', loginState.error, [{
        text: 'OK', onPress: () => {
          dispatch(clearLogin_action());
        }
      }]);
    }
    if (loginState.payload) {
      Alert.alert('Success', 'Login success', [{
        text: 'OK', onPress: () => {
          dispatch(clearLogin_action());
          dispatch(getMe_action());
        }
      }]);
    }
  }, [loginState]);


  useEffect(() => {
    dispatch(clearLogin_action());
  }, []);
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
