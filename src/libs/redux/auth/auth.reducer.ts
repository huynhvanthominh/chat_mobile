import { createSlice } from "@reduxjs/toolkit";
import { clearLogin_action, getMe_action, login_action, logout_action } from "./auth.action";
import { setToken } from "../../axios";
import { ILoginResponse, IRegisterResponse } from "../../../interfaces/auth.interface";
import { IUser } from "../../../interfaces/user.interface";

export interface AuthState {
  user?: IUser | null;
  token?: string | null;
  refreshToken?: string | null;
  login: {
    loading: boolean;
    error?: string | null;
    payload?: ILoginResponse | null;
  };
  register: {
    loading: boolean;
    error?: string | null;
    payload?: IRegisterResponse | null;
  };

}
const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  login: {
    loading: false,
    error: null,
    payload: null,
  },
  register: {
    loading: false,
    error: null,
    payload: null,
  },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login_action.pending, (state) => {
      state.login.loading = true;
      state.login.error = null;
      state.login.payload = null;
    });

    builder.addCase(login_action.fulfilled, (state, action) => {
      state.login.loading = false;
      state.login.payload = action.payload;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      setToken(state.token);
    });

    builder.addCase(login_action.rejected, (state, action) => {
      state.login.loading = false;
      state.login.error = action.payload as string;
      state.login.payload = null;
    });

    builder.addCase(getMe_action.pending, (state) => {
      state.login.loading = true;
      state.login.error = null;
      state.login.payload = null;
    });

    builder.addCase(getMe_action.fulfilled, (state, action) => {
      state.login.loading = false;
      state.user = action.payload;
    });

    builder.addCase(getMe_action.rejected, (state, action) => {
      state.login.loading = false;
      state.login.error = action.payload as string;
      state.login.payload = null;
      state.token = null;
      state.user = null;
    });

    builder.addCase(logout_action.pending, (state) => {
      state.login.loading = true;
      state.login.error = null;
      state.login.payload = null;
    });

    builder.addCase(logout_action.fulfilled, (state) => {
      state.login.loading = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      setToken("");
    });

    builder.addCase(logout_action.rejected, (state, action) => {
      state.login.loading = false;
      state.login.error = action.payload as string;
      state.login.payload = null;
    });

    builder.addCase(clearLogin_action.fulfilled, (state) => {
      state.login.loading = false;
      state.login.error = null;
      state.login.payload = null;
    });
  }
});

export const authReudcer = authSlice.reducer;
