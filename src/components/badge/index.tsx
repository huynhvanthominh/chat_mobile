import { View } from "react-native";
import { Badge as B, BadgeProps } from "react-native-elements";
import React from "react";
import { style } from "./style";
interface IProps extends BadgeProps {
    children: React.ReactNode;
}
export default function Badge({
    children,
    ...props
}: IProps): React.JSX.Element {
    return (
        <View style={[
            style.container
        ]}>
            <View style={style.badge}>
                <B {...props} />
            </View>
            {children}
        </View>
    );
}
