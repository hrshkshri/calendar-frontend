import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { Navbar, CalendarEvent,CalendarModal } from '../';
import { localizer } from '../../helpers';

const events = [
  {
    title: 'Birthday',
    notes: 'Buy cake',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: 'fafafa',
    user: {
      _id: '123',
      name: 'Juna',
    },
  },
];

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
  const [lastview, setLastview] = useState(localStorage.getItem('lastview') || 'month');

  const onDoubleClick = (event) => {
    console.log('double click', event);
  };

  const onSelect = (event) => {
    console.log('select', event);
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
    </>
  );
};
