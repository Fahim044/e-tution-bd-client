import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import GoogleLogin from '../components/Social Login/GoogleLogin';
import Logo from '../components/Logo';

const Login = () => {
    const {logIn,loading,setLoading}=useAuth();
    const navigate=useNavigate();
    const location=useLocation();
    const {register,handleSubmit,formState:{errors}}=useForm();
    if(loading)
    {
        return <Loading></Loading>
    }
    const handleLogin=(data)=>{
// console.log(data);
logIn(data.email,data.password)
.then(()=>{
    toast.success('Logged In Successfully');
    navigate(`${location.state || "/"}`);
})
.catch(err=>{
    toast.error(err.code);
})
.finally(()=>setLoading(false));
    }
    return (
         <div className='min-h-screen grid place-items-center'>
          <Logo/>
         <div className="card bg-base-100 w-full max-w-sm  shrink-0 shadow-2xl mx-auto  ">
      <h1 className="text-4xl text-center text-primary1 font-bold">Login Your Account</h1>
      <div className="card-body">
       <form onSubmit={handleSubmit(handleLogin)}>
         <fieldset className="fieldset">

            {/* email */}
          <label className="label">Email</label>
          <input {...register('email',{required:'Email is Required',
            pattern:{
                value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message:'Please Enter A Valid Email'
            }
          })} type="email" className="input" placeholder="Email" />
        {/* {
            errors.email?.type==='required' &&
            <p className='text-red-600 text-sm'>Email is Required</p>
        } */}
        {
            errors.email && 
            <p className='text-red-600 text-sm'>{errors.email.message}</p>
        }
          {/* password */}
          <label className="label">Password</label>
          <input {...register('password',{required:'Password is Required',
            pattern:{
                value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/,
                message:'Password must contain at least 8 characters including one uppercase,one lowercase,one number,one special character '
            }
          })} type="password" className="input" placeholder="Password" />
       
        {errors.password &&
        <p className='text-red-600 text-sm'>{errors.password.message}</p>
        }
    
          <button className="btn bg-primary1 mt-4">Login</button>
          <p>New to E-TUTION BD? <Link to="/auth/register" className='hover:font-bold text-primary1 '>Create Account</Link></p>
        </fieldset>
       </form>
       <GoogleLogin></GoogleLogin>
      </div>
    </div>
       </div>
    );
};

export default Login;