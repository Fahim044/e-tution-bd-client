import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading';
import Forbidden from '../pages/Forbidden';

const TutorRoute = ({children}) => {
    const {user,loading}=useAuth();
    const {role,roleLoading}=useRole();
    if(loading || !user || roleLoading)
    {
        return <Loading/>
    }
    if( role !== 'tutor')
    {
        return <Forbidden/>
    }
    return (
        children
    );
};

export default TutorRoute;