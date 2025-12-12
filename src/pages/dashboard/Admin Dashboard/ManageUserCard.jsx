import React, { useRef } from 'react';
import userImg from '../../../assets/User.png';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
const ManageUserCard = ({user,refetch}) => {
    const {role,displayName,email,createdAt,_id,phoneNumber,photoURL}=user;
    const axiosSecure=useAxiosSecure();
    const userInfoModal=useRef(null);
    const userEditModal=useRef(null);
    const handleModalOpen=()=>{
        userInfoModal.current?.showModal();
    }
    const handleEditModalOpen=()=>{
        userEditModal.current?.showModal();
    }
    const {register,handleSubmit,formState:{errors}}=useForm();
    const handleUpdateProfile=updatedUserInfo=>{
        
        axiosSecure.patch(`/users/${email}`,updatedUserInfo)
        .then((res)=>{
            if(res.data.modifiedCount)
            {
                refetch();
                userEditModal.current?.close();
                   Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Tution Post Updated`,
                        showConfirmButton: false,
                        timer: 2000
                         });
            }
        })
    }
    return (
        <div className='border rounded-2xl p-5 lg:w-2/3 mx-auto'>
            <h3 className='py-2.5 text-center '> <span className={`font-semibold text-2xl `}>{role.toUpperCase()}</span></h3> 
            <div className='grid grid-cols-1 md:grid-cols-2'>
        {/* left side info s */}
       <div className='flex items-center gap-3'>
        <img className='rounded  w-15 object-contain' referrerPolicy='no-referrer' src={photoURL?photoURL:userImg} alt="" />
         <div>
                <p className=''>Name: <span className='font-semibold'>{displayName}</span></p>
            <p>Email: <span className='font-semibold'>{email}</span></p>
            
            </div>
       </div>

            {/* right side actions */}
            <div className='flex flex-col'>
                <button onClick={handleModalOpen}  className='btn text-primary1 w-full'>View Details</button>

               
                    <button onClick={handleEditModalOpen}  className='btn bg-primary1'>Edit Info</button>
            
                <button  className='btn text-primary1'>Delete Account</button>
                <div  className='border rounded-xl p-2 grid md:grid-cols-3 grid-cols-1 place-items-center gap-2'>
                    <span>Change Role:</span>
                    {role==='student' &&
                    <>
                    <span className='btn btn-accent w-full'>Tutor</span>
                    <span className='btn btn-neutral w-full'>Admin</span>
                    </>
                    }
                    {role==='tutor' &&
                    <>
                    <span className='btn btn-secondary w-full'>Student</span>
                    <span className='btn btn-neutral w-full'>Admin</span>
                    </>
                    }
                    {role==='admin' &&
                    <>
                    <span className='btn btn-secondary w-full'>Student</span>
                    <span className='btn btn-accent w-full'>Tutor</span>
                    </>
                    }
                    
                </div>
        

                
            </div>
            {/* User Info Modal */}
         <dialog  ref={userInfoModal} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">

  <h2 className='font-bold text-3xl text-center text-primary1 my-5'>User Details</h2>
 
    <div className='border rounded-2xl p-5  space-y-3'>
         <img className='rounded  w-30 object-contain mx-auto' referrerPolicy='no-referrer' src={photoURL?photoURL:userImg} alt="" />

        <p className=''>ID: <span className='font-semibold'>{_id}</span></p>
        <p className=''>Name: <span className='font-semibold'>{displayName}</span></p>
            <p>Email: <span className='font-semibold'>{email}</span></p>
            <p>Phone Number: <span className='font-semibold'>{phoneNumber}</span></p>
            <p>Created At: <span className='font-semibold'>{createdAt}</span></p>
            
    </div>

    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

{/* User Edit Modal */}
         <dialog  ref={userEditModal} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
 
    <div className='card w-full max-w-sm mx-auto  shrink-0'>
            <h2 className="text-3xl font-bold text-center text-primary1 my-5">Update User Profile</h2>
          <div className='card-body'>
              <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <fieldset className="fieldset">
                    {/* name */}
            <label className="label">Name</label>
          <input defaultValue={displayName}  {...register('displayName',{required:true})} type="text" className="input" placeholder="Name" />
        {
            errors.name?.type==='required' &&
            <p className='text-red-600 text-sm'>Name is Required</p>
        }
        {/* photoURL */}
            <label className="label">PhotoURL</label>
          <input defaultValue={photoURL} {...register('photoURL',{required:true})} type="text" className="input" placeholder="PhotoURL" />
        {
            errors.photo?.type==='required' &&
            <p className='text-red-600 text-sm'>Photo is Required</p>
        }
        {/* phone */}
          <label className="label">Phone</label>
          <input defaultValue={phoneNumber} {...register('phoneNumber',{required:'Phone Number Is Required.',
            pattern:{
                value:/^(?:\+?88)?01[3-9]\d{8}$/,
                message:'Please Enter A Valid Bangladeshi Phone Number'
            }}
          )} type="tel" inputMode='tel' className="input" placeholder="Your Phone Number" />
          
          {
            errors.phone &&
            <p className='text-red-600 text-sm'>{errors.phone.message}</p>
          }
<button className="btn bg-primary1 mt-4">Update Profile</button>
                </fieldset>
            </form>
          </div>

        </div>

    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
            </div>
        </div>
    );
};

export default ManageUserCard;