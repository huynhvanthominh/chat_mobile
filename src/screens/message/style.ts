import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    itemContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 10,
    },
    item: {
        alignSelf: 'flex-start',
        borderRadius: 20,
        backgroundColor: 'white',
        width: 'auto',
        padding: 10,
    },
    itemAvatar: { 
        width: 50, 
        height: 50, 
        borderRadius: 25,
    },
    itemContainerMe: {
        flexDirection: 'row-reverse',
    },
    action:{
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: 'gray',
        padding: 10,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
    },
    actionInput:{
        flex: 1,
    }
})