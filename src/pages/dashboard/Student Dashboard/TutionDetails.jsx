import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/Loading';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const TutionDetails = () => {
    const {id}=useParams();
    const {user}=useAuth();
    console.log(user);
    const {role,roleLoading}=useRole();
    const tutionApplyModalRef=useRef(null);

    const axiosSecure=useAxiosSecure();
    const {data:tution=[],isLoading:tutionsLoading}=useQuery({
        queryKey:['myTution',id],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/tutions/${id}`);
            return res.data;
        }
    });
     const {subject,studentClass,location,budget,school,days,teachingTime,studentGender,curriculum,details,createdAt,status}=tution;

    const {register,handleSubmit,formState:{errors}}=useForm();
   
    const handleModalOpen=()=>{
        tutionApplyModalRef.current?.showModal();
    }
    const queryClient=useQueryClient();
    const handleApplyTution=tutorRequest=>{
        tutorRequest.tutionId=id;
        tutorRequest.subject=subject;
        tutorRequest.location=location;
        tutorRequest.studentClass=studentClass;
        tutorRequest.teachingTime=teachingTime;
        tutorRequest.days=days;
        
        axiosSecure.post('/tutor-requests',tutorRequest)
        .then(res=>{
            if(res.data.insertedId)
            {
                // refetch();
                queryClient.invalidateQueries(['tutorRequests',id]);

                tutionApplyModalRef.current?.close();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Your Tution Request has been Submitted `,
                showConfirmButton: false,
                timer: 2000
                 });
            }
        }).catch(error=>console.log(error))

    }

// taking tutor requests from database:
const {data:tutorRequests=[],isLoading:tutorReqLoading,refetch}=useQuery({
    queryKey:['tutorRequests',id],
    queryFn:async()=>{
        const res=await axiosSecure.get(`/tutor-requests?tutionId=${id}`);
        return res.data;
    }
});
console.log(tutorRequests);

const tutorAlreadyApplied= tutorRequests.some(req=>req.tutorEmail===user?.email);
// console.log(tutorAlreadyApplied);

    if(roleLoading || !user || tutionsLoading || tutorReqLoading)
        {
            return <Loading/>
        }
        // console.log(role);
   
    
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
            <p>Status: <span className='font-semibold'>{status.toUpperCase()}</span></p>
            <div className='space-y-2'><p>Applied Tutor:</p> 
                <p className='font-semibold space-y-2'>

                {tutorRequests.map((req,i)=><p className='border rounded-xl text-center'>{i+1}. {req.displayName}</p> )}
                
                </p>
                </div>
{role==='tutor' &&  
 (
       tutorAlreadyApplied?
(<p className='text-success font-bold text-center btn  cursor-not-allowed w-full'>Applied</p>)
:

(<button onClick={handleModalOpen} className='btn bg-primary1 w-full'>Apply</button>)
 )

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
          <input value={user?.email} {...register('tutorEmail',{required:'Email is Required'})} type="text" className="input w-full" placeholder="Email" />
{errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
          
          {/* qualifications */}
          <label className="label">Qualifications <span className='text-red-600 text-2xl'>*</span></label>
            <textarea rows={4} {...register('qualifications',{required:'Qualifications is Required'})} className='textarea textarea-bordered w-full'  placeholder=' Your Qualifications...
            e.g: Hons from Dhaka University (Math)
            HSC 2021- GPA-5.00
            SSC 2019-GPA-5.00
            '></textarea>

 {errors.qualifications && <p className='text-sm text-red-500'>{errors.qualifications.message}</p>}
       
          {/* Experience */}
          <label className="label">Experience <span className='text-red-600 text-2xl'>*</span></label>
          <input  {...register('experience',{required:'Experience is Required'})} type="text" className="input w-full" placeholder="Experience" />
           {errors.experience && <p className='text-sm text-red-500'>{errors.experience.message}</p>}
          {/* expectedSalary */}
          <label className="label">Expected Salary<span className='text-red-600 text-2xl'>*</span></label>
          <input  {...register('expectedSalary',{required:'Expected Salary is Required',valueAsNumber:true,min:{
            value:1,
            message:'Salary must be greater than 0'
          }})} type="number" className="input w-full" placeholder="Expected Salary" />
          {errors.expectedSalary && <p className='text-sm text-red-500'>{errors.expectedSalary.message}</p>}

          {/* tutor phone number */}

          {/* phone */}
          <label className="label">Phone<span className='text-red-600 text-2xl'>*</span></label>
          <input {...register('tutorPhone',{required:'Phone Number Is Required.',
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