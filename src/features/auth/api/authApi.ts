import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = import.meta.env.VITE_TOURS_BASE_API_URL;

export const authApi = createApi({
   reducerPath: 'authApi',
   baseQuery: fetchBaseQuery({
      baseUrl: BASE_URL,
      // fetchFn: (url, args) => fetch(url, { ...args, mode: 'no-cors' }),
   }),
   endpoints: (builder) => ({
      // register: builder.mutation<RegisterParams, RegisterParams>({
      //    query: (params) => {
      //       const { firstName, lastName, email, userImage, password } = params;
      //       return {
      //          url: 'api/users/signUp',
      //          method: 'POST',
      //          body: {
      //             firstName,
      //             lastName,
      //             email,
      //             userImage,
      //             password,
      //          },
      //       };
      //    },
      // }),
      // login: builder.mutation<LoginApiResponse, LoginParams>({
      //    query: (params) => {
      //       const { email, password } = params;
      //       return {
      //          url: 'api/users/signIn',
      //          method: 'POST',
      //          body: {
      //             email,
      //             password,
      //          },
      //       };
      //    },
      // }),
      getTours: builder.query({
         query: () => {
            return {
               url: '/tours/',
               method: 'GET',
            };
         },
      }),
   }),
});

// export const { useRegisterMutation, useLoginMutation } = authApi;
export const { useGetToursQuery } = authApi;
