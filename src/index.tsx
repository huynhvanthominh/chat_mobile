import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/login';
import AuthLayout from './layouts/authlayout';
import WelCome from './screens/welcome';
import React, { useEffect } from 'react';
import Regsister from './screens/register';
import Root from './screens/root';
import Message from './screens/message';
import { useSignalR } from './hooks/signalR.hook';
import { useAppSelector } from './libs/redux/hooks';
const Stack = createNativeStackNavigator();
interface IScreen {
  name: string;
  component: any;
  layout?: any;
  options?: any;
}
export default function Index() {
  const screens: IScreen[] = [
    {
      name: 'root',
      component: Root,
      options: {
        headerShown: false,
        title: "Messages"
      }
    },
    {
      name: 'welcome',
      component: WelCome,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'login',
      component: Login,
      layout: AuthLayout,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'register',
      component: Regsister,
      layout: AuthLayout,
      options: {
        headerShown: false,
      },
    },
    {
      name: 'Message',
      component: Message,
      options: {
      }
    }
  ];
  const authState = useAppSelector(state => state.auth);
  const { on, startConnection, connection } = useSignalR();
  useEffect(() => {
    if (authState.token) {
      startConnection(`${process.env.API_URL}/hub`, authState.token);
    }
  }, [authState.token]);
  useEffect(() => {
    if (connection) {
      on("receivesystemmessage", (message: string) => {
        console.log("ReceiveSystemMessage", message);
      })
    }
  }, [connection])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='welcome'>
        {screens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            options={
              screen.options || {
                headerLeft: null,
              }
            }
          >
            {(props) => {
              if (screen.layout) {
                return (
                  <screen.layout {...props}>
                    <screen.component {...props} />
                  </screen.layout>
                );
              }
              return <screen.component {...props} />;
            }}
          </Stack.Screen>
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
