import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const TutionDetails = () => {
    const {id}=useParams();
    const axiosSecure=useAxiosSecure();
    const {data:tution=[]}=useQuery({
        queryKey:['myTution',id],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/tution/${id}`);
            return res.data;
        }
    });
    const {subject,studentClass,location,budget,school,days,teachingTime,studentGender,curriculum,createdAt,status}=tution;
    
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
            <p>Created At: <span className='font-semibold'>{createdAt}</span></p>
            <p>Status: <span className='font-semibold'>{status}</span></p>
            <p>Applied Tutor: <span className='font-semibold'></span></p>

            </div>
    </div>
    );
};

export default TutionDetails;