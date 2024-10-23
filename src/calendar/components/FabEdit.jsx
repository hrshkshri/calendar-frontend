import { addHours } from 'date-fns';
import { useCalendarStore, useUIStore } from '../../hooks';

export const FabEdit = () => {
    const { openDateModal } = useUIStore();
    const { activeEvent, hasEventSelected, setActiveEvent } = useCalendarStore();

    const handleEditEvent = () => {
        if (hasEventSelected) {
            // Log all the data of the active event
            console.log('Edit event data:', activeEvent);

            // Set the active event to prepare for editing (if needed)
            setActiveEvent(activeEvent);
            openDateModal();

        }
    };

    return (
        <button
            aria-label='btn-edit'
            className='btn btn-primary fab-primary'
            onClick={handleEditEvent}
            style={{ display: hasEventSelected ? '' : 'none' }}
        >
            <i className='fas fa-edit'></i> {/* Optional: Add an edit icon */}
        </button>
    );
};
