import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import RevenueCard from './RevenueCard';

const RevenueHistory = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:revenues=[]}=useQuery({
        queryKey:['payments','tutor',user?.email],
        enabled:!!user?.email,
        queryFn:async()=>{
            const res=await axiosSecure.get('/payments');
            return res.data;
        }

    });
    console.log(revenues);
    const totalEarning=revenues.reduce((total,item)=>total+ parseFloat(item.amount || 0),0)
    return (
        <div>
            <h2 className="text-center text-4xl text-primary1 font-bold my-5">My Total Earning: {totalEarning.toFixed(2)} BDT</h2>
            <div className='w-11/12 md:w-1/2 mx-auto space-y-5'>
                {
                    revenues.map(revenue=><RevenueCard key={revenue._id} revenue={revenue}></RevenueCard>)
                }
            </div>
        </div>
    );
};

export default RevenueHistory;