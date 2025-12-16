import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import userImg from '../../assets/User.png';
const TutorDetails = () => {
    const {id}=useParams();
    const axiosSecure=useAxiosSecure();
    const {data:tutor=[]}=useQuery({
        queryKey:['tutorDetails',id],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/users/${id}`);
            return res.data;
        }
    });
    const {_id,displayName,email,phoneNumber,photoURL}=tutor;
    return (
        <div className='md:w-1/2 mx-auto w-11/12'>
            <h2 className="text-primary1 text-center font-bold text-3xl my-3">Tutor Details</h2>
        <div className='border rounded-2xl p-5  space-y-3'>
            <img className='mx-auto h-20' src={photoURL || userImg} alt="" />
        <p>Tutor ID: <span className='font-semibold'>{_id}</span></p>
            <p>Name: <span className='font-semibold'>{displayName}</span></p>
            <p>Email: <span className='font-semibold'>{email}</span></p>
            <p>Phone Number: <span className='font-semibold'>{phoneNumber}</span></p>
  
            </div>
        </div>
    );
};

export default TutorDetails;