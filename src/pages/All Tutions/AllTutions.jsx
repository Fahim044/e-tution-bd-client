import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import TutionCard from '../../components/TutionCard';

const AllTutions = () => {
    const axiosInstance=useAxios();
    const {data:tutions=[]}=useQuery({
        queryKey:['tutions'],
        queryFn:async()=>{
            const res=await axiosInstance.get(`/tutions?status=approved`);
            return res.data;
        }
    });
    
    return (
                <div className='w-11/12 mx-auto '>
            <h2 className="text-3xl text-primary1 text-center font-bold my-5 ">All Tutions: {tutions.length}</h2>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
             {
                tutions.map(tution=><TutionCard key={tution._id} tution={tution}></TutionCard>)
            }
           </div>
        </div>
    );
};

export default AllTutions;