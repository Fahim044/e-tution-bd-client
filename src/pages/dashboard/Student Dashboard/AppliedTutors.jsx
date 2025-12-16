import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../components/Loading';
import AppliedTutorCard from './AppliedTutorCard';

const AppliedTutors = () => {
    const {user,loading}=useAuth();
    const axiosSecure=useAxiosSecure();
    const queryClient=useQueryClient();
    const {data:appliedTutors,isLoading:appliedTutorsLoading}=useQuery({
        queryKey:['tutorRequests',user?.email],
        enabled:!!user?.email,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/tutor-requests`);//?studentEmail=${user?.email}
            return res.data;
        }
    });
if(loading || !user || appliedTutorsLoading)
{
    return <Loading/>
}
    return (
        <div className='py-4'>
            <h2 className="text-center font-bold text-primary1 text-3xl mb-4">Applied Tutors: {appliedTutors.length}</h2>
            <div className='space-y-4'>
                {
                    appliedTutors.map(applied=><AppliedTutorCard key={applied._id} applied={applied} queryClient={queryClient} user={user}></AppliedTutorCard>)
                }
            </div>
        </div>
    );
};

export default AppliedTutors;