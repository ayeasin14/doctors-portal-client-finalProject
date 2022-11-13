import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppoinments = ({ selectedData }) => {
    const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null);

    useEffect(() => {
        fetch('appointmentOptions.json')
            .then(res => res.json())
            .then(data => setAppointmentOptions(data))
    }, [])

    return (
        <section className='my-16 mx-5'>
            <p className='text-center text-secondary font-bold'>Available Appointments on {format(selectedData, 'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10'>
                {
                    appointmentOptions.map(option => <AppointmentOption
                        key={option._id}
                        appointmentOption={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {treatment &&
                <BookingModal
                    treatment={treatment}
                    selectedData={selectedData}
                    setTreatment={setTreatment}
                ></BookingModal>}
        </section>
    );
};

export default AvailableAppoinments;