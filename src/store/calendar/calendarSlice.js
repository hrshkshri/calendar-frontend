import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
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
    createEvent: (state) => {
      // TODO
    },
  },
});

export const { createEvent } = calendarSlice.actions;
