import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import AvailableAppoinments from '../AvailableAppoinments/AvailableAppoinments';

const Appointment = () => {


    const [selectedData, setSelectedData] = useState(new Date())

    return (
        <div>
            <AppointmentBanner
                selectedData={selectedData}
                setSelectedData={setSelectedData}
            ></AppointmentBanner>
            <AvailableAppoinments
                selectedData={selectedData}
            ></AvailableAppoinments>
        </div>
    );
};

export default Appointment;