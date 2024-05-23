
import Message from "../screens/message";
import Messages from "../screens/messages";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export default function MessageStack() {
    return (
        <Stack.Navigator initialRouteName="Messages">
            <Stack.Screen name="Messages" component={Messages} />
            {/* <Stack.Screen name="Message" component={Message} /> */}
        </Stack.Navigator>
    );
}