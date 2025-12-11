import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';

const UpdateProfile = () => {
    const {user,setUser,loading,updateUserProfile}=useAuth();
    console.log(user);
    const axiosSecure=useAxiosSecure();
    
    const {register,handleSubmit,formState:{errors},reset}=useForm();
    
    useEffect(()=>{
        if(user)
        {
            reset({
            displayName:user?.displayName || "",
            photoURL:user?.photoURL || "",
            phoneNumber:user?.phoneNumber || ""
            })
        }
    },[user,reset]);

    if(loading)
    {
        return <Loading></Loading>
    }
    if(!user)
{
    return <Loading></Loading>
}
    const handleUpdateProfile=updatedUserInfo=>{
        Swal.fire({
          title: "Are you sure?",
          text: "Your Profile Will be Updated",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Update My Profile"
        }).then((result) => {
          if (result.isConfirmed) {
            axiosSecure.patch(`/users/${user.email}`,updatedUserInfo)
            .then(res=>{
                if(res.data.modifiedCount)
                {
                    updateUserProfile({...updatedUserInfo})
                    .then(()=>{

                        setUser({...user,...updatedUserInfo});
                Swal.fire({
              title: "Profile Updated!",
              text: "Your Profile has been Updated.",
              icon: "success"
            });
                    })
                    .catch(err=>console.log(err.code))
               
        }})
    }})
    }
    return (
       <div className=''>
         <div className='card w-full max-w-sm mx-auto  shrink-0'>
            <h2 className="text-3xl font-bold text-center text-primary1 my-5">Update Your Profile</h2>
          <div className='card-body'>
              <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <fieldset className="fieldset">
                    {/* name */}
            <label className="label">Name</label>
          <input  {...register('displayName',{required:true})} type="text" className="input" placeholder="Name" />
        {
            errors.name?.type==='required' &&
            <p className='text-red-600 text-sm'>Name is Required</p>
        }
        {/* photoURL */}
            <label className="label">PhotoURL</label>
          <input {...register('photoURL',{required:true})} type="text" className="input" placeholder="PhotoURL" />
        {
            errors.photo?.type==='required' &&
            <p className='text-red-600 text-sm'>Photo is Required</p>
        }
        {/* phone */}
          {/* <label className="label">Phone</label>
          <input  {...register('phoneNumber',{required:'Phone Number Is Required.',
            pattern:{
                value:/^(?:\+?88)?01[3-9]\d{8}$/,
                message:'Please Enter A Valid Bangladeshi Phone Number'
            }}
          )} type="tel" inputMode='tel' className="input" placeholder="Your Phone Number" />
          
          {
            errors.phone &&
            <p className='text-red-600 text-sm'>{errors.phone.message}</p>
          } */}
<button className="btn bg-primary1 mt-4">Update Profile</button>
                </fieldset>
            </form>
          </div>

        </div>
       </div>
    );
};

export default UpdateProfile;