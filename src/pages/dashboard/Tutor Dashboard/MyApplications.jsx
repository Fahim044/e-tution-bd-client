import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../components/Loading';
import MyApplicationCard from './MyApplicationCard';

const MyApplications = () => {
    const {user,loading}=useAuth();
    const axiosSecure=useAxiosSecure();
    const queryClient=useQueryClient();
    const {data:myApps=[],isLoading:myAppsLoading,refetch}=useQuery({
        queryKey:['tutorRequests',user?.email],
        enabled:!!user?.email,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/tutor-requests?tutorEmail=${user.email}`);
            return res.data;
        }
    });
    if(loading || !user || myAppsLoading)
        {
            return <Loading/>
        } 
    return (
        <div className='py-4'>
            <h2 className="font-bold text-primary1 text-center text-3xl mb-3">My Applications: {myApps.length}</h2>
            <div className='space-y-4'>
                {
                    myApps.map(app=><MyApplicationCard key={app._id} app={app} queryClient={queryClient} user={user} refetch={refetch}></MyApplicationCard>)
                }
            </div>
        </div>
    );
};

export default MyApplications;