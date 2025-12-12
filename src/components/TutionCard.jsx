import React from 'react';
import { Link } from 'react-router';

const TutionCard = ({tution}) => {
    // console.log(tution);
    const {_id,subject,studentClass,studentGender,location,budget}=tution;
    return (
        <div className='border rounded-2xl p-5 space-y-3'>
            <h3 className="text-center text-xl underline font-bold">{subject}</h3>
            <div>
                <p>Class: <span className='font-semibold text-lg'>{studentClass}</span></p>
            <p>Student Gender: <span className='font-semibold text-lg'>{studentGender}</span></p>
            <p>Location: <span className='font-semibold text-lg'>{location}</span></p>
            <p>Budget: <span className='font-semibold text-lg'>{budget}</span></p>
            </div>
            <Link to={`/dashboard/tutionDetails/${_id}`} className='btn bg-primary1 w-full'>View Details & Apply</Link>
        </div>
    );
};

export default TutionCard;