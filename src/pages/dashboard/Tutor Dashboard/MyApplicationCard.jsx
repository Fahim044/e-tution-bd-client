import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyApplicationCard = ({app,queryClient,user,refetch}) => {
    
    const {expectedSalary,experience,qualifications,status,tutionId,subject,days,location,teachingTime,studentClass,tutorPhone,_id}=app;
    
    const axiosSecure=useAxiosSecure();
    
    const {register,handleSubmit,formState:{errors}}=useForm();
    
    const updateTutionAppModalRef=useRef();
    
    const handleUpdateModalOpen=()=>{
        updateTutionAppModalRef.current?.showModal();
        
    }
    const handleUpdateTutionApp=(updatedInfo)=>{
        
        // console.log(updatedInfo);
        axiosSecure.patch(`/tutor-requests/${_id}`,updatedInfo)
        .then(res=>{
            if(res.data.modifiedCount)
            {
                queryClient.invalidateQueries(['tutorRequests',user.email]);
                // refetch();
                updateTutionAppModalRef.current?.close();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Your Tution Application has been Updated `,
                showConfirmButton: false,
                timer: 2000
                 });
            }
        })    

    }

    // delete
    const handleDeleteApp=(id)=>{
        Swal.fire({
                 title: "Are you sure to delete this application?",
                 text: "You won't be able to revert this!",
                 icon: "warning",
                 showCancelButton: true,
                 confirmButtonColor: "#3085d6",
                 cancelButtonColor: "#d33",
                 confirmButtonText: "Yes"
               }).then((result) => {
                 if (result.isConfirmed) {
                   axiosSecure.delete(`/tutor-requests/${id}`)
                   .then(res=>{
                       if(res.data.deletedCount)
                       {
                            Swal.fire({
                     title: "Deleted!",
                     text: `This Application has been Deleted.`,
                     icon: "success"
                   });
                   refetch();
                       }
                   })
                  
                 }
               }); 
    }
    return (
        <div className='border rounded-2xl p-5 w-11/12 lg:w-2/3 mx-auto '>
            <h3 className="text-center ">Status: <span className={`font-semibold text-xl ${status==='approved' && 'text-success'} ${status==='rejected' && 'text-red-600'}`}>{status.toUpperCase()}</span></h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3.5 '>
                <div>
                    <p>Tution ID: <span className='font-semibold text-lg'>{tutionId}</span></p>
                    <p>Subject: <span className='font-semibold text-lg'>{subject}</span></p>
                    <p>Class: <span className='font-semibold text-lg'>{studentClass}</span></p>
                    <p>Location: <span className='font-semibold text-lg'>{location}</span></p>
                    <p>Days: <span className='font-semibold text-lg'>{days}</span></p>
                    <p>Teaching Time: <span className='font-semibold text-lg'>{teachingTime}</span></p>
                    <p>Expected Salary: <span className='font-semibold text-lg'>{expectedSalary}</span></p>
                    <p>Experience: <span className='font-semibold text-lg'>{experience}</span></p>
                    
                    <p>Qualifications: <span className='font-semibold text-lg'>{qualifications}</span></p>
                </div>
                <div className='flex flex-col gap-3 my-auto'>
                    {
                        status==='pending' &&
                        <>
                        <button onClick={handleUpdateModalOpen} className='btn bg-primary1 w-full'>Update</button>
                        <button onClick={()=>handleDeleteApp(_id)} className='btn btn-warning w-full'>Delete</button>
                        </>
                    }
                </div>
            </div>
            {/* modal */}
            <dialog ref={updateTutionAppModalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
   
    <form onSubmit={handleSubmit(handleUpdateTutionApp)}>
    <div className='flex flex-col md:flex-row gap-10 py-4 flex-1'>
    
     
        <div className='flex-1'>
    <fieldset className="fieldset">
            {/* name */}
            
          <label className="label">Name <span className='text-red-600 text-2xl'>*</span></label>
          <input value={user?.displayName} readOnly {...register('displayName',{required:'Name is Required'})} type="text" className="input w-full" placeholder="Subject" />
{errors.displayName && <p className='text-sm text-red-500'>{errors.displayName.message}</p>}
        
        {/* Email */}
          <label className="label">Email <span className='text-red-600 text-2xl'>*</span></label>
          <input value={user?.email} {...register('tutorEmail',{required:'Email is Required'})} type="text" className="input w-full" placeholder="Email" />
{errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
          
          {/* qualifications */}
          <label className="label">Qualifications <span className='text-red-600 text-2xl'>*</span></label>
            <textarea defaultValue={qualifications} rows={4} {...register('qualifications',{required:'Qualifications is Required'})} className='textarea textarea-bordered w-full'  placeholder=' Your Qualifications...
            e.g: Hons from Dhaka University (Math)
            HSC 2021- GPA-5.00
            SSC 2019-GPA-5.00
            '></textarea>

 {errors.qualifications && <p className='text-sm text-red-500'>{errors.qualifications.message}</p>}
       
          {/* Experience */}
          <label className="label">Experience <span className='text-red-600 text-2xl'>*</span></label>
          <input defaultValue={experience} {...register('experience',{required:'Experience is Required'})} type="text" className="input w-full" placeholder="Experience" />
           {errors.experience && <p className='text-sm text-red-500'>{errors.experience.message}</p>}
          {/* expectedSalary */}
          <label className="label">Expected Salary<span className='text-red-600 text-2xl'>*</span></label>
          <input defaultValue={expectedSalary}  {...register('expectedSalary',{required:'Expected Salary is Required',valueAsNumber:true,min:{
            value:1,
            message:'Salary must be greater than 0'
          }})} type="number" className="input w-full" placeholder="Expected Salary" />
          {errors.expectedSalary && <p className='text-sm text-red-500'>{errors.expectedSalary.message}</p>}

          {/* tutor phone number */}

          {/* phone */}
          <label className="label">Phone<span className='text-red-600 text-2xl'>*</span></label>
          <input defaultValue={tutorPhone} {...register('tutorPhone',{required:'Phone Number Is Required.',
            pattern:{
                value:/^(?:\+?88)?01[3-9]\d{8}$/,
                message:'Please Enter A Valid Bangladeshi Phone Number'
            }}
          )} type="tel" inputMode='tel' className="input" placeholder="Your Phone Number" />
         
          {
            errors.tutorPhone &&
            <p className='text-red-600 text-sm'>{errors.tutorPhone.message}</p>
          }
          </fieldset>
</div>


    </div>
          <button className="btn bg-primary1 mt-4 w-full">Update</button>
            </form>

    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
        </div>
    );
};

export default MyApplicationCard;