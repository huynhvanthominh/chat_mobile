import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
} from "../../../interfaces/auth.interface";
import { getMessageErrorFromApi } from "../../../utils";
import { http } from "../../axios";
import { IUser } from "../../../interfaces/user.interface";
const key = {
  login: "auth/login",
  clearLogin: "auth/clearLogin",
  register: "auth/register",
  clearRegister: "auth/clearRegister",
  getMe: "auth/getMe",
  clearGetMe: "auth/clearGetMe",
  logout: "auth/logout",
};
const api = {
  login: "auth/login",
  register: "auth/register",
  getMe: "auth/me",
};

const clearLogin_action = createAsyncThunk(key.clearLogin, async () => {
  return;
});

const login_action = createAsyncThunk(
  key.login,
  async (payload: ILoginRequest, { rejectWithValue }) => {
    try {
      const response: ILoginResponse = (await http.post(api.login, payload)).data;
      return response;
    } catch (error: any) {
      return rejectWithValue(getMessageErrorFromApi(error));
    }
  }
);

const register_action = createAsyncThunk(
  key.register,
  async (payload: IRegisterRequest, { rejectWithValue }) => {
    try {
      const response: IUser = (await http.post(api.register, payload)).data;
      return response;
    } catch (error: any) {
      return rejectWithValue(getMessageErrorFromApi(error));
    }
  }
);
const clearRegister_action = createAsyncThunk(key.clearRegister, async () => {
  return;
})

const getMe_action = createAsyncThunk(
  key.getMe,
  async (_, { rejectWithValue }) => {
    try {
      const response: IUser = (await http.get(api.getMe)).data;
      return response;
    } catch (error: any) {
      return rejectWithValue(getMessageErrorFromApi(error));
    }
  }
);
const clearGetMe_action = createAsyncThunk(key.clearGetMe, async () => {
  return;
});

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
  clearGetMe_action,
  logout_action,
  clearLogin_action,
  clearRegister_action
};
