import { createSlice } from "@reduxjs/toolkit";
import { acceptRequestMakeFriend_action, addFriend_action, addReceivedFriendRequest_action, getFriends_action, getReceivedFriendRequest_action, rejectRequestMakeFriend_action, removeReceivedMakeFriendRequest_action, searchFriends_action } from "./contract.action";
import { IFriend } from "../../../interfaces/friend.interface";
import { IRecieveRequestAddFriend, IUser } from "../../../interfaces/user.interface";
import { IPaginate } from "../../../interfaces/paginate.interface";
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
        data?: IPaginate<IRecieveRequestAddFriend>;
    },
    receiveRequestAddFriendList: IRecieveRequestAddFriend[],
    countReceiveRequestAddFriend: number;
    acceptRequestMakeFriend: Map<number, {
        loading: boolean;
        error: string | null;
    }>;
    rejectRequestMakeFriend: Map<number, {
        loading: boolean;
        error: string | null;
    }>;
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
        data: undefined,
    },
    receiveRequestAddFriendList: [],
    countReceiveRequestAddFriend: 0,
    acceptRequestMakeFriend: new Map(),
    rejectRequestMakeFriend: new Map(),
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
            state.friends = state.friends.addUnique(action.payload.data, "userId");
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
        // get receive request add friend
        builder.addCase(getReceivedFriendRequest_action.pending, (state) => {
            if (!state.receiveRequestAddFriend) {
                state.receiveRequestAddFriend = initialState.receiveRequestAddFriend;
                state.receiveRequestAddFriendList = initialState.receiveRequestAddFriendList;
            }
            state.receiveRequestAddFriend.loading = true;
            state.receiveRequestAddFriend.error = null;
        }
        );
        builder.addCase(getReceivedFriendRequest_action.fulfilled, (state, action) => {
            state.receiveRequestAddFriend.loading = false;
            state.receiveRequestAddFriend.data = action.payload;
            state.receiveRequestAddFriendList = state.receiveRequestAddFriendList.addUnique(action.payload.data, "id");
            state.countReceiveRequestAddFriend = action.payload.data.filter(x => !x.isRead).length
        });
        builder.addCase(getReceivedFriendRequest_action.rejected, (state, action) => {
            state.receiveRequestAddFriend.loading = false;
            state.receiveRequestAddFriend.error = action.payload as string;
        });
        // accept request make friend
        builder.addCase(acceptRequestMakeFriend_action.pending, (state, action) => {
            if (!state.acceptRequestMakeFriend) {
                state.acceptRequestMakeFriend = initialState.acceptRequestMakeFriend;
            }
            const userId = action.meta.arg.userId;
            state.acceptRequestMakeFriend.set(userId, {
                loading: true,
                error: null
            });
        });
        builder.addCase(acceptRequestMakeFriend_action.fulfilled, (state, action) => {
            const userId = action.meta.arg.userId;
            state.acceptRequestMakeFriend.set(userId, {
                loading: false,
                error: null
            });
        });
        builder.addCase(acceptRequestMakeFriend_action.rejected, (state, action) => {
            const userId = action.meta.arg.userId;
            state.acceptRequestMakeFriend.set(userId, {
                loading: false,
                error: action.payload as string
            });
        });
        // reject request make friend
        builder.addCase(rejectRequestMakeFriend_action.pending, (state, action) => {
            if (!state.rejectRequestMakeFriend) {
                state.rejectRequestMakeFriend = initialState.rejectRequestMakeFriend;
            }
            const userId = action.meta.arg.userId;
            state.rejectRequestMakeFriend.set(userId, {
                loading: true,
                error: null
            });
        
        });
        builder.addCase(rejectRequestMakeFriend_action.fulfilled, (state, action) => {
            const userId = action.meta.arg.userId;
            state.rejectRequestMakeFriend.set(userId, {
                loading: false,
                error: null
            });
        });
        builder.addCase(rejectRequestMakeFriend_action.rejected, (state, action) => {
            const userId = action.meta.arg.userId;
            state.rejectRequestMakeFriend.set(userId, {
                loading: false,
                error: action.payload as string
            });
        });
        // remove receive request add friend
        builder.addCase(removeReceivedMakeFriendRequest_action.fulfilled, (state, action) => {
            state.receiveRequestAddFriendList = state.receiveRequestAddFriendList.filter(x => x.id !== action.payload);
            state.countReceiveRequestAddFriend = state.receiveRequestAddFriendList.filter(x => !x.isRead).length
        });
    },
});

export const contactReducer = contactSlice.reducer;