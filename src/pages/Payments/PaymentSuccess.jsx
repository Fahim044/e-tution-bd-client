import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const PaymentSuccess = () => {
    const {loading,user}=useAuth();
    const [searchParams]=useSearchParams();
    const [paymentInfo,setPaymentInfo]=useState({});
    const sessionId=searchParams.get('session_id');
    const axiosSecure=useAxiosSecure();
    const effectRan=useRef(false);
    useEffect(()=>{
        if(sessionId && !effectRan.current && !loading)
        {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res=>{
            console.log(res.data);
            setPaymentInfo({transactionId:res.data.transactionId});
            });
            effectRan.current=true;
        }
    },[sessionId,axiosSecure,loading]);
    if(loading)
    {
        return <p>Verifying Payment .....</p>
    }
    if(!user)
    {
        return <p>Please Wait,Authenticating...</p>
    }
    return (
        <div className=' flex flex-col gap-6 justify-center items-center my-auto min-h-screen'>
            <h2 className="text-center  text-primary1 text-4xl font-bold">Payment Successful</h2>
            <p className='text-center font-semibold text-xl'>Your Transaction ID: {paymentInfo.transactionId}</p>
            <Link to="/dashboard/applied-tutors"><button className='btn bg-primary1'>Go To Applied Tutors</button></Link>
        </div>
    );
};

export default PaymentSuccess;