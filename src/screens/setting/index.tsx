import { FlatList, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-elements";
import { DISPLAY, SIZE } from "../../ styles";
import { style } from "./style";
import { Icon, Space, Text } from "../../components";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { logout_action } from "../../libs/redux/auth/auth.action";

interface ItemProps {
    title: string;
    onPress: () => void;
}
const Item = ({ title, onPress }: ItemProps) => {
    return (
        <TouchableOpacity style={{
            paddingLeft: 10,
            paddingRight: 10
        }} onPress={
            () => onPress && onPress()
        }>
            <View style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 20,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Text>{title}</Text>
                <Icon name="chevron-right" />
            </View>
            <Space size={10} />
        </TouchableOpacity>
    )
}
export default function Setting() {
    const authState = useAppSelector(state => state.auth);
    const userState = authState?.user;
    const dispatch = useAppDispatch();
    const list = [
        {
            title: "Profile",
            onPress: () => { }
        },
        {
            title: "Change Password",
            onPress: () => { }
        },
        {
            title: "Logout",
            onPress: () => {
                dispatch(logout_action())
             }
        }
    ]
    return (
        <View style={[SIZE.H_100, SIZE.W_100]}>
            <Space size={20} />
            <View style={[
                style.info
            ]}>
                <View style={[
                    SIZE.W_100,
                    DISPLAY.flex,
                    DISPLAY.flex_row,
                    DISPLAY.justify_center,
                ]}>
                    <Image source={{
                        uri: userState?.avatar || "https://www.w3schools.com/w3images/avatar2.png"
                    }} style={[
                        style.avatar
                    ]} />
                </View>
                <View style={[
                    DISPLAY.flex,
                    DISPLAY.align_center,
                ]}>
                    <Text>{userState?.displayName}</Text>
                    <Text>{userState?.username}</Text>
                </View>
            </View>
            <Space size={20} />
            <FlatList
                data={list}
                renderItem={({ item }) => <Item {...item} />}
            />
        </View>
    )
}