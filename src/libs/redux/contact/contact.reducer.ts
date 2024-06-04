import { createSlice } from "@reduxjs/toolkit";
import { addFriend_action, addReceivedFriendRequest_action, getFriends_action, searchFriends_action } from "./contract.action";
import { IFriend } from "../../../interfaces/friend.interface";
import { IRecieveRequestAddFriend, IUser } from "../../../interfaces/user.interface";
export interface ContactState {
    getFriends: {
        loading: boolean;
        error: string | null;
        data: IFriend[];
    },
    friends: IFriend[],
    seachFriends: {
        loading: boolean;
        error: string | null;
        data: IUser[];
    },
    searchFriendsList: IUser[],
    addFriend: {
        loading: boolean;
        error: string | null;
    },
    receiveRequestAddFriend: {
        loading: boolean;
        error: string | null;
        data: IRecieveRequestAddFriend[];
    },
    receiveRequestAddFriendList: IRecieveRequestAddFriend[],
    countReceiveRequestAddFriend: number;
}
const initialState: ContactState = {
    getFriends: {
        loading: false,
        error: null,
        data: [],
    },
    friends: [],
    seachFriends: {
        loading: false,
        error: null,
        data: [],
    },
    searchFriendsList: [],
    addFriend: {
        loading: false,
        error: null,
    },
    receiveRequestAddFriend: {
        loading: false,
        error: null,
        data: [],
    },
    receiveRequestAddFriendList: [],
    countReceiveRequestAddFriend: 0,
}
const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // get friends
        builder.addCase(getFriends_action.pending, (state) => {
            if (!state.getFriends) {
                state.getFriends = initialState.getFriends;
                state.friends = initialState.friends;
            }
            state.getFriends.loading = true;
            state.getFriends.error = null;
        });

        builder.addCase(getFriends_action.fulfilled, (state, action) => {
            state.getFriends.loading = false;
            state.getFriends.data = action.payload.data;
            state.friends = state.friends.addUnique(action.payload.data, "id");
        });

        builder.addCase(getFriends_action.rejected, (state, action) => {
            state.getFriends.loading = false;
            state.getFriends.error = action.payload as string;
        });

        // search friends
        builder.addCase(searchFriends_action.pending, (state) => {
            state.seachFriends.loading = true;
            state.seachFriends.error = null;
        });

        builder.addCase(searchFriends_action.fulfilled, (state, action) => {
            state.seachFriends.loading = false;
            state.seachFriends.data = action.payload.data;
            state.searchFriendsList = state.searchFriendsList.addUnique(action.payload.data, "id");
        });

        builder.addCase(searchFriends_action.rejected, (state, action) => {
            state.seachFriends.loading = false;
            state.seachFriends.error = action.payload as string;
        });

        // add friend
        builder.addCase(addFriend_action.pending, (state) => {
            state.addFriend.loading = true;
            state.addFriend.error = null;
        });

        builder.addCase(addFriend_action.fulfilled, (state) => {
            state.addFriend.loading = false;
        });

        builder.addCase(addFriend_action.rejected, (state, action) => {
            state.addFriend.loading = false;
            state.addFriend.error = action.payload as string;
        });

        // receive request add friend
        builder.addCase(addReceivedFriendRequest_action.pending, (state) => {
            if (!state.receiveRequestAddFriend) {
                state.receiveRequestAddFriend = initialState.receiveRequestAddFriend;
                state.receiveRequestAddFriendList = initialState.receiveRequestAddFriendList;
            }
        });
        builder.addCase(addReceivedFriendRequest_action.fulfilled, (state, action) => {
            state.receiveRequestAddFriend.loading = false;
            state.receiveRequestAddFriend.error = null;
            state.receiveRequestAddFriendList = state.receiveRequestAddFriendList.addUnique([action.payload], "id");
            state.countReceiveRequestAddFriend = state.receiveRequestAddFriendList.filter(x => !x.isRead).length
        });
    },
});

export const contactReducer = contactSlice.reducer;