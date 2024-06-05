import { TouchableOpacity, View } from "react-native";
import { DISPLAY, SIZE, SPACE } from "../../ styles";
import { Image } from "react-native-elements";
import { Border, Button, Icon, Space, Text } from "../../components";
import { style } from "./style";

interface ItemProps {
    displayName: string;
    username: string;
    avatar: string;
    onPress: () => void;
}
export default function Item({
    displayName,
    username,
    avatar,
    onPress
}: ItemProps) {
    return (
        <View style={[
            SIZE.W_100,
            SPACE.P
        ]}>
            <View style={[
                DISPLAY.flex_row,
                DISPLAY.align_center,
            ]}>
                <TouchableOpacity
                    onPress={onPress}
                    style={[
                        DISPLAY.flex_row,
                        DISPLAY.flex_1,
                        DISPLAY.align_center,
                    ]}>
                    <Image source={{ uri: avatar }} style={
                        style.avatar
                    } />
                    <Space />
                    <View>
                        <Text>{displayName}</Text>
                        <Text h5>{username}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Space />
            <Border bottom />
        </View>
    )
}