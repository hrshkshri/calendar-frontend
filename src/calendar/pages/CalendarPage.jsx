import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { Navbar } from '../';
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
  console.log({ event, start, end, isSelected });

  const style = {
    backgroundColor: '#347CF7',
    borderRadius: '0px',
    opacity: 0.8,
    color: 'white',
  };

  return { style };
};

export const CalendarPage = () => {
  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc(100vh - 100px)' }}
        eventPropGetter={eventStyleGetter}
      />
    </>
  );
};
