import React from 'react';
import chair from '../../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import bg from '../../../assets/images/bg.png';

const AppointmentBanner = ({ selectedData, setSelectedData }) => {

    return (
        <header
            className="my-6 p-10"
            style={{
                background: `url(${bg})`,
                backgroundSize: 'cover'
            }}
        >
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={chair} className="lg:w-1/2 rounded-lg shadow-2xl" alt='' />
                    <div className='mr-6'>
                        <DayPicker
                            mode='single'
                            selected={selectedData}
                            onSelect={setSelectedData}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;