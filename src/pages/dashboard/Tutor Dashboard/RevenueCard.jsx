import React from 'react';

const RevenueCard = ({revenue}) => {
    const {tutorReqId,tutionId,transactionId,studentEmail,paymentStatus,currency,amount}=revenue;
    return (
        <div className='border rounded-2xl space-y-3 p-6 '>
            <h2 className='text-2xl font-semibold text-center '>Amount Earned: <span className='text-primary1'>{amount}</span></h2>
            <p>Tutor Request ID: {tutorReqId}</p>
            <p>Tution ID: {tutionId}</p>
            <p>Transaction ID: {transactionId}</p>
            <p>Student Email: {studentEmail}</p>
            <p>Payment Status: {paymentStatus}</p>
            <p>Currency: {currency}</p>
        </div>
    );
};

export default RevenueCard;