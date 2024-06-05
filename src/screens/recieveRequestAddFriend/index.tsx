import { FlatList, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import Item from "./item";
import { acceptRequestMakeFriend_action, removeReceivedMakeFriendRequest_action } from "../../libs/redux/contact/contract.action";
import { useEffect } from "react";

export default function ReceiveRequestAddFriend() {
    const contactState = useAppSelector(state => state.contact);
    const receiveRequestAddFriendList = contactState.receiveRequestAddFriendList || [];
    const acceptRequestMakeFriendState = contactState.acceptRequestMakeFriend || {};
    const rejectRequestMakeFriendState = contactState.rejectRequestMakeFriend || {};
    const dispatch = useAppDispatch();
    const onAccept = (userId: number) => {
        dispatch(acceptRequestMakeFriend_action({
            userId,
        })).then(() => {
            dispatch(removeReceivedMakeFriendRequest_action(userId))
        })
    }
    const onDecline = (userId: number) => {
        dispatch(removeReceivedMakeFriendRequest_action(userId)).then(() => {
            dispatch(removeReceivedMakeFriendRequest_action(userId))
        })
    }

    return (
        <View>
            <FlatList
                data={receiveRequestAddFriendList}
                renderItem={({ item }) => (<Item
                    {...item}
                    onAcceptLoading={acceptRequestMakeFriendState.get(item.id)?.loading || false}
                    onDeclineLoading={rejectRequestMakeFriendState.get(item.id)?.loading || false}
                    onAccept={() => onAccept(item.id)}
                    onPress={() => { }}
                    onDecline={() => onDecline(item.id)} />)}
            />
        </View>
    )
}