import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   isOpen: false,
   componentName: null,
};

const modalSlice = createSlice({
   name: 'modal',
   initialState,
   reducers: {
      showModal: (state, action) => {
         state.isOpen = true;
         state.componentName = action.payload;
      },
      closeModal: (state) => {
         state.isOpen = false;
         state.componentName = null;
      },
   },
});

export const { showModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
