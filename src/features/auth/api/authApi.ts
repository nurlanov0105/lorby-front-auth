import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = import.meta.env.VITE_TOURS_BASE_API_URL;

export const authApi = createApi({
   reducerPath: 'authApi',
   baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL,
      // fetchFn: (url, args) => fetch(url, { ...args, mode: 'no-cors' }),
   }),
   endpoints: (builder) => ({
      register: builder.mutation({
         query: (params) => {
            const { login, email, password } = params;
            return {
               url: 'register',
               method: 'POST',
               body: {
                  fullName: login,
                  email,
                  password,
               },
            };
         },
      }),
      login: builder.mutation({
         query: (params) => {
            const { email, password } = params;
            return {
               url: 'auth',
               method: 'POST',
               body: {
                  email,
                  password,
               },
            };
         },
      }),
   }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
export const {} = authApi;
