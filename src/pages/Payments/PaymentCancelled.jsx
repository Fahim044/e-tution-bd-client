import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
        <h2 className="text-center min-h-screen my-auto text-primary1 text-4xl font-bold">Payment is Cancelled.</h2>
        <Link to="/dashboard/applied-tutors"><button className='btn bg-primary1'>Try Again</button></Link>
        </div>
    );
};

export default PaymentCancelled;