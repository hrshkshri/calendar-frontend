import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es';
import { calendarApi } from '../api';
import { convertStringEventsToDate } from '../helpers';
import { activateEvent, addNewEvent, loadEvents, onDeleteEvent, updateEvent } from '../store';

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(activateEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO update event

    if (calendarEvent._id) {
      // Updating event
      dispatch(updateEvent(calendarEvent));
    } else {
      // Creating event
      const { data } = await calendarApi.post('/events/', calendarEvent);

      dispatch(addNewEvent({ ...calendarEvent, id: data.event.id, user: user }));
    }
  };

  const startDeletingEvent = async () => {
    // TODO go backend and delete

    dispatch(onDeleteEvent());
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/events/');
      const events = convertStringEventsToDate(data.events);

      dispatch(loadEvents(events));
      //
    } catch (error) {
      console.log('Error loading events\n', error);
    }
  };

  return {
    // Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Functions
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
