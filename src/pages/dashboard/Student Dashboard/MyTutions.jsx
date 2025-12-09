import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Tution from './Tution';

const MyTutions = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:tutions=[],refetch:tutionInfoRefetch}=useQuery({
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
            tutions.map(tution=><Tution tution={tution} key={tution._id} tutionInfoRefetch={tutionInfoRefetch}></Tution>)
           }
           </div>
        </div>
    );
};

export default MyTutions;