import { RootState } from '@/app/appStore';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { removeUser, tokenRefresh } from '..';
import { updateUserInLS } from '@/shared/utils/updateUserInLS';

import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Endpoints } from '@/shared/api/endpoints';
import { closeModal } from '@/widgets/modal';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_TOURS_BASE_API_URL;

const baseQuery = fetchBaseQuery({
   baseUrl: BASE_URL,
   // credentials: 'include',

   prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.access;
      console.log('prepareHeaders access token - ', token);
      if (token) {
         headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
   },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
   args,
   api,
   extraOptions
) => {
   let result = await baseQuery(args, api, extraOptions);

   if (result.error && result.error.status === 401) {
      // send refresh token to get new access token
      const refreshResult: any = await baseQuery(
         {
            url: Endpoints.REFRESH,
            method: 'POST',
            body: {
               refresh: (api.getState() as RootState).auth.refresh,
            },
         },
         api,
         extraOptions
      );

      if (refreshResult.data) {
         console.log('success - ', refreshResult);
         api.dispatch(tokenRefresh(refreshResult.data));
         updateUserInLS(refreshResult.data);

         // Здесь access токен при первом запросе не актуален, поэтому выходит ошибка при первом logout, срабатывает только во второй раз, когда получает акутальный access токен. Я не смог установить сюда актульное значение accesss токена. SOS

         result = await baseQuery(args, api, extraOptions);

         if (result.error && result.error.status === 400) {
            toast.error('Попробуй еще раз!');
         }

         console.log('retry the original token - ', result);
         api.dispatch(closeModal());
      } else {
         console.log('token not valid - ', refreshResult);
         api.dispatch(closeModal());
         api.dispatch(removeUser());
         localStorage.removeItem('currentUser');
         toast.error(refreshResult.error.data);
      }
   }
   return result;
};

export const authApi = createApi({
   reducerPath: 'authApi',
   baseQuery: baseQueryWithReauth,
   endpoints: () => ({}),
});
