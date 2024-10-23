import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { FabAddNew, Navbar, CalendarEvent, CalendarModal } from '../';
import { localizer } from '../../helpers';
import { useCalendarStore, useUIStore } from '../../hooks';

const eventStyleGetter = (event, start, end, isSelected) => {
  const style = {
    backgroundColor: '#347CF7',
    borderRadius: '0px',
    opacity: 0.8,
    color: 'white',
  };

  return { style };
};

export const CalendarPage = () => {
  const { events, setActiveEvent } = useCalendarStore();
  const { openDateModal } = useUIStore();
  const [lastview, setLastview] = useState(localStorage.getItem('lastview') || 'month');

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    console.log('select', event);
    setActiveEvent(event);
  };

  const onViewChanged = (event) => {
    // event is month, day, week , ...
    localStorage.setItem('lastview', event);
    setLastview(event);
  };

  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastview}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc(100vh - 100px)' }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />

      <FabAddNew />
    </>
  );
};
