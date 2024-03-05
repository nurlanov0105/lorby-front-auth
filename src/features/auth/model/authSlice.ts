import { getUserFromLS } from '@/shared/utils/getCurrentUserFromLS';
import { createSlice } from '@reduxjs/toolkit';
const { refresh, access, user_info } = getUserFromLS();

const initialState = {
   refresh,
   access,
   email: null,
   user_info,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      addCurrentUser: (state, action) => {
         state.refresh = action.payload.refresh;
         state.access = action.payload.access;
         state.user_info = action.payload.user_info;
      },
      removeUser: (state) => {
         state.refresh = null;
         state.access = null;
         state.user_info = null;
      },
   },
});

export const { addCurrentUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
