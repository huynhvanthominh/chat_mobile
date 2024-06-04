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
    onAccept: () => void;
    onDecline: () => void;
}
export default function Item({
    displayName,
    username,
    avatar,
    onAccept,
    onDecline,
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
                <View style={
                    DISPLAY.flex_row
                }>
                    <Button type="clear" onPress={() => onAccept && onAccept()}
                        icon={<Icon name='check' color={"green"} />}
                    />
                    <Space />
                    <Button type="clear" onPress={onDecline}
                        icon={<Icon name="xmark" color={"red"} />} />
                </View>
            </View>
            <Space />
            <Border bottom />
        </View>
    )
}