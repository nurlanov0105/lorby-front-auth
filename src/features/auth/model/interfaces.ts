export interface RegisterParams {
   login: string;
   email: string;
   password: string;
}

export interface LoginParams {
   email: string;
   password: string;
}

export interface RefreshParams {
   // token: string;
}
export interface confirmRegistrationParams {
   token: string;
}

export interface AuthResponse {
   accessToken: string;
}
