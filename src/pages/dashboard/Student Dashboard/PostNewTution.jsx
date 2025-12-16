import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const PostNewTution = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {register,handleSubmit,formState:{errors},reset}=useForm();
    const handlePostTution=tutionInfo=>{
        tutionInfo.studentEmail=user?.email;
        Swal.fire({
  title: "Are you sure to post this Tution?",
  text: "",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Post Tution"
}).then((result) => {
  if (result.isConfirmed) {
    axiosSecure.post('/tutions',tutionInfo)
    .then(res=>{
        if(res.data.insertedId)
        {
            Swal.fire({
      title: "Tution Posted",
      text: "Your tution has been posted.",
      icon: "success"
    });
    reset();
        }
    })

    
  }
});
    }
    return (
        <div className='w-2/3 mx-auto py-4'>
            <h2 className='font-bold text-3xl text-center text-primary1'>Post New Tution</h2>
            <form onSubmit={handleSubmit(handlePostTution)}>
    <div className='flex flex-col md:flex-row gap-10 py-4 flex-1'>
     {/* Left Side */}
     
        <div className='flex-1'>
    <fieldset className="fieldset">
            {/* subject */}
            
          <label className="label">Subject <span className='text-red-600 text-2xl'>*</span></label>
          <input {...register('subject',{required:'Subject is Required'})} type="text" className="input w-full" placeholder="Subject" />

          {errors.subject && <p className='text-sm text-red-500'>{errors.subject.message}</p>}
        {/* class */}
          <label className="label">Class <span className='text-red-600 text-2xl'>*</span></label>
          <input {...register('studentClass',{required:'Class is Required'})} type="text" className="input w-full" placeholder="Class" />

          {errors.studentClass && <p className='text-sm text-red-500'>{errors.class.message}</p>}
          {/* location */}
          <label className="label">Location <span className='text-red-600 text-2xl'>*</span></label>
          <input  {...register('location',{required:'Location is Required'})} type="text" className="input w-full" placeholder="Location" />

        {errors.location && <p className='text-sm text-red-500'>{errors.location.message}</p>}
          {/* Budget */}
          <label className="label">Budget <span className='text-red-600 text-2xl'>*</span></label>
          <input {...register('budget',{required:'Budget is Required',valueAsNumber:true,min:{
            value:1,
            message:'Budget must be greater than 0'
          }})} type="number" className="input w-full" placeholder="Budget ( in BDT )" />
          {errors.budget && <p className='text-sm text-red-500'>{errors.budget.message}</p>}
          {/* Student's School */}
          <label className="label">Student's School</label>
          <input {...register('school')} type="text" className="input w-full" placeholder="Student's School" />
          </fieldset>
</div>

{/* Right Side */}
          <div className='flex-1 '>
            <fieldset className="fieldset">
            {/* Days/week */}
          <label className="label">Days/week</label>
          <input {...register('days',
            {validate:(value)=>{
                const num=Number(value);
if(isNaN(num))  return "Days Must Be A Number";
                
                return num<=7 || "Days cannot be greater than 7";
            }}
          )} type="text" className="input w-full" placeholder="Days/week" />

          {errors.days && <p className='text-sm text-red-500'>{errors.days.message}</p>}
          {/* Teaching Time */}
          <label className="label">Teaching Time</label>
          <input {...register('teachingTime')} type="text" className="input w-full" placeholder="Teaching Time(e.g: 10:00AM-11:30AM)" />
          {/* Student Gender */}
          <label className="label">Student Gender<span className='text-red-600 text-2xl'>*</span></label>
          <select {...register('studentGender',{required:'Please Select Gender'})} defaultValue="" className="select w-full">
  <option disabled={true} value={""} hidden>Select Gender</option>
  <option>Male</option>
  <option>Female</option>
  
</select>
{
    errors.studentGender && <p className='text-sm text-red-500'>{errors.studentGender.message}</p>
}
          {/* Student Curriculum */}
          <label className="label">Student Curriculum</label>
          <select {...register('curriculum')} defaultValue="Select Curriculum" className="select w-full">
  <option disabled={true}>Select Curriculum</option>
  <option>Bangla Version</option>
  <option>English Version</option>
  <option>English Medium</option>
</select>
          {/* Details */}
          <label className="label">Details </label>
          <textarea {...register('details')} className='textarea textarea-bordered w-full' rows={"5"} placeholder='Details About Your Requirements...'></textarea>

        </fieldset>
          </div>
    </div>
          <button className="btn bg-primary1 mt-4 w-full">POST TUTION</button>
            </form>
        </div>
    );
};

export default PostNewTution;