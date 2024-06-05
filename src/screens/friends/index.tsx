import { Alert, FlatList, Image, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { useLoading } from "../../hooks";
import { useEffect, useState } from "react";
import { getFriends_action } from "../../libs/redux/contact/contract.action";
import { Button, Space, Text } from "../../components";
import "../../extensions/array.extensions";
import { IFriend } from "../../interfaces/friend.interface";
import { style } from "./style";
import { SCREEN } from "../../constants/screen";
import Item from "./item";
import { SIZE } from "../../ styles";

interface IProps {
  navigation: any
}
export default function Friend({ navigation }: IProps) {

  const dispatch = useAppDispatch();
  const contactState = useAppSelector((state) => state.contact);
  const getFriendsState = contactState?.getFriends;
  const friends = contactState?.friends;
  const [page, setPage] = useState(1);
  const [countPerPage] = useState(10);
  const { setLoading } = useLoading();


  const navigateToAddFriend = () => {
    navigation.navigate(SCREEN.ADD_FRIEND_SCREEN);
  }

  const navigateToChat = (friend: IFriend) => {
    navigation.navigate(SCREEN.MESSAGE_SCREEN, {
      id: friend.messageGroupId,
      title: friend.displayName || friend.username,
      headerRight: () => {
        return <Button type="clear" icon={
          <Image
            source={{ uri: friend.avatar }}
            style={style.headerAvatar}
          />
        } onPress={() => { }} />
      },
    });
  }

  useEffect(() => {
    setLoading(getFriendsState?.loading, "Loading friends...");
    setLoading(false);
  }, [getFriendsState]);

  useEffect(() => {
    dispatch(getFriends_action({
      paginate: {
        page,
        countPerPage
      }
    }));
  }, [page]);
  return (
    <View>
      {friends?.isEmpty() && (
        <View style={[
          style.noItem
        ]}>
          <Text h1>There is no friends</Text>
          <Text h5 center>Press the button below to add friends</Text>
          <Space size={10} />
          <Button title="Add friends" onPress={() => {
            navigateToAddFriend();
          }} />
        </View>
      )
      }
      <FlatList
        style={[
          SIZE.H_100
        ]}
        data={friends}
        renderItem={({ item }) => (
          <Item
            onPress={() => navigateToChat(item)}
            displayName={item.displayName}
            avatar={item.avatar}
            username={item.username}
          />
        )}
        keyExtractor={(item) => item.userId.toString()}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          setPage(page + 1);
        }}
        // ListFooterComponent={() => {
        //   return (
        //     getFriendsState?.loading ? <Button type="clear" loading={true} /> : null
        //   )
        // }}
      />
    </View>
  );
}
