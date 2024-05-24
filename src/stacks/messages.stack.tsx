
import { Button, Icon } from "../components";
import Messages from "../screens/messages";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export default function MessageStack() {
    return (
        <Stack.Navigator initialRouteName="Messages">
            <Stack.Screen name="Messages" component={Messages}
                options={{
                    headerRight: () => {
                        return <Button
                            type="clear"
                            icon={
                                <Icon name="square-plus" size={24} />
                            } />
                    }
                }} />
            {/* <Stack.Screen name="Message" component={Message} /> */}
        </Stack.Navigator>
    );
}