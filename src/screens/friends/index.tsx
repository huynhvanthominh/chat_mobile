import { FlatList, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { useLoading } from "../../hooks";
import { useEffect, useState } from "react";
import { getFriends_action } from "../../libs/redux/contact/contract.action";
import { Text } from "../../components";
import "../../extensions/array.extensions";
export default function Friend() {

  const dispatch = useAppDispatch();
  const contactState = useAppSelector((state) => state.contact);
  const getFriendsState = contactState?.getFriends;
  const friends = contactState?.friends;
  const [page, setPage] = useState(1);
  const [countPerPage] = useState(10);
  const { setLoading } = useLoading();
  useEffect(() => {
    setLoading(getFriendsState.loading, "Loading friends...");
    setLoading(false);
  }, [getFriendsState]);
  useEffect(() => {
    dispatch(getFriends_action({
      paginate: {
        page,
        countPerPage
      }
    }));
  }, []);

  return (
    <View>
      {friends?.isEmpty() && (
        <View>
          <Text>No friends</Text>
        </View>
      )
      }
    </View>
  );
}
