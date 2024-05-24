export interface ILoginRequest {
  username: string;
  password: string;
}
export interface ILoginResponse {
  token: string;
  refreshToken: string;
}

export interface IRegisterRequest {
  username: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

export interface IRegisterResponse {
  username: string;
}
