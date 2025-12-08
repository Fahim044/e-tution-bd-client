import React from 'react';

const HowItWorks = () => {
    return (
        
    <div className='w-11/12 mx-auto text-center py-4'>
            <h2 className="text-3xl text-primary1 font-bold my-5 ">How the Platform Works </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                <div className='border rounded-2xl p-5 animate-pulse space-y-2.5'>
                    <h4 className='font-semibold text-lg text-primary1'>Step 1: Create Account</h4>
                    <div>
                        <p>Sign Up as a Student or Tutor </p>
                    <p>Give Us Your Basic Info and start browsing</p>
                    </div>
                </div>
                <div className='border rounded-2xl p-5 animate-pulse space-y-2.5'>
                    <h4 className='font-semibold text-lg text-primary1'>Step 2: Explore & Apply/Hire</h4>
                    <div>
                        <p>Students: Search Tutions or Post Tutions</p>
                    <p>Tutor: Apply Tution as Your Wish</p>
                    </div>
                </div>
                <div className='border rounded-2xl p-5 animate-pulse space-y-2.5'>
                    <h4 className='font-semibold text-lg text-primary1'>Step 3: Start Learning</h4>
                    <p>Start tution after approved</p>
                    
                </div>
            </div>
        </div>
        
    );
};

export default HowItWorks;