import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Tution = ({tution,tutionInfoRefetch}) => {
    const {_id,subject,studentClass,location,budget,school,days,teachingTime,studentGender,curriculum,details}=tution;
    const axiosSecure=useAxiosSecure();
    const tutionModalRef=useRef(null);
    const handleModalOpen=()=>{
        tutionModalRef.current.showModal();
    };
    const {register,handleSubmit,formState:{errors}}=useForm();
    const handleUpdateTution=updatedTutioninfo=>{
        console.log(updatedTutioninfo);
        axiosSecure.patch(`/tution/${_id}`,updatedTutioninfo)
        .then(res=>{
            if(res.data.modifiedCount)
            {
                tutionInfoRefetch();
                tutionModalRef.current.close();
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
        <div className='grid grid-cols-1 md:grid-cols-2 border rounded-2xl p-5 gap-5 w-10/12  mx-auto '>
            <div className='space-y-2'>
                <p className=''>Tution ID: <span className='font-semibold'>{_id}</span></p>
            <p>Subject: <span className='font-semibold'>{subject}</span></p>
            <p>Class: <span className='font-semibold'>{studentClass}</span></p>
            {/* </div>
            <div className='space-y-2'> */}
            <p>Location: <span className='font-semibold'>{location}</span></p>
            <p>Budget: <span className='font-semibold'>{budget}</span></p>
            
            </div>
            <div className='flex gap-5 flex-col '>
                <Link to={`/dashboard/tutionDetails/${_id}`} className='btn text-primary1'>View Details</Link>
                <button onClick={handleModalOpen} className='btn bg-primary1'>Edit</button>
                <button className='btn btn-warning'>Delete</button>
            </div>
              <dialog ref={tutionModalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
   
    <form onSubmit={handleSubmit(handleUpdateTution)}>
    <div className='flex flex-col md:flex-row gap-10 py-4 flex-1'>
     {/* Left Side */}
     
        <div className='flex-1'>
    <fieldset className="fieldset">
            {/* subject */}
            
          <label className="label">Subject <span className='text-red-600 text-2xl'>*</span></label>
          <input defaultValue={subject} {...register('updatedSubject',{required:'Subject is Required'})} type="text" className="input w-full" placeholder="Subject" />
{errors.updatedSubject && <p className='text-sm text-red-500'>{errors.updatedSubject.message}</p>}
        
        {/* class */}
          <label className="label">Class <span className='text-red-600 text-2xl'>*</span></label>
          <input defaultValue={studentClass} {...register('updatedStudentClass',{required:'Class is Required'})} type="text" className="input w-full" placeholder="Class" />
{errors.updatedStudentClass && <p className='text-sm text-red-500'>{errors.class.message}</p>}
          
          {/* location */}
          <label className="label">Location <span className='text-red-600 text-2xl'>*</span></label>
          <input defaultValue={location} {...register('updatedLocation',{required:'Location is Required'})} type="text" className="input w-full" placeholder="Location" />
 {errors.updatedLocation && <p className='text-sm text-red-500'>{errors.updatedLocation.message}</p>}
       
          {/* Budget */}
          <label className="label">Budget <span className='text-red-600 text-2xl'>*</span></label>
          <input defaultValue={budget} {...register('updatedBudget',{required:'Budget is Required'})} type="text" className="input w-full" placeholder="Budget ( in BDT )" />
           {errors.updatedBudget && <p className='text-sm text-red-500'>{errors.updatedBudget.message}</p>}
          {/* Student's School */}
          <label className="label">Student's School</label>
          <input defaultValue={school} {...register('updatedSchool')} type="text" className="input w-full" placeholder="Student's School" />
          </fieldset>
</div>

{/* Right Side */}
          <div className='flex-1 '>
            <fieldset className="fieldset">
            {/* Days/week */}
          <label className="label">Days/week</label>
          <input defaultValue={days} {...register('updatedDays',
            {validate:(value)=>{
                const num=Number(value);
if(isNaN(num))  return "Days Must Be A Number";
                
                return num<=7 || "Days cannot be greater than 7";
            }})} type="text" className="input w-full" placeholder="Days/week" />

{errors.updatedDays && <p className='text-sm text-red-500'>{errors.updatedDays.message}</p>}

          {/* Teaching Time */}
          <label className="label">Teaching Time</label>
          <input defaultValue={teachingTime} {...register('updatedTeachingTime')} type="text" className="input w-full" placeholder="Teaching Time(e.g: 10:00AM-11:30AM)" />
          {/* Student Gender */}
          <label className="label">Student Gender</label>
          <select defaultValue={studentGender} {...register('updatedStudentGender')}  className="select w-full">
  <option disabled={true}>Student's Gender</option>
  <option>Male</option>
  <option>Female</option>
  
</select>
          {/* Student Curriculum */}
          <label className="label">Student Curriculum</label>
          <select defaultValue={curriculum} {...register('updatedCurriculum')}  className="select w-full">
  <option disabled={true}>Select Curriculum</option>
  <option>Bangla Version</option>
  <option>English Version</option>
  <option>English Medium</option>
</select>
          {/* Details */}
          <label className="label">Details </label>
          <textarea defaultValue={details} {...register('updatedDetails')} className='textarea textarea-bordered w-full' rows={"5"} placeholder='Details About Your Requirements...'></textarea>

        </fieldset>
          </div>
    </div>
          <button className="btn bg-primary1 mt-4 w-full">Update TUTION POST</button>
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

export default Tution;