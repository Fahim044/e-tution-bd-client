import React from 'react';
import logo from '../assets/Logo Tution.png';
import { Link } from 'react-router';
const Logo = () => {
    return (
        <Link to="/" className='flex items-center'>
           <img src={logo} alt="" /> 
        <span className='bg-linear-to-r from-blue-800 to-blue-400 text-transparent bg-clip-text font-bold text-xl md:text-3xl'>E-TUTION BD</span>
        </Link>
    );
};

export default Logo;