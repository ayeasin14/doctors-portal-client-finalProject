import { format } from 'date-fns/esm';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ treatment, selectedData, setTreatment, refetch }) => {
    const { name: treatmentName, slots } = treatment; //treatment is appointmentOptions. just we change it .
    const date = format(selectedData, 'PP');
    const { user } = useContext(AuthContext);

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking = {
            appointmentData: date,
            treatment: treatmentName,
            patient: name,
            slot,
            email,
            phone,
        }

        fetch('http://localhost:5000/bookings', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Booking confirmed');
                    refetch();
                }

            })

    }


    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{treatmentName}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-6 my-5'>
                        <input type="text" disabled value={date} className="input w-full input-bordered " />

                        <select name="slot" className="select select-bordered w-full" required>
                            {
                                slots.map((slot, i) => <option
                                    key={i}
                                    value={slot}>{slot}</option>)
                            }
                        </select>

                        <input name='name' type="text" placeholder="Your Name" disabled defaultValue={user?.displayName} className="input w-full input-bordered" required />
                        <input name='email' disabled defaultValue={user?.email} type="email" placeholder="Email Address" className="input w-full input-bordered" required />
                        <input name='phone' type="text" placeholder="Phone Number" className="input w-full input-bordered " />
                        <input type="submit" className='btn btn-accent w-full' value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;