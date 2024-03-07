import { Endpoints } from '@/shared/api/endpoints';
import { authApi } from '..';
import {
   Credentials,
   LoginResponse,
   LogoutParams,
   RefreshParams,
   RefreshResponse,
   RegisterParams,
   ResendEmailParams,
   emailVerifyParams,
} from './interfaces';

export const authApiSlice = authApi.injectEndpoints({
   endpoints: (builder) => ({
      register: builder.mutation<string, RegisterParams>({
         query: (params) => {
            const { login, email, password } = params;
            return {
               url: Endpoints.REGISTER,
               method: 'POST',
               body: {
                  username: login,
                  email,
                  password,
               },
            };
         },
      }),
      login: builder.mutation<LoginResponse, Credentials>({
         query: (params) => {
            const { username, password } = params;
            return {
               url: Endpoints.LOGIN,
               method: 'POST',
               body: {
                  username: username,
                  password,
               },
            };
         },
      }),
      logout: builder.mutation<string, LogoutParams>({
         query: (params) => {
            const { refresh } = params;
            return {
               url: Endpoints.LOGOUT,
               method: 'POST',
               body: {
                  refresh_token: refresh,
               },
            };
         },
      }),
      resendEmail: builder.mutation<string, ResendEmailParams>({
         query: (params) => {
            const { email } = params;
            return {
               url: Endpoints.RESEND_EMAIL,
               method: 'POST',
               body: {
                  email,
               },
            };
         },
      }),
      emailVerify: builder.mutation<string, emailVerifyParams>({
         query: (params) => {
            const { token } = params;
            return {
               url: Endpoints.EMAIL_VERIFY,
               method: 'GET',
               params: {
                  token: token,
               },
            };
         },
      }),
      refresh: builder.mutation<RefreshResponse, RefreshParams>({
         query: ({ refreshToken }) => {
            return {
               url: Endpoints.REFRESH,
               method: 'POST',
               body: {
                  refresh: refreshToken,
               },
            };
         },
      }),
   }),
});

export const {
   useRegisterMutation,
   useLoginMutation,
   useRefreshMutation,
   useLogoutMutation,
   useEmailVerifyMutation,
   useResendEmailMutation,
} = authApiSlice;
