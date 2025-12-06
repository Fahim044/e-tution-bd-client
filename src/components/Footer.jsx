import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router';
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaRegCopyright, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <>
        <div className='flex justify-around flex-col md:flex-row py-4'>
            {/* left side */}
            <div className='space-y-5'>
                <Logo></Logo>
                <div className='space-y-3  '>
                <p>Uttara North,Dhaka</p>
                <p>4th Floor,3C</p>
                <p>Available: 9 AM to 5PM</p>
                <p>+8801256369874532,</p>
                <p>+8802152024534759</p>
                </div>
            </div>
            {/* middle side */}
            <div className='space-y-3 flex flex-col'>
                <p className='font-semibold text-primary1'>Links</p>
                <div className='space-y-3 flex flex-col'>
                <Link className=''>About Us</Link>
                <Link>Blog</Link>
                <Link>Success</Link>
                <Link>Refund Policy</Link>
                <Link>Terms and Conditions</Link>
                </div>
            </div>
            {/* right side */}
            <div className='space-y-3'>
            <p className='font-semibold text-primary1'>Follow Us </p>
        <div className='flex gap-4'>
        <Link><FaFacebook /></Link>
        <Link><FaYoutube /></Link>
        <Link><FaXTwitter /></Link>
        <Link><FaInstagramSquare /></Link>
        <Link><FaLinkedin /></Link>
        </div>
            </div>
        </div>
        <div className='justify-center items-center flex gap-2  border-t'>
            <FaRegCopyright />
        <h2>E-TUTION BD 2025</h2>
        </div>
        </>
    );
};

export default Footer;