import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading';
import OngoingTutionCard from './OngoingTutionCard';

const OngoingTutions = () => {
    const {user,loading}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:ongoingTutions=[],isLoading:ongoingTutionsLoading}=useQuery({
        queryKey:['ongoingTutions',user?.email],
        enabled: !!user?.email,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/tutor-requests?status=approved`);//tutorEmail=${user.email}&
            return res.data;
        }
    });

    if(loading || !user || ongoingTutionsLoading)
    {
        return <Loading/>
    }
    return (
        <div className='py-4'>
            <h2 className="text-center font-bold text-primary1 text-3xl mb-4">Ongoing Tutions: {ongoingTutions.length}</h2>
            <div className='space-y-4'>
                {
                    ongoingTutions.map(tution=><OngoingTutionCard key={tution._id} tution={tution}></OngoingTutionCard>)
                }

            </div>
        </div>
    );
};

export default OngoingTutions;