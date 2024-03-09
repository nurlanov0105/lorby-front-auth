import { Endpoints } from '@/shared/api/endpoints';
import { authApi } from '..';
import {
   ChangePasswordType,
   Credentials,
   LoginResponse,
   LogoutParams,
   PasswordResetType,
   RefreshParams,
   RefreshResponse,
   RegisterParams,
   ResendEmailParams,
   deleteType,
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
      emailSend: builder.mutation<string, ResendEmailParams>({
         query: ({ email }) => {
            return {
               url: Endpoints.EMAIL_SEND,
               method: 'POST',
               body: {
                  email: email,
               },
            };
         },
      }),
      passwordReset: builder.mutation<PasswordResetType, PasswordResetType>({
         query: ({ password, token }) => {
            return {
               url: Endpoints.PASSWORD_RESET,
               method: 'POST',
               body: {
                  password,
                  token,
               },
            };
         },
      }),
      changePassword: builder.mutation<string, ChangePasswordType>({
         query: ({ old_password, new_password }) => {
            return {
               url: Endpoints.CHANGE_PASSWORD,
               method: 'POST',
               body: {
                  old_password,
                  new_password,
               },
            };
         },
      }),
      delete: builder.mutation<string, deleteType>({
         query: ({ refresh_token }) => {
            return {
               url: Endpoints.DELETE,
               method: 'DELETE',
               body: {
                  refresh_token,
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
   useEmailSendMutation,
   usePasswordResetMutation,
   useChangePasswordMutation,
   useDeleteMutation,
} = authApiSlice;
