import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {loading,user}=useAuth();
    const location=useLocation();
    if(loading)
    {
        return <Loading/>
    }
    if(!user)
    {
        return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
    }
    return children;
};

export default PrivateRoute;