import React from 'react';

const OngoingTutionCard = ({tution}) => {
    const {tutionId,expectedSalary,subject,location,studentClass,teachingTime,days,appliedAt,studentGender,curriculum}=tution;
    return (
        <div className='md:w-1/2 w-11/12 mx-auto'>
            <div className='border rounded-2xl p-5  space-y-3'>
            <p>Tution ID: <span className='font-semibold'>{tutionId}</span></p>
            <p>Subject: <span className='font-semibold'>{subject}</span></p>
            <p>Student Class: <span className='font-semibold'>{studentClass}</span></p>
            <p>Location: <span className='font-semibold'>{location}</span></p>
            <p>Expected Salary: <span className='font-semibold'>{expectedSalary}</span></p>
            {/* <p>School: <span className='font-semibold'>{school}</span></p> */}
            <p>Days: <span className='font-semibold'>{days}</span></p>
            <p>Teaching Time: <span className='font-semibold'>{teachingTime}</span></p>
            <p>Student Gender: <span className='font-semibold'>{studentGender}</span></p>
            <p>Curriculum: <span className='font-semibold'>{curriculum}</span></p>
            <p>Applied At: <span className='font-semibold'>{appliedAt}</span></p>
            {/* <p>Details: <span className='font-semibold'>{details}</span></p>
            <p>Created At: <span className='font-semibold'>{createdAt}</span></p> */}
            {/* <p>Status: <span className='font-semibold'>{status.toUpperCase()}</span></p> */}
            </div>
        </div>
    );
};

export default OngoingTutionCard;