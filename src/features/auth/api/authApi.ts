import { RootState } from '@/app/appStore';
import { Endpoints } from '@/shared/api/endpoints';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import {
//    AuthResponse,
//    LoginParams,
//    RefreshParams,
//    RegisterParams,
//    confirmRegistrationParams,
// } from '../model/interfaces';
const BASE_URL = import.meta.env.VITE_TOURS_BASE_API_URL;

export const authApi = createApi({
   reducerPath: 'authApi',
   baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL,

      prepareHeaders: (headers, { getState }) => {
         const token = (getState() as RootState).auth.access;
         if (token) {
            headers.set('authorization', `Bearer ${token}`);
         }
         return headers;
      },
   }),

   endpoints: (builder) => ({
      register: builder.mutation({
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
      login: builder.mutation({
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
      logout: builder.mutation({
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
      resendEmail: builder.mutation({
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
      emailVerify: builder.mutation({
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
      refresh: builder.mutation({
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
} = authApi;
export const {} = authApi;
