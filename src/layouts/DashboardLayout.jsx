import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';

const DashboardLayout = () => {
  const {role,roleLoading}=useRole();
  if(roleLoading)
  {
    return <Loading/>
  }
    const links=<>
    <li><Link to="/">Home</Link></li>
    {/* student only links */}
   {
    role==='student' &&
    <>
     <li><NavLink to="/dashboard/my-tutions">My Tutions</NavLink></li>
    <li><NavLink to="/dashboard/post-new-tution">Post New Tution</NavLink></li>
    <li><NavLink to="/dashboard/applied-tutors">Applied Tutors</NavLink></li>
    <li><NavLink to="/dashboard/payments">Payments</NavLink></li>
    </>
   }
   {/* tutor only links */}
   {
    role==='tutor' &&
    <>
     <li><NavLink to="/dashboard/my-applications">My Applications</NavLink></li>
    <li><NavLink to="/dashboard/ongoing-tutions">Ongoing Tutions</NavLink></li>
    <li><NavLink to="/dashboard/revenue-history">Revenue History</NavLink></li>
    </>
   }
   {/* admin only links */}
   {
    role==='admin' &&
    <>
    <li><NavLink to="/dashboard/manage-users">Manage Users</NavLink></li>
    <li><NavLink to="/dashboard/manage-tutions">Manage Tutions</NavLink></li>
    <li><NavLink to="/dashboard/reportsAndAnalytics">Reports & Analytics</NavLink></li>
    
    </>
   }
    <li><NavLink to="/dashboard/profile-settings">Profile Settings</NavLink></li>
    </>
    return (
        <div className="drawer">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col">
    {/* Navbar */}
    <div className="navbar bg-base-300 w-full">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 px-2 font-bold text-4xl text-primary1">Your Dashboard({role.toUpperCase()})</div>
      <div className="hidden flex-none lg:block">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
          
          {links}
        </ul>
      </div>
    </div>
    {/* Page content here */}
    <Outlet></Outlet>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 min-h-full w-80 p-4">
      {/* Sidebar content here */}
      {links}
    </ul>
  </div>
</div>
    );
};

export default DashboardLayout;