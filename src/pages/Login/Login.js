import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

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

                        <input
                            {...register("email",
                                { required: "Email Address is required" })}
                            type="email"
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600' >{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"><span className="label-text">Password</span> </label>

                        <input {...register("password", {
                            required: "Password Address is required",
                            minLength: { value: 6, message: 'Password must be 6 character or longer' }
                        })}
                            type="password"
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}

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