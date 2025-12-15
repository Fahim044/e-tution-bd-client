import React from 'react';
import useRole from '../../hooks/useRole';
import Loading from '../../components/Loading';
import AdminDashboardHome from './Admin Dashboard/AdminDashboardHome';
import TutorDashboardHome from './Tutor Dashboard/TutorDashboardHome';
import StudentDashboardHome from './Student Dashboard/StudentDashboardHome';

const DashboardHome = () => {
    const {role,roleLoading}=useRole();
    if(roleLoading)
    {
        return <Loading/>
    }
    if(role==='admin')
    {
        return <AdminDashboardHome/>
    }
    else if(role==='tutor')
    {
        return <TutorDashboardHome/>
    }
    else if(role==='student')
    {
        return <StudentDashboardHome/>
    }
    
};

export default DashboardHome;