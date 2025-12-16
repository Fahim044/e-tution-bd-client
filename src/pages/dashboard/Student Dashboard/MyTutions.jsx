import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import MyTution from './MyTution';
import Loading from '../../../components/Loading';

const MyTutions = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:tutions=[],refetch,isLoading:myTutionsLoading}=useQuery({
        queryKey:['myTutions',user?.email],
        enabled:!!user?.email,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/tutions`);//?email=${user.email}
            return res.data;
        }
    });

    if(myTutionsLoading)
    {
        return <Loading/>
    }
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