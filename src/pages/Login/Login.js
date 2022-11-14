import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit } = useForm();

    const handleLogin = data => {
        console.log(data);
    }


    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h1 className='text-xl text-center'>Login</h1>
                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Email</span> </label>

                        <input {...register("email")} type="text" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span> </label>

                        <input {...register("password")} type="password" className="input input-bordered w-full max-w-xs" />

                        <label className="label"><span className="label-text">Forget Password</span> </label>
                    </div>

                    <input className='w-full my-6 btn btn-accent' value="Login" type="submit" />
                </form>
                <p>New to Doctors Portal? <Link to='/signup' className='text-secondary'>Create an account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;