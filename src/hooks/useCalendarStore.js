import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es';
import { activateEvent } from '../store';

export const useCalendarStore = () => {
  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(activateEvent(calendarEvent));
  };

  return {
    // Properties
    events,
    activeEvent,

    // Functions
    setActiveEvent,
  };
};
