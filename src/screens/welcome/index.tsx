import {View} from 'react-native';
import {styles} from './style';
import {Text} from '../../components';
import React, {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { getMe_action } from '../../libs/redux/auth/auth.action';
import { setToken } from '../../libs/axios';

interface IProps {
  navigation: any;
}
export default function WelCome({navigation}: IProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);  
  useEffect(() => {
    if(authState.token){
      setToken(authState.token)
      dispatch(getMe_action())
    }else{
      navigation.navigate('login')
    }
  }, [authState.token])
  useEffect(() => {
    if(authState.user){
      navigation.navigate('root')
    }
  }, [authState.user]);
  return (
    <View style={[styles.container]}>
      <Text h1>Welcome</Text>
      <Text h2>To</Text>
      <Text h1>Chat App</Text>
    </View>
  );
}
