import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/Loading';
const useRole = () => {
    const {user}=useAuth();
    
    const axiosSecure=useAxiosSecure();
    const {isLoading:roleLoading,data:role='student'}=useQuery({
        queryKey:['userRole',user?.email],
        enabled:!!user?.email,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/users/${user.email}/role`);
            return res.data?.role ||'student';
        }
    });
    
    return ({roleLoading,role});
};

export default useRole;