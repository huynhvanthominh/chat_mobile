import { createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "../../axios";
import { IPaginate } from "../../../interfaces/paginate.interface";
import { IPaginateQuery } from "../../../interfaces/query.interface";
import { getMessageErrorFromApi } from "../../../utils";
import { IFriend } from "../../../interfaces/friend.interface";

const key = {
    friends: "user/friends",
};
const api = {
    friends: "user/friends",
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

export {
    getFriends_action
}