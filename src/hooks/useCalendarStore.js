import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es';
import { activateEvent, addNewEvent, onDeleteEvent, updateEvent } from '../store';

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(activateEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO go backend and send event information

    if (calendarEvent._id) {
      // Updating event
      dispatch(updateEvent(calendarEvent));
    } else {
      // Creating event
      dispatch(addNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeletingEvent = async () => {
    // TODO go backend and delete

    dispatch(onDeleteEvent());
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
  };
};
