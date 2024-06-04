import React, { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { DISPLAY, SIZE } from '../../ styles';
import { Button, Input, Space, Text } from '../../components';
import { useLoading } from '../../hooks';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { clearRegister_action, register_action } from '../../libs/redux/auth/auth.action';
import { SCREEN } from '../../constants/screen';

interface IProps {
  navigation: any;
}
export default function Regsister({ navigation }: IProps): React.JSX.Element {

  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [displayName, setDisplayName] = React.useState<string>('');
  const { setLoading } = useLoading();
  const registerState = useAppSelector((state) => state.auth.register);
  const dispatch = useAppDispatch();
  const loginOnClick = () => {
    navigation.navigate(SCREEN.LOGIN_SCREEN);
  }
  const registerOnClick = () => {
    dispatch(register_action({
      username: username,
      password: password,
      confirmPassword: confirmPassword,
      displayName: displayName
    }));
  }
  useEffect(() => {
    setLoading(registerState.loading, 'Registering...');
    if (registerState.error) {
      Alert.alert('Error', registerState.error, [{
        text: 'OK', onPress: () => {
          dispatch(clearRegister_action())
        }
      }]);
    }
    if (registerState.payload) {
      Alert.alert('Success', 'Register success', [{
        text: 'OK', onPress: () => {
          dispatch(clearRegister_action())
          navigation.navigate(SCREEN.LOGIN_SCREEN);
        }
      }]);
    }
  }, [registerState])
  return (
    <View style={[SIZE.W_80]}>
      <View style={[DISPLAY.flex_row, DISPLAY.justify_center]}>
        <Text h1>Register</Text>
      </View>
      <View>
        <Input placeholder="Username" onChangeText={e => setUsername(e)} />
      </View>
      <View>
        <Input placeholder="Password" secureTextEntry={true} onChangeText={e => setPassword(e)} />
      </View>
      <View>
        <Input placeholder="Confirm Password" secureTextEntry={true} onChangeText={e => setConfirmPassword(e)} />
      </View>
      <View>
        <Input placeholder="Display Name" onChangeText={e => setDisplayName(e)} />
      </View>
      <View style={[DISPLAY.flex_row, SIZE.W_100]}>
        <Button title={'Register'} containerStyle={[SIZE.W_50]} onPress={() => registerOnClick()} />
        <Space size={1} />
        <Button title="Login" containerStyle={[SIZE.W_50]} onPress={() => loginOnClick()} />
      </View>
    </View>
  );
}
