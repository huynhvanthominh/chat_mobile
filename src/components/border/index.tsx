import { View } from "react-native";

interface IProps {
    bottom?: boolean;
    top?: boolean;
    left?: boolean;
    right?: boolean;
}
export default function Border({
    bottom,
    top,
    left,
    right
}: IProps){
    return <View style={{
        borderBottomWidth: bottom ? 1 : 0,
    }}></View>
}