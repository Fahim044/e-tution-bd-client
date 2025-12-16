import React from 'react';
import userImg from '../assets/User.png';
import { Link } from 'react-router';
const TutorCard = ({tutor}) => {
    const {_id,displayName,email,phoneNumber,photoURL}=tutor;
    return (
        <div className='border rounded-2xl p-5 space-y-3 flex flex-col h-full'>
            <div className='space-y-3'>
            <img className='mx-auto h-20' src={photoURL || userImg} alt="" />
            <h3 className="text-center text-xl underline font-bold">{displayName}</h3>
            

                <p>Email: <span className='font-semibold text-lg'>{email}</span></p>
           
            </div>
           <div className='grow'></div>
                  <Link to={`/tutorDetails/${_id}`} className='btn bg-primary1 w-full'>Tutor Profile</Link>
            
        
        </div>
    );
};

export default TutorCard;