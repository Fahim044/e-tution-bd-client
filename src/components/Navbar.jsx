import React from 'react';
import Logo from './Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../hooks/useAuth';

import userImg from '../assets/User.png';
import Loading from './Loading';
import { toast } from 'react-toastify';
const Navbar = () => {
    const {user,loading,logOut}=useAuth();
    // console.log(user?.photoURL);
    const handleLogOut=()=>{
        logOut()
        .then(()=>{
            toast.success('Logged Out Successfully');
        })
        .catch(error=>{
            toast.error(error.message);
        })
    };
    if(loading)
    {
        return <Loading></Loading>
    }
    const links=<>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/tutions">Tutions</NavLink></li>
    <li><NavLink to="/tutors">Tutors</NavLink></li>
    <li><NavLink to="/about">About</NavLink></li>
    <li><NavLink to="/contact">Contact</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 h-fit">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
        
      </ul>
    </div>
    <Logo></Logo>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    {user?

<>
     <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {/* <img
            alt="Profile Photo"
            src={user?.photoURL || userImg} /> */}
            <img src={user.photoURL?user.photoURL:userImg} alt="" />
           
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link>Dashboard</Link></li>
        <li><Link className="">Profile</Link></li>
        <li><Link onClick={handleLogOut} to="/auth/login">Logout</Link></li>
      </ul>
    </div>
    </>

    
    :
 <>
 <Link to="/auth/login" className="btn bg-primary1">Login</Link>
    <Link to="/auth/register" className="btn text-primary1 btn-outline mx-2 ">Register</Link>   
    </>

}
    
   
  </div>
</div>
    );
};

export default Navbar;