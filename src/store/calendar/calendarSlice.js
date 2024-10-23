import { createSlice } from '@reduxjs/toolkit';
/*
import { addHours } from 'date-fns';

Event structure example
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
*/

const initialState = {
  isLoadingEvents: true,
  events: [],
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

    loadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      // state.events = [...events, payload];
      payload.forEach((event) => {
        const alreadyExists = state.events.some((e) => e.id === event.id);

        if (!alreadyExists) {
          state.events.push(event);
        }
      });
    },
  },
});

export const { activateEvent, addNewEvent, updateEvent, onDeleteEvent, loadEvents } =
  calendarSlice.actions;
