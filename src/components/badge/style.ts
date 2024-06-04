import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        position: "relative",
        zIndex: 1
    },
    badge: {
        position: "absolute",
        zIndex: 2,
        top: -5,
        right: -5
    }
});