import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SCREEN } from "../constants/screen";
import { Navigation } from "../interfaces/navigation.interface";
import { useAppDispatch, useAppSelector } from "../libs/redux/hooks";
import { Friend, Setting } from "../screens";
import MessageStack from "./messages.stack";
import { Badge, Button, Icon } from "../components";
import { Image } from "react-native-elements";
import { View } from "react-native";
import { useEffect } from "react";
const Tab = createBottomTabNavigator();
interface IProps {
  navigation: Navigation
}
export default function HomeStack({ navigation }: IProps) {
  const dispatch = useAppDispatch();
  const contactState = useAppSelector(state => state.contact);
  const userState = useAppSelector(state => state.auth.user);
  const countReceiveRequestAddFriend = contactState?.countReceiveRequestAddFriend || 0;
  useEffect(() => {
    Promise.all([
      
    ])
  }, [])
  return (
    <Tab.Navigator initialRouteName="messageStack">
      <Tab.Screen name="contact" options={{
        title: "Contact",
        tabBarIcon: () => {
          return (
            countReceiveRequestAddFriend > 0 ? (
              <Badge value={countReceiveRequestAddFriend} status="error">
                <Icon name="id-badge" />
              </Badge>
            ) : (
              <Icon name="id-badge" />
            )
          )
        },
        headerLeft: () => {
          return <Button
            type="clear"
            onPress={() => {
              navigation.navigate(SCREEN.RECEIVE_REQUEST_ADD_FRIEND_SCREEN)
            }}
            icon={
              <View>
                {
                  countReceiveRequestAddFriend > 0 ? (
                    <Badge value={countReceiveRequestAddFriend} status="error">
                      <Icon name="list" />
                    </Badge>
                  ) : (
                    <Icon name="list" />
                  )
                }
              </View>
            } />
        },
        headerRight: () => {
          return <Button
            type="clear"
            onPress={() => {
              navigation.navigate(SCREEN.ADD_FRIEND_SCREEN)
            }}
            icon={
              <Icon name="user-plus" />
            } />
        }
      }} component={Friend} />
      <Tab.Screen name="messagesStack" options={{
        title: 'Messages',
        headerShown: false,
        tabBarIcon: () => {
          return <Icon name="message" />
        },
      }} component={MessageStack} />
      <Tab.Screen name="setting" options={{
        title: "Settings",
        tabBarIcon: () => {
          return <Image source={{
            uri: userState?.avatar || "https://www.w3schools.com/w3images/avatar2.png"
          }} style={{
            width: 24,
            height: 24,
            borderRadius: 12
          }} />
        },
        headerRight: () => {
          return <Button
            type="clear"
            icon={
              <Icon name="pen" size={24} />
            } />
        },
        headerLeft: () => {
          return <Button
            type="clear"
            icon={
              <Icon name="qrcode" size={24} />
            } />
        }
      }} component={Setting} />
    </Tab.Navigator>
  );
}
