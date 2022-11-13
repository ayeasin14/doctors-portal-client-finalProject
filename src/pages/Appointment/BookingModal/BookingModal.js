import { format } from 'date-fns/esm';
import React from 'react';

const BookingModal = ({ treatment, selectedData, setTreatment }) => {
    const { name, slots } = treatment; //treatment is appointmentOptions. just we change it .
    const date = format(selectedData, 'PP');

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const slot = form.slot.value;
        const phone = form.phone.value;

        const booking = {
            appointmentdData: date,
            treatment: name,
            patient: name,
            slot,
            email,
            phone,
        }

        console.log(booking);
        setTreatment(null);
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-6 my-5'>
                        <input type="text" disabled value={date} className="input w-full input-bordered " />

                        <select name="slot" className="select select-bordered w-full" required>
                            {
                                slots.map((slot, i) => <option
                                    key={i}
                                    value={slot}>{slot}</option>)
                            }
                        </select>

                        <input name='name' type="text" placeholder="Your Name" className="input w-full input-bordered" required />
                        <input name='email' type="email" placeholder="Email Address" className="input w-full input-bordered" required />
                        <input name='phone' type="text" placeholder="Phone Number" className="input w-full input-bordered " required />
                        <input type="submit" className='btn btn-accent w-full' value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;