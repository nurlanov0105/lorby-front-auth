import { Endpoints } from '@/shared/api/endpoints';
import { authApi } from '..';

export const authApiSlice = authApi.injectEndpoints({
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
} = authApiSlice;
