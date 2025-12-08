import React from 'react';
import { TiTick } from 'react-icons/ti';

const WhyChooseUs = () => {
    return (
        <div className='w-11/12 mx-auto text-center py-4'>
            <h2 className="text-3xl text-primary1 font-bold my-5 ">Why Choose Us</h2>
            
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                <div className='border rounded-2xl p-5 animate-pulse space-y-2.5'>
               <div className='flex gap-4 items-center justify-center'>
                 <TiTick />
                <h4 className='font-semibold text-lg text-primary1'>Trusted & Verified Tutors</h4>
               </div>
                <p>Every Tutor Checked & Approved</p>
            </div>
            <div className='border rounded-2xl p-5 animate-pulse space-y-2.5'>
               <div className='flex gap-4 items-center justify-center'>
                 <TiTick />
                <h4 className='font-semibold text-lg text-primary1'>Find The Perfect Match</h4>
               </div>
                <p>Smart Search & Filters to Match Your Needs</p>
            </div>
            <div className='border rounded-2xl p-5 animate-pulse space-y-2.5'>
               <div className='flex gap-4 items-center justify-center'>
                 <TiTick />
                <h4 className='font-semibold text-lg text-primary1'>Secure Payments</h4>
               </div>
                <p>Safe, Transparent, trackable</p>
            </div>
            <div className='border rounded-2xl p-5 animate-pulse space-y-2.5'>
               <div className='flex gap-4 items-center justify-center'>
                 <TiTick />
                <h4 className='font-semibold text-lg text-primary1'>Smart Dashboard</h4>
               </div>
                <p>Monitor Classes, Payments $ Progress Easily</p>
            </div>
            <div className='border rounded-2xl p-5 animate-pulse space-y-2.5'>
               <div className='flex gap-4 items-center justify-center'>
                 <TiTick />
                <h4 className='font-semibold text-lg text-primary1'>Fast & Easy Communication</h4>
               </div>
                <p>Connect Instantly-Anywhere, Anytime</p>
            </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;