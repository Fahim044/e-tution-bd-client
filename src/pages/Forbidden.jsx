import React from 'react';
import { useNavigate } from 'react-router';

const Forbidden = () => {
    const  navigate=useNavigate();
    return (
       <div className='flex flex-col justify-center items-center space-y-5 my-auto min-h-screen'>
            <h1 className='text-5xl font-bold'>Error <span className=' text-primary1'>403</span></h1>
            <p>You Are Forbidden to Access This Page</p>
            <div className='flex gap-4'>
                <button className='btn btn-outline text-primary1' onClick={()=>navigate(-1)}>Go Back</button>
                <button className='bg-primary1 btn' onClick={()=>navigate("/")}>Go Home</button>
            </div>
        </div>
    );
};

export default Forbidden;