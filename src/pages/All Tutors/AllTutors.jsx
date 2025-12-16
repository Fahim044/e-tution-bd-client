import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading';
import TutorCard from '../../components/TutorCard';

const AllTutors = () => {
    const axiosInstance=useAxios();
    const {data:tutors=[],isLoading:tutorsLoading}=useQuery({
        queryKey:['allTutors'],
        queryFn:async()=>{
            const res=await axiosInstance.get(`/public/users?role=tutor`);
            return res.data;
        }
    });
    if(tutorsLoading)
    {
        return <Loading/>
    }
    return (
        
          
<div className='w-11/12 mx-auto text-center'>
            <h2 className="text-3xl text-primary1 font-bold my-5 "> All Tutors </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                tutors.map(tutor=><TutorCard key={tutor._id} tutor={tutor}></TutorCard>)
            }
        </div>
        </div>
        
    );
};

export default AllTutors;