import React, { useRef } from 'react';
import userImg from '../../../assets/User.png';
const ManageUserCard = ({user}) => {
    const {role,displayName,email,createdAt,_id,phoneNumber,photoURL}=user;
    const userInfoModal=useRef(null);
    const handleModalOpen=()=>{
        userInfoModal.current?.showModal();
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

               
                    <button   className='btn bg-primary1'>Edit Info</button>
            
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
            </div>
        </div>
    );
};

export default ManageUserCard;