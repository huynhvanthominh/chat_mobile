import { FlatList, View } from "react-native";
import { Text } from "../../components";
import { useAppSelector } from "../../libs/redux/hooks";
import Item from "./item";

export default function ReceiveRequestAddFriend() {
    const contactState = useAppSelector(state => state.contact);
    const receiveRequestAddFriend = contactState.receiveRequestAddFriendList || [];
    return (
        <View>
            <FlatList
                data={receiveRequestAddFriend}
                renderItem={({ item }) => (<Item {...item} onAccept={() => { }} onPress={() => { }} onDecline={() => { }} />)}
            />
        </View>
    )
}