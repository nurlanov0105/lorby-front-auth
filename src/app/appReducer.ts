import { combineReducers } from '@reduxjs/toolkit';
import { authApi, authSlice } from '@/features/auth';
import { modalSlice } from '@/widgets/modal';

export const rootReducer = combineReducers({
   auth: authSlice,
   modal: modalSlice,
   [authApi.reducerPath]: authApi.reducer,
});
