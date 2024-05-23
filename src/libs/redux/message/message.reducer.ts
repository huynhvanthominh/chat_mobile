import { createSlice } from "@reduxjs/toolkit";
import { IMessage, IMessages } from "../../../interfaces/message.interface";
import { IPaginate } from "../../../interfaces/paginate.interface";
import { addMessage_action, getMessage_action, messages_action } from "./message.action";
import _ from "lodash";
export interface MessageState {
    messages: {
        loading: boolean;
        error?: string | null;
        payload?: IPaginate<IMessages> | null;
    };
    messagesList: IMessages[];
    message: {
        loading: boolean;
        error?: string | null;
        payload?: IPaginate<IMessage> | null;
    },
    messageList: {
        id: number,
        messages: IMessage[]
    }[];
}

const initialState: MessageState = {
    messages: {
        loading: false,
        error: null,
        payload: null,
    },
    messagesList: [],
    message: {
        loading: false,
        error: null,
        payload: null,
    },
    messageList: [],
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // get messages
        builder.addCase(messages_action.pending, (state) => {
            state.messages.loading = true;
            state.messages.error = null;
            state.messages.payload = null;
        });

        builder.addCase(messages_action.fulfilled, (state, action) => {
            state.messages.loading = false;
            state.messages.payload = action.payload;
            state.messages.payload?.data.forEach((message: IMessages) => {
                if (!state.messagesList.find(item => item.id === message.id))
                    state.messagesList.push(_.cloneDeep(message));
            })
        });

        builder.addCase(messages_action.rejected, (state, action) => {
            state.messages.loading = false;
            state.messages.error = action.payload as string;
            state.messages.payload = null;
            state.messagesList = [];
        });

        // get messages of group
        builder.addCase(getMessage_action.pending, (state) => {
            if (!state.message) {
                state.message = {
                    loading: true,
                    error: null,
                    payload: null,
                }
            }
            state.message.loading = true;
            state.message.error = null;
            state.message.payload = null;
        });

        builder.addCase(getMessage_action.fulfilled, (state, action) => {
            state.message.loading = false;
            state.message.payload = action.payload;
            if (!state.messageList) {
                state.messageList = [];
            }
            state.message.error = null;
            state.message.payload?.data.forEach((message: IMessage) => {
                state = addMessage(message, state, false);
            });
        });

        builder.addCase(getMessage_action.rejected, (state, action) => {
            state.message.loading = false;
            state.message.error = action.payload as string;
            state.message.payload = null;
        });

        // add message
        builder.addCase(addMessage_action.fulfilled, (state, action) => {
            state = addMessage(action.payload, state, true);
        })

    }
});

const addMessage = (message: IMessage, state: MessageState, isNew: boolean): MessageState => {
    const index = state.messageList.findIndex(item => item.id === message.messageGroupId);
    if (index >= 0) {
        if (!state.messageList[index].messages) state.messageList[index].messages = [];
        const find = state.messageList[index].messages.find(item => item.id === message.id);
        if (!find) {
            if (isNew) {
                state.messageList[index].messages = [
                    message,
                    ...state.messageList[index].messages,
                ];
            } else {
                state.messageList[index].messages = [
                    ...state.messageList[index].messages,
                    message,
                ];
            }
        }
    }
    else {
        state.messageList.push({
            id: message.messageGroupId,
            messages: [message]
        });
    }
    return state;
}

export const messageReducer = messageSlice.reducer;