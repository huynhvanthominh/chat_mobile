import { FlatList, View } from "react-native";
import { Text } from "../../components";
import { useAppDispatch } from "../../libs/redux/hooks";
import { logout_action } from "../../libs/redux/auth/auth.action";

interface IProps{
    navigation: any;
}
export default function Profile({navigation}: IProps) {
    const dispatch = useAppDispatch();
    const logoutOnClick = () => {
        dispatch(logout_action());
        navigation.navigate("login")
    }
    return (
        <View>
            <Text onPress={() => logoutOnClick()}>Logout</Text>
        </View>
    )
}