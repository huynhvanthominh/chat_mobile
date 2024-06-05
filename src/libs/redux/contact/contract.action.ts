import { createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../../axios";
import { IPaginate } from "../../../interfaces/paginate.interface";
import { IPaginateQuery } from "../../../interfaces/query.interface";
import { getMessageErrorFromApi } from "../../../utils";
import { IFriend } from "../../../interfaces/friend.interface";
import { IRecieveRequestAddFriend, IUser } from "../../../interfaces/user.interface";

const key = {
    friends: "user/friends",
    searchFriends: "user/searchFriends",
    addFriend: "user/addFriend",
    receiveMakeFriendRequest: "user/receiveMakeFriendRequest",
    getReceivedFriendRequest: "user/getReceivedFriendRequest",
    acceptRequestMakeFriend: "user/acceptRequestMakeFriend",
    rejectRequestMakeFriend: "user/rejectRequestMakeFriend",
    removeReceivedMakeFriendRequest: "user/removeReceivedMakeFriendRequest",
};
const api = {
    friends: "user/friends",
    searchFriends: "user/search-friends",
    addFriend: "user/add-friend",
    receiveMakeFriendRequest: "user/receive-make-friend-requests",
    rejectMakeFriendRequest: "user/reject-make-friend-request",
    acceptRequestMakeFriend: "user/accept-request-make-friend",
};

interface IGetFriendsRequest {
    paginate: IPaginateQuery;
}
const getFriends_action = createAsyncThunk(
    key.friends,
    async ({
        paginate
    }: IGetFriendsRequest, { rejectWithValue }) => {
        try {
            const response: IPaginate<IFriend> = (await http.get(api.friends, {
                params: paginate
            })).data;
            return response;
        } catch (error: any) {
            return rejectWithValue(getMessageErrorFromApi(error));
        }
    }
);

interface ISearchFriendsRequest {
    paginate: IPaginateQuery;
}
const searchFriends_action = createAsyncThunk(
    key.searchFriends,
    async ({
        paginate
    }: ISearchFriendsRequest, { rejectWithValue }) => {
        try {
            const response: IPaginate<IUser> = (await http.get(api.searchFriends, {
                params: paginate
            })).data;
            return response;
        } catch (error: any) {
            return rejectWithValue(getMessageErrorFromApi(error));
        }
    }
)

// add friend
interface IAddFriendRequest {
    userId: number;
}
const addFriend_action = createAsyncThunk(
    key.addFriend,
    async ({
        userId
    }: IAddFriendRequest, { rejectWithValue }) => {
        try {
            await http.post(api.addFriend, {
                userId
            });
            return true;
        } catch (error: any) {
            return rejectWithValue(getMessageErrorFromApi(error));
        }
    }
);

const addReceivedFriendRequest_action = createAsyncThunk(
    key.receiveMakeFriendRequest,
    async (data: IRecieveRequestAddFriend, { rejectWithValue }) => {
        try {
            return data;
        } catch (error: any) {
            return rejectWithValue(getMessageErrorFromApi(error));
        }
    }
);

interface IGetRecieveRequestAddFriend {
    paginate: IPaginateQuery;
}
const getReceivedFriendRequest_action = createAsyncThunk(
    key.getReceivedFriendRequest,
    async ({
        paginate
    }: IGetRecieveRequestAddFriend, { rejectWithValue }) => {
        try {

            const response = await http.get(api.receiveMakeFriendRequest, {
                params: paginate
            });
            return response.data as IPaginate<IRecieveRequestAddFriend>;
        } catch (error: any) {
            return rejectWithValue(getMessageErrorFromApi(error));
        }
    }
);

interface IAcceptRequestMakeFriend {
    userId: number;
}
const acceptRequestMakeFriend_action = createAsyncThunk(
    key.acceptRequestMakeFriend,
    async (data: IAcceptRequestMakeFriend, { rejectWithValue }) => {
        try {
            await http.post(api.acceptRequestMakeFriend, {
                userId: data.userId
            });
            return;
        } catch (error: any) {
            return rejectWithValue(getMessageErrorFromApi(error));
        }
    }
);

const rejectRequestMakeFriend_action = createAsyncThunk(
    key.rejectRequestMakeFriend,
    async (data: IAcceptRequestMakeFriend, { rejectWithValue }) => {
        try {
            await http.post(api.rejectMakeFriendRequest, {
                userId: data.userId
            });
            return;
        } catch (error: any) {
            return rejectWithValue(getMessageErrorFromApi(error));
        }
    }
);

const removeReceivedMakeFriendRequest_action = createAsyncThunk(
    key.removeReceivedMakeFriendRequest,
    async (id: number, { rejectWithValue }) => {
        try {
            return id;
        } catch (error: any) {
            return rejectWithValue(getMessageErrorFromApi(error));
        }
    }
);

export {
    getFriends_action,
    searchFriends_action,
    addFriend_action,
    addReceivedFriendRequest_action,
    getReceivedFriendRequest_action,
    acceptRequestMakeFriend_action,
    rejectRequestMakeFriend_action,
    removeReceivedMakeFriendRequest_action
}