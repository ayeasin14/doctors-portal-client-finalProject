import { format } from 'date-fns';
import React, { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';

const AvailableAppoinments = ({ selectedData }) => {

    const [treatment, setTreatment] = useState(null);
    const date = format(selectedData, 'PP');

    // const { data: appointmentOptions = [] } = useQuery({
    //     queryKey: ['appointmentOptions'],
    //     queryFn: () => fetch('http://localhost:5000/appointmentOptions')
    //         .then(res => res.json())
    // })


    // or you can use this for get any data from servear.

    const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/appointmentOptions?date=${date}`);
            const data = await res.json();
            return data
        }
    })

    if (isLoading) {

        return <Loading></Loading>
    }

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
                    refetch={refetch}
                ></BookingModal>}
        </section>
    );
};

export default AvailableAppoinments;