import { Alert, FlatList, KeyboardAvoidingView, View } from "react-native";
import { Button, Icon, Input, Text } from "../../components";
import { useCallback, useEffect, useRef, useState } from "react";
import { style } from "./style";
import { SIZE, TEXT } from "../../ styles";
import { Image } from "react-native-elements";
import { IMessage, ISendMessageBody } from "../../interfaces/message.interface";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { addMessage_action, getMessage_action } from "../../libs/redux/message/message.action";
import { useSignalR } from "../../hooks/signalR.hook";
import { COMMON } from "../../constants/common";
import DocumentPicker from 'react-native-document-picker';
interface IItemProps {
    item: IMessage;
    me: boolean;
    onPress?: () => void;
}
const Item = ({ item, me }: IItemProps) => {
    return (
        <View style={[
            style.itemContainer,
            me && style.itemContainerMe
        ]}>
            <View>
                <Image
                    source={{ uri: item.avatar || "https://www.w3schools.com/w3images/avatar2.png" }}
                    style={style.itemAvatar}
                />
            </View>
            <View style={style.item}>
                <Text style={[
                    TEXT.default
                ]}>{item.message}</Text>
            </View>
        </View>
    )

}

interface IMessageProps {
    navigation: any;
    route: any;
}
export default function Message({ navigation, route }: IMessageProps) {
    const flatListRef = useRef<any>();
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState<string>("");
    const dispatch = useAppDispatch();
    const messageState = useAppSelector(state => state.message.messageList);
    const userState = useAppSelector(state => state.auth.user);
    const { on, send, connection } = useSignalR();
    const id = route.params?.id;
    const [fileResponse, setFileResponse] = useState<any>([]);

    const handleDocumentSelection = useCallback(async () => {
        try {
          const response = await DocumentPicker.pick()
          console.log(response);
        } catch (err) {
          console.warn(err);
        }
      }, []);
    const sendOnClick = () => {
        if (!id) {
            Alert.alert("Error", "Please select a user to send message");
            return;
        }
        if (message.trim() === "") return;
        const payload: ISendMessageBody = {
            message,
            messageGroupId: id
        }
        send("SendMessage", payload);
        setMessage("");
        scrollToEnd();
    }
    const scrollToEnd = () => {
        if (!flatListRef) return;
        // flatListRef?.current?.scrollToEnd({ animated: true });
    }
    useEffect(() => {
        if (connection) {
            on("receivemessage", (message: IMessage) => {
                dispatch(addMessage_action(message));
                flatListRef?.current?.scrollToStart({ animated: true });
            })
        }
    }, [connection])
    useEffect(() => {
        if (navigation) {
            navigation.setOptions({
                headerRight: route.params?.headerRight
            })
        }
    }, [navigation])
    useEffect(() => {
        if (id) {
            dispatch(getMessage_action({
                messageGroupId: id,
                paginate: {
                    page,
                    countPerPage: COMMON.COUNT_PER_PAGE
                }
            }))
        }
    }, [id, page])
    useEffect(() => {
        scrollToEnd()
    }, [flatListRef])
    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
            <View style={[
                SIZE.W_100,
                SIZE.H_100
            ]}>
                <View style={{
                    flexGrow: 1
                }}>

                    <FlatList
                        style={{
                            marginBottom: 100,
                            paddingBottom: 100,
                        }}
                        ref={flatListRef}
                        inverted={true}
                        data={messageState.find(item => item.id === id)?.messages || []}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => <Item item={item} me={userState?.id === item.userId} />}
                        onEndReached={() => {
                            setPage(page + 1);
                        }}
                    />
                </View>
                <View style={[style.action]}>
                    <Button type="clear" icon={
                        <Icon name="paperclip" size={30} />
                    }
                    onPress={() => handleDocumentSelection()}
                    />
                    <Input containerStyle={[style.actionInput]} value={message} onChangeText={e => setMessage(e)}
                    />
                    <Button type="clear" icon={
                        <Icon name="face-laugh" size={30} />
                    } onPress={() => sendOnClick()}></Button>
                    <Button type="clear" icon={
                        <Icon name="paper-plane" size={30} />
                    } onPress={() => sendOnClick()}></Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}