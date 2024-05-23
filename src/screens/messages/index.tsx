import { useEffect, useState } from "react";
import { Alert, FlatList, TouchableOpacity, View } from "react-native";
import { Image, ListItem } from 'react-native-elements';
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { messages_action } from "../../libs/redux/message/message.action";
import { IMessages } from "../../interfaces/message.interface";
import { Button, Text } from "../../components";
import { style } from "./style";
import { DISPLAY, TEXT } from "../../ styles";

interface IItemProps {
  item: IMessages;
  onPress?: () => void;
}

const Item = ({ item, onPress }: IItemProps) => {
  return (
    <TouchableOpacity style={[
      DISPLAY.flex_row,
      style.item,]}
      onPress={() => onPress && onPress()}
    >
      <View>
        <Image
          source={{ uri: item.avatar || "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1" }}
          style={style.itemAvatar}
        />
      </View>
      <View>
        <Text style={[
          TEXT.default
        ]}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

interface IMessagesProps {
  navigation: any;
}
export default function Messages({ navigation }: IMessagesProps) {

  const [page, setPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(1);
  const messageState = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(messages_action({
      paginate: {
        page,
        countPerPage
      }
    }))
  }, [page, countPerPage])
  return (
    <View>
      <FlatList
        keyExtractor={(item, index) => item.id.toString() + "-" + index.toString()}
        data={messageState?.messagesList || []}
        renderItem={({ item }) => <Item item={item} onPress={() => navigation.navigate("Message", {
          id: item.id,
          title: item.name,
          headerRight: () => {
            return <Button type="clear" icon={
              <Image
                source={{ uri: item.avatar || "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1" }}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15
                }}
              />
            } onPress={() => { }} />
          },
        })} />}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          setPage(page + 1);
        }}
        refreshing={true}
      />
    </View>
  );
}
