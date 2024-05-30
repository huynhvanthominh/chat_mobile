import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Friend from "../friends";
import MessageStack from "../../stacks/messages.stack";
import Profile from "../profile";
import { Button, Icon } from "../../components";
import { useAppSelector } from "../../libs/redux/hooks";
import { Image } from "react-native-elements";
import Setting from "../setting";
import { useEffect } from "react";
import { Navigation } from "../../interfaces/navigation.interface";
import { SCREEN } from "../../constants/screen";

const Tab = createBottomTabNavigator();
interface IProps {
  navigation: Navigation
}
export default function Root({ navigation }: IProps) {
  
  const userState = useAppSelector(state => state.auth.user);
  return (
    <Tab.Navigator initialRouteName="messageStack">
      <Tab.Screen name="contact" options={{
        title: "Contact",
        tabBarIcon: () => {
          return <Icon name="id-badge" size={24} />
        },
        headerRight: () => {
          return <Button
            type="clear"
            onPress={() => {
              navigation.navigate(SCREEN.ADD_FRIEND)
            }}
            icon={
              <Icon name="user-plus" size={24} />
            } />
        }
      }} component={Friend} />
      <Tab.Screen name="messagesStack" options={{
        title: 'Messages',
        headerShown: false,
        tabBarIcon: () => {
          return <Icon name="message" size={24} />
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
