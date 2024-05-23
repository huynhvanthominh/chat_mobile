import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ILoginRequest,
  ILoginResponse,
} from "../../../interfaces/auth.interface";
import { getMessageErrorFromApi } from "../../../utils";
import { http } from "../../axios";
const key = {
  login: "auth/login",
  reguster: "auth/register",
  getMe: "auth/getMe",
  logout: "auth/logout",
  cleatLogin: "auth/clearLogin",
};
const api = {
  login: "auth/login",
  register: "auth/register",
  getMe: "auth/me",
};

const clearLogin_action = createAsyncThunk(key.cleatLogin, async () => {
  return;
});

const login_action = createAsyncThunk(
  key.login,
  async (payload: ILoginRequest, { rejectWithValue }) => {
    try {
      const response = (await http.post(api.login, payload)).data;
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      const data: ILoginResponse = {
        token: response.payload.token,
        refreshToken: response.payload?.refreshToken,
      };
      return data;
    } catch (error: any) {
      return rejectWithValue(getMessageErrorFromApi(error));
    }
  }
);

const register_action = createAsyncThunk(
  key.reguster,
  async (payload: ILoginRequest, { rejectWithValue }) => {
    try {
      const response = await http.post(api.register, payload);
      return {};
    } catch (error: any) {
      return rejectWithValue(getMessageErrorFromApi(error));
    }
  }
);

const getMe_action = createAsyncThunk(
  key.getMe,
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get(api.getMe);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(getMessageErrorFromApi(error));
    }
  }
);

const logout_action = createAsyncThunk(
  key.logout,
  async (_, { rejectWithValue }) => {
    try {
    } catch (error: any) {
      return rejectWithValue(getMessageErrorFromApi(error));
    }
  }
);

export {
  login_action,
  register_action,
  getMe_action,
  logout_action,
  clearLogin_action,
};
