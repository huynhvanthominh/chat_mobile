import React, { useEffect } from 'react';
import Index from './src';
import 'react-native-url-polyfill/auto';
import SignalRProvider from './src/providers/signalR.provider';
import ReduxProvider from './src/providers/redux.provider';
import LoadingProvider from './src/providers/loading.provider';
// import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
function App(): React.JSX.Element {
  useEffect(() => {
    requestUserPermission();
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });

    // return unsubscribe;
  }, []);

  const requestUserPermission = async () => {
    // const authStatus = await messaging().requestPermission();
    // const enabled =
    //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    // if (enabled) {
    //   console.log('Authorization status:', authStatus);
    // }
  };

  const getToken = async () => {
    // const token = await messaging().getToken();
    // console.log('FCM Token:', token);
    // Send this token to your server to save it and use for sending notifications
  };

  useEffect(() => {
    getToken();
  }, []);
  return (
    <LoadingProvider>
      <SignalRProvider>
        <ReduxProvider>
          <Index />
        </ReduxProvider>
      </SignalRProvider>
    </LoadingProvider>);
}

export default App;
