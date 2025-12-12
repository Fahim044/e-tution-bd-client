import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ManageTutionCard from './ManageTutionCard';

const ManageTutions = () => {
    const axiosSecure=useAxiosSecure();
    const {data:tutions=[],refetch}=useQuery({
        queryKey:['tutions','pending'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/tutions');
            return res.data;
        }
    });
    // console.log(tutions);
    return (
        <div className='w-11/12 mx-auto py-4'>
            <h2 className="text-3xl font-bold text-primary1 text-center mb-4">Manage Tutions: {tutions.length}</h2>
            <div>
               {
                tutions.map(tution=><ManageTutionCard tution={tution} key={tution._id} refetch={refetch}/>)
               }
            </div>
        </div>
    );
};

export default ManageTutions;