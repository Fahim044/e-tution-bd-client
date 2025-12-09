import React from 'react';

const Tution = ({tution}) => {
    const {_id,subject,studentClass,location,budget}=tution;
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 border rounded-2xl p-5 gap-5 w-11/12 md:w-2/3 mx-auto md:place-items-center'>
            <div className='space-y-2'>
                <p className=''>Tution ID: <span className='font-semibold'>{_id}</span></p>
            <p>Subject: <span className='font-semibold'>{subject}</span></p>
            <p>Class: <span className='font-semibold'>{studentClass}</span></p>
            </div>
            <div className='space-y-2'>
            <p>Location: <span className='font-semibold'>{location}</span></p>
            <p>Budget: <span className='font-semibold'>{budget}</span></p>
            <div className='flex gap-5 flex-col md:flex-row'>
                <button className='btn bg-primary1'>Edit</button>
                <button className='btn btn-warning'>Delete</button>
            </div>
            </div>
        </div>
    );
};

export default Tution;