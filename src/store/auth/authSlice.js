import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'checking', //authenticated - not-authenticated - checking
  user: {},
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checking: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined;
    },
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = undefined;
    },
  },
});

export const { checking, login } = authSlice.actions;
