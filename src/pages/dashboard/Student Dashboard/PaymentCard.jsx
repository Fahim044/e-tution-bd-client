import React from 'react';

const PaymentCard = ({payment}) => {
    const {tutorReqId,tutorName,tutionId,transactionId,paymentStatus,paidAt,currency,amount}=payment;
    return (
        <div className=' border rounded-2xl p-6 space-y-5 w-11/12 md:w-1/2 mx-auto'>
            <h3>Tutor Request ID: {tutorReqId}</h3>
            <p>Tution ID: {tutionId}</p>
            <p>Tutor Name: {tutorName}</p>
            <p>Payment Status: {paymentStatus}</p>
            <p>Transaction ID: {transactionId}</p>
            <p>Paid Amount: {amount}</p>
            <p>Currency: {currency}</p>
            <p>Paid At: {paidAt}</p>
        </div>
    );
};

export default PaymentCard;