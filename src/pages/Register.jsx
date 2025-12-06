import React from 'react';

const Register = () => {
    return (
       <div className='min-h-screen grid place-items-center'>
         <div className="card bg-base-100 w-full max-w-sm  shrink-0 shadow-2xl mx-auto  ">
      <h1 className="text-4xl text-center text-primary1 font-bold">Create Your Account</h1>
      <div className="card-body">
        <fieldset className="fieldset">

            {/* name */}
            <label className="label">Name</label>
          <input type="text" className="input" placeholder="Name" />

            {/* email */}
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />

          {/* password */}
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />

        {/* role selection */}
        <select defaultValue="Pick a text editor" className="select ">
  <option disabled={true}>Register As</option>
  <option>Student</option>
  <option>Tutor</option>
  
</select>

 {/* phone */}
          <label className="label">Phone</label>
          <input type="tel" inputMode='tel' className="input" placeholder="Your Phone Number" />
          {/* <div><a className="link link-hover">Forgot password?</a></div> */}
          <button className="btn bg-primary1 mt-4">Create Account</button>
        </fieldset>
      </div>
    </div>
       </div>
    );
};

export default Register;