import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
  _id: new Date().getTime(),
  title: 'Birthday',
  notes: 'Buy cake',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: 'fafafa',
  user: {
    _id: '123',
    name: 'Juna',
  },
};

const initialState = {
  events: [tempEvent],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    activateEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
  },
});

export const { activateEvent } = calendarSlice.actions;
