import { useState } from 'react';
import { addHours } from 'date-fns';
import ReactModal from 'react-modal';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

ReactModal.setAppElement('#root');

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [formValues, setFormValues] = useState({
    title: 'Buy things',
    notes: 'Just for fun',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event, dateChanged) => {
    setFormValues({
      ...formValues,
      [dateChanged]: event,
    });
  };

  const onCloseModal = () => {
    console.log('Closing modal');
    setIsOpen(false);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
    >
      <h1> New Event </h1>
      <hr />
      <form className='container'>
        <div className='form-group mb-2'>
          <label>Start date and hour</label>
          <DatePicker
            selected={formValues.start}
            className='form-control'
            onChange={(event) => onDateChange(event, 'start')}
            dateFormat='Pp'
            showTimeSelect
          />
        </div>

        <div className='form-group mb-2'>
          <label>End date and hour</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className='form-control'
            onChange={(event) => onDateChange(event, 'end')}
            dateFormat='Pp'
            showTimeSelect
          />
        </div>

        <hr />
        <div className='form-group mb-2'>
          <label>Title and notes</label>
          <input
            type='text'
            className='form-control'
            placeholder='Event title'
            name='title'
            autoComplete='off'
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            A short description
          </small>
        </div>

        <div className='form-group mb-2'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notes'
            rows='5'
            name='notes'
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Additional Information
          </small>
        </div>

        <button type='submit' className='btn btn-outline-primary btn-block'>
          <i className='far fa-save'></i>
          <span> Save</span>
        </button>
      </form>
    </ReactModal>
  );
};
