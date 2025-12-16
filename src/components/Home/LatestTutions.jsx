import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../hooks/useAxios';
import TutionCard from '../TutionCard';
import Loading from '../Loading';

const LatestTutions = () => {
    const axiosInstance=useAxios();
    const {data:latestTutions=[],isLoading:latestTutionsLoading}=useQuery({
        queryKey:['latestTutions'],
        queryFn:async()=>{
            const res=await axiosInstance.get(`/public/tutions?limit=${6}&status=approved`);
            return res.data.tutions;
        }
    });
    if(latestTutionsLoading)
    {
        return <Loading/>
    }
    
    return (
        <div className='w-11/12 mx-auto '>
            <h2 className="text-3xl text-primary1 text-center font-bold my-5 ">Latest Tutions</h2>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
             {
                latestTutions.map(tution=><TutionCard key={tution._id} tution={tution}></TutionCard>)
            }
           </div>
        </div>
    );
};

export default LatestTutions;