import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import useAxiosSecure from '../hooks/useAxiosSecure';
import GoogleLogin from '../components/Social Login/GoogleLogin';

const Register = () => {
    const {createAccount,updateUserProfile,setUser,setLoading,loading}=useAuth();
    const navigate=useNavigate();
    const location=useLocation();
    const axiosSecure=useAxiosSecure();
    const {register,handleSubmit,formState:{errors}}=useForm();
    if(loading)
    {
        return <Loading></Loading>
    }
    const handleRegister=data=>{
        
        const userInfo={
            displayName:data.name,
            email:data.email,
            role:data.role,
            phone:data.phone
        };
        createAccount(data.email,data.password)
        .then(result=>{
            console.log(result.user);
            const user=result.user;
            axiosSecure.post('/users',userInfo)
            .then((res)=>{
                if(res.data.insertedId)
                {
                    console.log('user saved in database');
                }
            });
            updateUserProfile({displayName:data.name})
            .then(()=>{
                setUser({...user,displayName:data.name});
                navigate(`${location.state || "/"}`);
                toast.success('Registered Successfully');
            })
            
        })
        .catch(error=>{
            console.log(error);
        })
        .finally(()=>setLoading(false))

    }
    return (
       <div className='min-h-screen grid place-items-center'>
         <div className="card bg-base-100 w-full max-w-sm  shrink-0 shadow-2xl mx-auto  ">
      <h1 className="text-4xl text-center text-primary1 font-bold">Create Your Account</h1>
      <div className="card-body">
       <form onSubmit={handleSubmit(handleRegister)}>
         <fieldset className="fieldset">

            {/* name */}
            <label className="label">Name</label>
          <input {...register('name',{required:true})} type="text" className="input" placeholder="Name" />
        {
            errors.name?.type==='required' &&
            <p className='text-red-600 text-sm'>Name is Required</p>
        }
        {/* photoURL */}
            {/* <label className="label">Photo</label>
          <input {...register('name',{required:true})} type="text" className="input" placeholder="Name" />
        {
            errors.name?.type==='required' &&
            <p className='text-red-600 text-sm'>Photo is Required</p>
        } */}

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
        {/* {
            errors.password?.type==='required' &&
            <p className='text-red-600 text-sm'>Password is Required</p>
        } */}
        {errors.password &&
        <p className='text-red-600 text-sm'>{errors.password.message}</p>
        }
        {/* role selection */}
        <label className="label">Register As</label>
        <select {...register('role',{required:true})} defaultValue="Pick Your Role" className="select ">
  <option disabled={true}>Register As</option>
  <option>Student</option>
  <option>Tutor</option>

</select>
{
 errors.role?.type==='required' &&
    <p className='text-red-600 text-sm'>Role is Required</p>
}

 {/* phone */}
          <label className="label">Phone</label>
          <input {...register('phone',{required:'Phone Number Is Required.',
            pattern:{
                value:/^(?:\+?88)?01[3-9]\d{8}$/,
                message:'Please Enter A Valid Bangladeshi Phone Number'
            }}
          )} type="tel" inputMode='tel' className="input" placeholder="Your Phone Number" />
          {/* <div><a className="link link-hover">Forgot password?</a></div> */}
          {
            errors.phone &&
            <p className='text-red-600 text-sm'>{errors.phone.message}</p>
          }
          <button className="btn bg-primary1 mt-4">Create Account</button>

          <p>Already Have An Account? <Link to="/auth/login" className='hover:font-bold text-primary1'>Login</Link></p>
        </fieldset>
       </form>
       <GoogleLogin></GoogleLogin>
      </div>
    </div>
       </div>
    );
};

export default Register;