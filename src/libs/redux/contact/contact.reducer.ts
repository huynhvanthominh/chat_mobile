import { createSlice } from "@reduxjs/toolkit";
import { getFriends_action } from "./contract.action";
import { IFriend } from "../../../interfaces/friend.interface";
interface ContactState {
    getFriends: {
        loading: boolean;
        error: string | null;
        data: IFriend[];
    },
    friends: IFriend[]
}
const initialState: ContactState = {
    getFriends: {
        loading: false,
        error: null,
        data: [],
    },
    friends: []
}
const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // get friends
        builder.addCase(getFriends_action.pending, (state) => {
            if(!state.getFriends){
                state.getFriends = initialState.getFriends;
                state.friends = initialState.friends;
            }
            state.getFriends.loading = true;
            state.getFriends.error = null;
        });

        builder.addCase(getFriends_action.fulfilled, (state, action) => {
            state.getFriends.loading = false;
            state.getFriends.data = action.payload.data;
            state.friends = [...state.friends, ...action.payload.data].unique();
        });

        builder.addCase(getFriends_action.rejected, (state, action) => {
            state.getFriends.loading = false;
            state.getFriends.error = action.payload as string;
        });
    },
});

export const contactReducer = contactSlice.reducer;