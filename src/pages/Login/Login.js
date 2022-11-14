import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('')

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = data => {
        console.log(data);
        setLoginError('');

        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });

            })
            .catch(error => {
                console.error(error.message)
                setLoginError(error.message);
            })
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

                    <div>
                        {loginError && <p className='text-red-600 my-3'>{loginError}</p>}
                    </div>
                </form>
                <p>New to Doctors Portal? <Link to='/signup' className='text-secondary'>Create an account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;