import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Friend from "../friend";
import MessageStack from "../../stacks/messages.stack";
import Profile from "../profile";

const Tab = createBottomTabNavigator();
export default function Root() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="messagesStack" options={{
        title: 'Messages',
        headerShown: false
      }} component={MessageStack} />
      <Tab.Screen name="friend" component={Friend} />
      <Tab.Screen name="profile" options={{
        title: "Profile"
      }} component={Profile} />
    </Tab.Navigator>
  );
}
