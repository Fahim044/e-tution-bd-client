import React from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Header = () => {
    const {user}=useAuth();
    const navigate=useNavigate();
    return (
        <div className='bg-sky-300 text-center text-primary1 space-y-5 my-8'>
        <h1 className='text-5xl font-bold'>Welcome to E-TUTION BD</h1>
        <div className='space-y-2.5 text-white'>
            <h3 className='text-3xl font-semibold'>Find the Perfect Tutor Anytime,Anywhere</h3>
        <p className='text-2xl font-semibold'>A Smart Tution Management System Connecting Students and Trusted Tutors Across Bangladesh</p>
        <p className='text-2xl font-semibold'>Sign Up for FREE and Browse for Tutions or Tutors as Your Wish</p>
        </div>
        {
            user ?
            <Link to="/dashboard" className='btn bg-primary1'>Go To My Dashboard</Link>
            : 
        <button onClick={()=>navigate('/auth/register')} className='btn bg-primary1'>JOIN NOW (FREE!)</button>
        }
        </div>
    );
};

export default Header;