import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='text-center'>
            <h1 className='text-5xl text-red-700 font-bold my-24 w-3/4 mx-auto'>You are want to wrong way. Please click the path for go Home</h1>
            <Link to='/' className='w-1/2 mx-auto'><button className='btn btn-error'>Go Home Page</button></Link>
        </div>
    );
};

export default ErrorPage;