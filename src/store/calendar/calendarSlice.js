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

    addNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },

    updateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event._id === payload._id) return payload;

        return event;
      });
    },

    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter((event) => event._id !== state.activeEvent._id);
        state.activeEvent = null;
      }
    },
  },
});

export const { activateEvent, addNewEvent, updateEvent, onDeleteEvent } = calendarSlice.actions;
