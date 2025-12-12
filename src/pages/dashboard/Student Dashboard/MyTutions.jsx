import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import MyTution from './MyTution';

const MyTutions = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:tutions=[],refetch}=useQuery({
        queryKey:['myTutions',user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/tutions?email=${user.email}`);
            return res.data;
        }
    })
    return (
        <div>
           <h2 className='font-bold text-3xl text-center text-primary1 my-5'>My Tutions: {tutions.length}</h2>
           <div className='space-y-3'>
            {
            tutions.map(tution=><MyTution tution={tution} key={tution._id} refetch={refetch}></MyTution>)
           }
           </div>
        </div>
    );
};

export default MyTutions;