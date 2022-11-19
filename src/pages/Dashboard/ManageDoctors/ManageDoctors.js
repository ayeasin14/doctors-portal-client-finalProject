import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const ManageDoctors = () => {

    const [deletingDoctor, setDeletingDoctor] = useState(null);

    const closeModal = () => {
        setDeletingDoctor(null);
    }



    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch (error) {

            }
        }
    });

    const handleDeleteDoctor = doctor => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    refetch();
                    toast.success(`Doctor ${doctor.name} Deleted Successfull`)
                }
            })
    }

    if (isLoading) {
        return <progress className="progress w-56"> Please Wait...</progress>
    }


    return (
        <div>
            <h1 className="text-4xl">Manage Doctors : {doctors?.length}</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, i) => <tr
                                key={doctor._id}
                            >
                                <th>{i + 1}</th>
                                <th>
                                    <div className="avatar">
                                        <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img alt='' src={doctor.image} />
                                        </div>
                                    </div>
                                </th>
                                <th>{doctor.name}</th>
                                <th>{doctor.email}</th>
                                <th>{doctor.specialty}</th>
                                <th>
                                    <label
                                        onClick={() => setDeletingDoctor(doctor)}
                                        htmlFor="confirmation-modal" className="btn btn-sm btn-error text-white">Delete</label>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                    title={`Are you sure you want to delete!!!`}
                    message={`if you delete ${deletingDoctor.name}. It can't be recover!!!`}
                    successAction={handleDeleteDoctor}
                    successButtonName='Delete'
                    modalData={deletingDoctor}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }

        </div>
    );
};

export default ManageDoctors;