import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyTutions = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    
    return (
        <div>
           <h2 className='font-bold text-3xl text-center text-primary1'>My Tutions: </h2>
        </div>
    );
};

export default MyTutions;