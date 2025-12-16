import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../hooks/useAxios';
import Loading from '../Loading';
import TutorCard from '../TutorCard';

const LatestTutors = () => {
    const axiosInstance=useAxios()
    const {data:tutors=[],isLoading:latestTutorsLoading}=useQuery({
        queryKey:['latestTutors'],
        queryFn:async()=>{
            const res=await axiosInstance.get(`/public/users?role=tutor`);
            return res.data;
        }
    });
    if(latestTutorsLoading)
    {
        return <Loading/>
    }
    
    return (
        <div className='w-11/12 mx-auto text-center'>
            <h2 className="text-3xl text-primary1 font-bold my-5 ">Latest Tutors</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                tutors.map(tutor=><TutorCard key={tutor._id} tutor={tutor}></TutorCard>)
            }
        </div>
        </div>
    );
};

export default LatestTutors;