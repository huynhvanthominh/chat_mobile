import { createSlice } from "@reduxjs/toolkit";
import { clearGetMe_action, clearLogin_action, clearRegister_action, getMe_action, login_action, logout_action, register_action } from "./auth.action";
import { setToken } from "../../axios";
import { ILoginResponse, IRegisterResponse } from "../../../interfaces/auth.interface";
import { IUser } from "../../../interfaces/user.interface";

export interface AuthState {
  getMe: {
    loading: boolean;
    error?: string | null;
    payload?: IUser | null;
  };
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
    payload?: IUser | null;
  };

}
const initialState: AuthState = {
  getMe: {
    loading: false,
    error: null,
    payload: null,
  },
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
    // login
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

    // get me
    builder.addCase(getMe_action.pending, (state) => {
      if (!state.getMe) {
        state.getMe = initialState.getMe;
      }
      state.getMe.loading = true;
      state.getMe.error = null;
      state.getMe.payload = null;
    });

    builder.addCase(getMe_action.fulfilled, (state, action) => {
      state.getMe.loading = false;
      state.getMe.payload = action.payload;
      state.user = action.payload;
      state.getMe.payload = action.payload;
    });

    builder.addCase(getMe_action.rejected, (state, action) => {
      state.getMe.loading = false;
      state.getMe.error = action.payload as string;
      state.getMe.payload = null;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      setToken("");
    });
    // clear get me
    builder.addCase(clearGetMe_action.fulfilled, (state) => {
      state.getMe.loading = false;
      state.getMe.error = null;
      state.getMe.payload = null;
    });

    // logout
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

    // clear login
    builder.addCase(clearLogin_action.fulfilled, (state) => {
      state.login.loading = false;
      state.login.error = null;
      state.login.payload = null;
    });

    // register
    builder.addCase(register_action.pending, (state) => {
      state.register.loading = true;
      state.register.error = null;
      state.register.payload = null;
    });

    builder.addCase(register_action.fulfilled, (state, action) => {
      state.register.loading = false;
      state.register.payload = action.payload;
    });

    builder.addCase(register_action.rejected, (state, action) => {
      state.register.loading = false;
      state.register.error = action.payload as string;
      state.register.payload = null;
    });

    // clear register
    builder.addCase(clearRegister_action.fulfilled, (state) => {
      state.register.loading = false;
      state.register.error = null;
      state.register.payload = null;
    });
  }
});

export const authReudcer = authSlice.reducer;
