import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/Loading';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';

const TutionDetails = () => {
    const {id}=useParams();
    const {user}=useAuth();
    const {role,roleLoading}=useRole();
    const tutionApplyModalRef=useRef(null);

    const axiosSecure=useAxiosSecure();
    const {data:tution=[]}=useQuery({
        queryKey:['myTution',id],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/tutions/${id}`);
            return res.data;
        }
    });
    const {register,handleSubmit,formState:{errors}}=useForm();
    const handleModalOpen=()=>{
        tutionApplyModalRef.current?.showModal();
    }
    const handleApplyTution=tutorInfo=>{
        console.log(tutorInfo);
    }
    if(roleLoading || !user)
        {
            return <Loading/>
        }
        console.log(role);
    const {subject,studentClass,location,budget,school,days,teachingTime,studentGender,curriculum,details,createdAt,status}=tution;
    
    return (
        <div className='md:w-1/2 mx-auto'>
            <h2 className='font-bold text-3xl text-center text-primary1 my-5'>Tution Details</h2>
            <div className='border rounded-2xl p-5  space-y-3'>
        <p>Subject: <span className='font-semibold'>{subject}</span></p>
            <p>Student Class: <span className='font-semibold'>{studentClass}</span></p>
            <p>Location: <span className='font-semibold'>{location}</span></p>
            <p>Budget: <span className='font-semibold'>{budget}</span></p>
            <p>School: <span className='font-semibold'>{school}</span></p>
            <p>Days: <span className='font-semibold'>{days}</span></p>
            <p>Teaching Time: <span className='font-semibold'>{teachingTime}</span></p>
            <p>Student Gender: <span className='font-semibold'>{studentGender}</span></p>
            <p>Curriculum: <span className='font-semibold'>{curriculum}</span></p>
            <p>Details: <span className='font-semibold'>{details}</span></p>
            <p>Created At: <span className='font-semibold'>{createdAt}</span></p>
            <p>Status: <span className='font-semibold'>{status}</span></p>
            <p>Applied Tutor: <span className='font-semibold'></span></p>
{role==='tutor' &&  
<button onClick={handleModalOpen} className='btn bg-primary1 w-full'>Apply</button>
}
   <dialog ref={tutionApplyModalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
   
    <form onSubmit={handleSubmit(handleApplyTution)}>
    <div className='flex flex-col md:flex-row gap-10 py-4 flex-1'>
    
     
        <div className='flex-1'>
    <fieldset className="fieldset">
            {/* name */}
            
          <label className="label">Name <span className='text-red-600 text-2xl'>*</span></label>
          <input value={user?.displayName} readOnly {...register('displayName',{required:'Name is Required'})} type="text" className="input w-full" placeholder="Subject" />
{errors.displayName && <p className='text-sm text-red-500'>{errors.displayName.message}</p>}
        
        {/* Email */}
          <label className="label">Email <span className='text-red-600 text-2xl'>*</span></label>
          <input value={user?.email} {...register('email',{required:'Class is Required'})} type="text" className="input w-full" placeholder="Class" />
{errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
          
          {/* qualifications */}
          <label className="label">Qualifications <span className='text-red-600 text-2xl'>*</span></label>
            <textarea  {...register('qualifications',{required:'Qualifications is Required'})} className='textarea textarea-bordered w-full'  placeholder=' Your Qualifications...'></textarea>

 {errors.qualifications && <p className='text-sm text-red-500'>{errors.qualifications.message}</p>}
       
          {/* Experience */}
          <label className="label">Experience <span className='text-red-600 text-2xl'>*</span></label>
          <input  {...register('experience',{required:'Experience is Required'})} type="text" className="input w-full" placeholder="Experience" />
           {errors.experience && <p className='text-sm text-red-500'>{errors.experience.message}</p>}
          {/* expectedSalary */}
          <label className="label">Expected Salary<span className='text-red-600 text-2xl'>*</span></label>
          <input  {...register('expectedSalary',{required:'Expected Salary is Required'})} type="text" className="input w-full" placeholder="Expected Salary" />
          {errors.expectedSalary && <p className='text-sm text-red-500'>{errors.expectedSalary.message}</p>}
          </fieldset>
</div>


    </div>
          <button className="btn bg-primary1 mt-4 w-full">Submit</button>
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
    </div>
    );
};

export default TutionDetails;