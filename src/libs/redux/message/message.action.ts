import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMessageErrorFromApi } from "../../../utils";
import { http } from "../../axios";
import { IPaginateQuery } from "../../../interfaces/query.interface";
import { IMessage, ISendMessageBody } from "../../../interfaces/message.interface";
import { IPaginate } from "../../../interfaces/paginate.interface";
const key = {
  messages: "messages",
  addMessage: "addMessage",
  sendMessage: "sendMessage",
  getMessages: "getMessages",
  clearMessage: "clearMessage",
};
const api = {
  messages: "messages",
  getMessages: "messages/get-messages",
  sendMessage: "messages/send-message",
};

const clearMessage_action = createAsyncThunk(key.clearMessage, async () => {
  return;
});
interface IMessagesAction {
  paginate: IPaginateQuery;
}
const messages_action = createAsyncThunk(
  key.messages,
  async ({
    paginate
  }: IMessagesAction, { rejectWithValue }) => {
    try {
      const response = (await http.get(api.messages, {
        params: paginate,
      })).data;
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response.payload;
    } catch (error: any) {
      return rejectWithValue(getMessageErrorFromApi(error));
    }
  }
);
interface IMessageAction {
  paginate: IPaginateQuery;
  messageGroupId: number;
}
const getMessage_action = createAsyncThunk(
  key.getMessages,
  async ({ messageGroupId, paginate }: IMessageAction, { rejectWithValue }) => {
    try {
      const response = (await http.get(`${api.getMessages}/${messageGroupId}`, {
        params: paginate,
      }));
      return response.data as IPaginate<IMessage>;
    } catch (error: any) {
      return rejectWithValue(getMessageErrorFromApi(error));
    }
  }
);

const sendMessage_action = createAsyncThunk(
  key.sendMessage,
  async (data: ISendMessageBody, { rejectWithValue }) => {
    try {
      const { to, ...rest } = data;
      const response = (await http.post(`${api.sendMessage}/${to}`, rest)).data;
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response.payload;
    } catch (error: any) {
      return rejectWithValue(getMessageErrorFromApi(error));
    }
  }
);

const addMessage_action = createAsyncThunk(
  key.sendMessage,
  async (message: IMessage, { rejectWithValue }) => {
    try {
      return message;
    } catch (error: any) {
      return rejectWithValue(getMessageErrorFromApi(error));
    }
  }
);
export {
  messages_action,
  getMessage_action,
  addMessage_action,
};
