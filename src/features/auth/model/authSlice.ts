import { getUserFromLS } from '@/shared/utils/getCurrentUserFromLS';
import { createSlice } from '@reduxjs/toolkit';
const { login, email, token } = getUserFromLS();

const initialState = {
   login,
   email,
   token,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      addCurrentUser: (state, action) => {
         state.login = action.payload.fullName;
         state.email = action.payload.email;
         state.token = action.payload.token;
      },
      removeUser: (state) => {
         state.login = null;
         state.email = null;
         state.token = null;
      },
   },
});

export const { addCurrentUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
