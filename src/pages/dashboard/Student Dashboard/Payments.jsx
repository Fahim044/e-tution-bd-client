import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import PaymentCard from './PaymentCard';
import useAuth from '../../../hooks/useAuth';

const Payments = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:payments=[]}=useQuery({
        queryKey:['payments','student',user?.email],
        enabled:!!user?.email,
        queryFn:async()=>{
            const res=await axiosSecure.get('/payments');
            return res.data;
        }
    });
    // console.log(payments);

    return (
        <div className='py-4'>
            <h2 className="text-center  text-primary1 text-4xl font-bold my-4">Payments: {payments.length}</h2>
            <div className=' space-y-4'>
                {
                    payments.map(payment=><PaymentCard key={payment._id} payment={payment}></PaymentCard>)
                }
            </div>
        </div>
    );
};

export default Payments;