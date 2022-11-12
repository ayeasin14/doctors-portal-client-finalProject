import { format } from 'date-fns';
import React from 'react';

const AvailableAppoinments = ({ selectedData }) => {
    return (
        <section className='mt-16'>
            <p className='text-center text-secondary font-bold'>Available Appointments on {format(selectedData, 'PP')}</p>
        </section>
    );
};

export default AvailableAppoinments;