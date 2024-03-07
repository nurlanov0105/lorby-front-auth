export interface Credentials {
   login?: string;
   username?: string;
   password: string;
}

export interface TokenPair {
   refresh: string;
   access: string;
}

export interface EmailParam {
   email: string;
}

export interface TokenParam {
   token: string;
}

export type RegisterParams = Credentials & EmailParam;
export type LoginResponse = TokenPair & { user_info: Credentials };
export type LogoutParams = Pick<TokenPair, 'refresh'>;
export type ResendEmailParams = EmailParam;
export type emailVerifyParams = TokenParam;
export type RefreshResponse = TokenPair;
export type RefreshParams = { refreshToken: string };
