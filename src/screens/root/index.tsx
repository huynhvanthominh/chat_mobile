import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Friend from "../friend";
import MessageStack from "../../stacks/messages.stack";
import Profile from "../profile";
import { Icon } from "../../components";
import { useAppSelector } from "../../libs/redux/hooks";
import { Image } from "react-native-elements";

const Tab = createBottomTabNavigator();
export default function Root() {
  const userState = useAppSelector(state => state.auth.user);
  return (
    <Tab.Navigator initialRouteName="messageStack">
      <Tab.Screen name="contact" options={{
        title: "Contact",
        tabBarIcon: () => {
          return <Icon name="id-badge" size={24} />
        }
      }} component={Friend} />
      <Tab.Screen name="messagesStack" options={{
        title: 'Messages',
        headerShown: false,
        tabBarIcon: () => {
          return <Icon name="message" size={24} />
        }
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
        }
      }} component={Profile} />
    </Tab.Navigator>
  );
}
