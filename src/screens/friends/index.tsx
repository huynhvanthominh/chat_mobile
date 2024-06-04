import { Alert, FlatList, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { useLoading } from "../../hooks";
import { useEffect, useState } from "react";
import { getFriends_action } from "../../libs/redux/contact/contract.action";
import { Button, Space, Text } from "../../components";
import "../../extensions/array.extensions";
import { IFriend } from "../../interfaces/friend.interface";
import { style } from "./style";
import { SCREEN } from "../../constants/screen";
interface IItem {
  item: IFriend,
  onPress: () => void
}
const Item = ({
  item,
  onPress
}: IItem) => {
  return (
    <View>
      <TouchableOpacity onPress={() => onPress && onPress()}>
        <Text>Item</Text>
      </TouchableOpacity>
    </View>
  );
}
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
  const navigateToAddFriend = () => {
    navigation.navigate(SCREEN.ADD_FRIEND_SCREEN);
  }
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
        data={friends}
        renderItem={({ item }) => <Item item={item} onPress={() => {
          Alert.alert("Item pressed");
        }} />}
        keyExtractor={(item) => item.userId.toString()}
        onEndReached={() => {
          Alert.alert("End reached");
          setPage(page + 1);
        }}
      />
    </View>
  );
}
