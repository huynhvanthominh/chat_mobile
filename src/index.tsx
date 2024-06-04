import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/login';
import AuthLayout from './layouts/authlayout';
import WelCome from './screens/welcome';
import React, { useEffect } from 'react';
import Regsister from './screens/register';
import Message from './screens/message';
import { useSignalR } from './hooks/signalR.hook';
import { useAppDispatch, useAppSelector } from './libs/redux/hooks';
import AddFriend from './screens/addFriend';
import { SCREEN } from './constants/screen';
import { HomeStack } from './stacks';
import { ReceiveRequestAddFriend } from './screens';
import { PayloadResponse } from './interfaces/common.interface';
import { IRecieveRequestAddFriend } from './interfaces/user.interface';
import { addReceivedFriendRequest_action } from './libs/redux/contact/contract.action';
const Stack = createNativeStackNavigator();
interface IScreen {
  name: string;
  component: any;
  layout?: any;
  options?: any;
}
const screens: IScreen[] = [
  {
    name: SCREEN.HOME_STACK,
    component: HomeStack,
    options: {
      headerShown: false,
      title: "Home"
    }
  },
  {
    name: SCREEN.WELCOME_SCREEN,
    component: WelCome,
    options: {
      headerShown: false,
    },
  },
  {
    name: SCREEN.LOGIN_SCREEN,
    component: Login,
    layout: AuthLayout,
    options: {
      headerShown: false,
    },
  },
  {
    name: SCREEN.REGISTER_SCREEN,
    component: Regsister,
    layout: AuthLayout,
    options: {
      headerShown: false,
    },
  },
  {
    name: SCREEN.MESSAGE_SCREEN,
    component: Message,
    options: (({ route }: any) => {
      return ({
        title: route.params.title,
        headerRight: route.params?.headerRight,
        header: route.params?.header
      })
    })
  },
  {
    name: SCREEN.ADD_FRIEND_SCREEN,
    component: AddFriend,
    options: {
      title: "Add Friend"
    }
  }, {
    name: SCREEN.RECEIVE_REQUEST_ADD_FRIEND_SCREEN,
    component: ReceiveRequestAddFriend,
    options: {
      title: "Request"
    }
  }
];

export default function Index() {
  
  const authState = useAppSelector(state => state.auth);
  const { on, startConnection, connection } = useSignalR();
  const dispatch = useAppDispatch();


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
      on("ReceiveRequestAddFriend", (data: PayloadResponse<IRecieveRequestAddFriend> ) => {
        if(data.success) {
          dispatch(addReceivedFriendRequest_action(data.data))
        }
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
