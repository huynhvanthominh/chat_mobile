import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { Border, Button, Icon, Input, Space, Text } from "../../components";
import { DISPLAY, SIZE } from "../../ styles";
import { addFriend_action, searchFriends_action } from "../../libs/redux/contact/contract.action";
import { IUser } from "../../interfaces/user.interface";
import { Image } from "react-native-elements";
import { useDebounce, useSignalR } from "../../hooks";
import { IAddFriendRequest } from "../../interfaces/friend.interface";
interface ItemProps {
    item: IUser;
    onPress?: () => void;
}
const Item = ({ item, onPress }: ItemProps) => {
    return (
        <View style={[
            SIZE.W_100,
            {
                padding: 16,
            }
        ]}>
            <View style={[
                DISPLAY.flex_row,
                DISPLAY.align_center
            ]}>
                <Image source={{ uri: item.avatar }} style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                }} />
                <Space size={8} />
                <View>
                    <Text>{item.displayName}</Text>
                    <Text h5>{item.username}</Text>
                </View>
                <View style={{
                    alignItems: "flex-end",
                    flex: 1,
                }}>
                    <Button type="clear" icon={
                        <Icon name="plus" size={24} />
                    } onPress={() => onPress && onPress()} />
                </View>
            </View>
            <Space size={8} />
            <Border bottom />
        </View>
    )
}

export default function AddFriend() {
    const [page, setPage] = useState(1);
    const [countPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const valueSearch = useDebounce(search, 500);
    const dispatch = useAppDispatch();
    const contactState = useAppSelector((state) => state.contact);
    const searchFriendsList = contactState?.searchFriendsList ?? [];
    const { send, on } = useSignalR();
    useEffect(() => {
        dispatch(searchFriends_action({
            paginate: {
                search: valueSearch,
                page,
                countPerPage
            }
        }));
    }, [page, valueSearch]);

    const onAddFriend = (userId: number) => {
        send("SendRequestAddFriend", {
            userId
        } as IAddFriendRequest)
    }
    useEffect(() => {
        on("ReceiveRequestAddFriend", (data: any) => {
            console.log(data);
        })
        on("SendRequestAddFriend", (data: any) => {
            console.log(data);
        })
    }, [])
    return (
        <View style={[
            SIZE.W_100,
            SIZE.H_100
        ]}>
            <View style={[
                SIZE.W_100,
                DISPLAY.flex,
                DISPLAY.flex_row,
            ]}>
                <Input containerStyle={{
                    flex: 1,
                }}
                    rightIcon={
                        <Icon name="magnifying-glass" size={24} />
                    }
                    placeholder="Enter username or display name"
                    value={search}
                    onChangeText={(text) => {
                        setSearch(text);
                    }}
                />
            </View>
            <FlatList
                style={
                    {
                        flex: 1,
                    }
                }
                data={searchFriendsList}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Item item={item} onPress={() => onAddFriend(item.id)} />}
                onEndReached={() => setPage(page + 1)}
                refreshing={true}
            />
        </View>
    )
}