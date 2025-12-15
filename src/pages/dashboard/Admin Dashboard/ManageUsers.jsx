import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ManageUserCard from './ManageUserCard';
import Loading from '../../../components/Loading';

const ManageUsers = () => {
    const axiosSecure=useAxiosSecure();
    const {data:users=[],refetch,isLoading:manageUsersLoading}=useQuery({
        queryKey:['users'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/users');
            return res.data;
        }
    });
    if(manageUsersLoading)
    {
        return <Loading/>
    }
    return (
        <div>
           <h2 className="text-3xl text-center font-bold text-primary1 mb-3 py-4">Manage Users: {users.length}</h2> 

    <div className='space-y-4'>
    
            {
                users.map(user=><ManageUserCard key={user._id} user={user} refetch={refetch}></ManageUserCard>)
            }
    </div>
        </div>
    );
};

export default ManageUsers;