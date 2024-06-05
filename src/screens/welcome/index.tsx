import { Alert, View } from 'react-native';
import { styles } from './style';
import { Text } from '../../components';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { clearGetMe_action, getMe_action } from '../../libs/redux/auth/auth.action';
import { setToken } from '../../libs/axios';
import { useLoading, useSignalR } from '../../hooks';
import { SCREEN } from '../../constants/screen';
import { getReceivedFriendRequest_action } from '../../libs/redux/contact/contract.action';

interface IProps {
  navigation: any;
}
export default function WelCome({ navigation }: IProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const { setLoading } = useLoading();
  const { stopConnection } = useSignalR()
  useEffect(() => {
    if (authState.token) {
      setToken(authState.token)
      dispatch(getMe_action())
    } else {
      stopConnection();
      navigation.navigate(SCREEN.LOGIN_SCREEN)
    }
  }, [authState.token])
  useEffect(() => {
    setLoading(authState.getMe?.loading, 'Getting user...');
    if (authState.getMe?.error) {
      Alert.alert('Error', authState.getMe?.error, [{
        text: 'OK', onPress: () => {
          dispatch(clearGetMe_action());
        }
      }]);
    }
    if (authState.user) {
      (async () => {
        Promise.all([
          dispatch(getReceivedFriendRequest_action({
            paginate: {
              page: 1,
              countPerPage: 10
            }
          }))
        ])
        navigation.navigate(SCREEN.HOME_STACK)
      }
      )();
    }
  }, [authState.getMe])
  return (
    <View style={[styles.container]}>
      <Text h1>Welcome</Text>
      <Text h2>To</Text>
      <Text h1>Chat App</Text>
    </View>
  );
}
