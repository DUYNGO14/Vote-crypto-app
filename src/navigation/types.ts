export type AuthStackParamList = {
  RegisterEmail: undefined;
  RegisterPassword: { username: string, displayName: string, nickname: string, fullName: string };
  Login: undefined;
  ForgotPassword: undefined;
  NewPassword: { resetToken: string };
  ChangePassword: undefined;
  VerifyOtp: { email: string;};
  WebView: { url: string; title?: string };
};

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
};
